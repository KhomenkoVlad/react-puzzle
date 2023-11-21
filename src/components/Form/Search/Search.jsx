import styles from "./Search.module.css";
import React from "react";
import { useInput, useToggle, useLanguage } from "../../../utils/hooks";
import ArtList from "./ArtList";
import Popup from "../../Popup/Popup";

export default function Search() {
  const [search, setSearch] = useInput("");
  const [isVisible, toggle] = useToggle(false);
  const { tr } = useLanguage();

  return (
    <>
      <button onClick={toggle} type="button" className="button-input">
        {tr({ en: "Choose a picture", uk: "Обрати картину" })}
      </button>
      <Popup isVisible={isVisible} onClose={toggle}>
        <div className={styles.wrap}>
          <div className={styles.inputWrap}>
            <label htmlFor="search">{tr({ en: "Search: ", uk: "Пошук: " })}</label>
            <input
              type="text"
              name="search"
              id="search"
              className={`button-input ${styles.input}`}
              value={search}
              onChange={setSearch}
            />
          </div>
          <ArtList search={search} toggle={toggle} />
          <button type="button" className={`button-input ${styles.closing}`} onClick={toggle}>
            X
          </button>
        </div>
      </Popup>
    </>
  );
}
