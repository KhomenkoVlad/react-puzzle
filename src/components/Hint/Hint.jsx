import styles from "./Hint.module.css";
import React, { useContext } from "react";
import { useToggle, useLanguage } from "../../utils/hooks";
import { PuzzleContext } from "../../context/PuzzleProvider";
import Popup from "../Popup/Popup";

export default function Hint() {
  const {
    state: { image, title },
  } = useContext(PuzzleContext);
  const [isVisible, toggle] = useToggle(false);
  const { tr } = useLanguage();

  return (
    <>
      <button className={styles.buttonHint} onClick={toggle} type="button">
        {tr({ en: "Hint", uk: "Підсказка" })}
      </button>
      <p className={styles.caption}> {image && tr(title)}</p>
      <Popup isVisible={isVisible} onClose={toggle}>
        {image && (
          <div onClick={toggle} role="button" tabIndex="-1">
            <img src={image.src} alt={image.alt} className={styles.image} />
          </div>
        )}
      </Popup>
    </>
  );
}
