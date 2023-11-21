import styles from "./LangSwitch.module.css";
import React from "react";
import { useLanguage } from "../../utils/hooks";

export default function LangSwitch() {
  const { language, setLanguage } = useLanguage();

  const langStyles = lang => {
    return language === lang ? `${styles.language} ${styles.active}` : `${styles.language}`;
  };

  return (
    <div role="tablist" className={styles.languageList}>
      <button role="tab" className={langStyles("uk")} onClick={() => setLanguage("uk")}>
        UK
      </button>
      <button role="tab" className={langStyles("en")} onClick={() => setLanguage("en")}>
        EN
      </button>
    </div>
  );
}
