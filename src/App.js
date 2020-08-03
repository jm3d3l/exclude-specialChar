import React, { useState, useRef } from "react";
import "./styles.css";

export default function App() {
  const numRef = useRef();
  const [hasChar, handleOnPaste] = IsCharHook(numRef);
  const [onChangeInput] = useInputNumberHook(numRef, hasChar);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <input
        name="input"
        onPaste={handleOnPaste}
        ref={numRef}
        onChange={onChangeInput}
      />
    </div>
  );
}

const useInputNumberHook = (forwardRef, hasChar) => {
  const onChangeInput = ({ target: { name, value } }) => {
    if (!hasChar) {
      let str = "";
      let regex = /[^a-zA-Z0-9 ]/g;
      str = value.replace(regex, "");
      console.log("str onchange", str);
      forwardRef.current.value = str;
    }
  };

  return [onChangeInput];
};

const IsCharHook = () => {
  const [hasChar, setHasChar] = useState(false);
  let letterNumber = /\w+/;
  const handleOnPaste = e => {
    const { clipboardData } = e;
    let newVal = clipboardData.getData("Text");
    if (newVal.match(letterNumber) instanceof Array) {
      setHasChar(false);
      return true;
    } else {
      setHasChar(true);
      e.preventDefault();
      return false;
    }
  };

  return [hasChar, handleOnPaste];
};

// @#$@#$@#$
// daksdk23123!@!##!@#
// sdffl234234
// @#$@$$!@#@#!#1231313
