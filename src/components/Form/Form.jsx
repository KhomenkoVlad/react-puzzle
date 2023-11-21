import styles from "./Form.module.css";
import React, { useContext } from "react";
import { PuzzleContext } from "../../context/PuzzleProvider";
import { useLanguage } from "../../utils/hooks";
import NumberSelect from "./NumberSelect";
import Search from "./Search/Search";

export default function Form() {
  const { state: image, loadImage, newGame } = useContext(PuzzleContext);
  const { tr } = useLanguage();

  const handleSubmit = event => {
    event.preventDefault();
    if (image) {
      const formData = new FormData(event.currentTarget);
      const rows = formData.get("rows");
      const columns = formData.get("columns");
      newGame(rows, columns);
    }
  };

  const addImageFile = event => {
    const file = event.target.files[0];
    const regex = /\.(png|svg|jpg|jpeg|gif|webp)$/i;
    const isImage = file.name.match(regex);

    if (file && isImage) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        loadImage(reader.result, { en: file.name.replace(regex, "") });
      });
      reader.readAsDataURL(file);
    }
    event.target.value = null;
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.selects}>
        <NumberSelect label={tr({ en: "Rows", uk: "Рядки" })} name="rows" from={2} to={10} />
        <NumberSelect
          label={tr({ en: "Columns", uk: "Стовпці" })}
          name="columns"
          from={2}
          to={10}
        />
      </div>
      <input type="file" name="file" className="button-input" onChange={addImageFile} />
      <Search />
      <button type="submit" className="button-input">
        {tr({ en: "Start", uk: "Старт" })}
      </button>
    </form>
  );
}
