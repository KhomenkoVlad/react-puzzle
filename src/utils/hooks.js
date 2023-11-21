import { useState, useLayoutEffect, useCallback, useContext } from "react";
import { LangContext } from "../context/LangProvider";

export const useLanguage = () => useContext(LangContext);

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  return [value, e => setValue(e.target.value)];
};

export const useWindowSize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const resize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", resize);
    return window.addEventListener("resize", resize);
  }, []);

  return [width, height];
};

export const useToggle = initialValue => {
  const [value, setValue] = useState(Boolean(initialValue));

  const toggle = useCallback(() => setValue(value => !value), []);

  return [value, toggle, setValue];
};
