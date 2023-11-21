import styles from "./Search.module.css";
import React, { useContext, useEffect, useState } from "react";
import { FixedSizeList } from "react-window";
import { useWindowSize, useLanguage } from "../../../utils/hooks";
import { PuzzleContext } from "../../../context/PuzzleProvider";
import picturesEN from "../../../assets/pictures-en.json";
import picturesUK from "../../../assets/pictures-uk.json";

const pictures = {
  en: picturesEN,
  uk: picturesUK,
};

export default function ArtList({ search, toggle }) {
  const { language } = useLanguage();
  const [list, setList] = useState(pictures[language]);
  const [width, height] = useWindowSize();
  const { loadImage } = useContext(PuzzleContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      const target = search.toLowerCase();
      const matches = [];
      for (const image of pictures[language]) {
        if (
          image.title.toLowerCase().includes(target) ||
          image.artistName.toLowerCase().includes(target)
        ) {
          matches.push(image);
        }
      }
      target ? setList(matches) : setList(pictures[language]);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, language]);

  const renderRow = ({ index, style }) => (
    <div
      style={{ ...style }}
      className={styles.picture}
      role="button"
      tabIndex="-1"
      onClick={() => {
        const id = list[index].id;
        loadImage(list[index].image, {
          en: `${picturesEN[id].title} - ${picturesEN[id].artistName}`,
          uk: `${picturesUK[id].title} - ${picturesUK[id].artistName}`,
        });
        toggle();
      }}
    >
      <img src={list[index].imageSmall} alt={list[index].title} className={styles.pictureImage} />
      <p>
        {list[index].title} - {list[index].artistName}
      </p>
    </div>
  );

  return (
    <FixedSizeList
      height={height * 0.75 - 100}
      width={width > 800 ? width / 2 - 40 : width - 60}
      itemCount={list.length}
      itemSize={90}
    >
      {renderRow}
    </FixedSizeList>
  );
}
