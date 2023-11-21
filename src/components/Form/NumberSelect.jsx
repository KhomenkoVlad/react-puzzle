import React from "react";
import styles from "./Form.module.css";

export default function NumberSelect({ label, name, from, to }) {
  return (
    <div>
      <label htmlFor={name}>{label}: </label>
      <select name={name} id={name} className={styles.select} defaultValue={3}>
        {Array.from({ length: ++to - from }, (_, index) => (
          <option key={(index += from)} value={index}>
            {index}
          </option>
        ))}
      </select>
    </div>
  );
}
