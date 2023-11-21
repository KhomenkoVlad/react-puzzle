import styles from "./Popup.module.css";
import React, { useEffect } from "react";

export default function Popup({ children, isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isVisible]);

  if (isVisible) {
    return (
      <div role="dialog">
        <div
          className={styles.outer}
          onClick={onClose}
          role="switch"
          aria-checked={isVisible}
          aria-label="Close"
          tabIndex="-1"
        ></div>
        <div className={styles.inner}>{children}</div>
      </div>
    );
  }
}
