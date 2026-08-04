import { useState } from "react";

import Show from "../components/icons/Show";
import Hide from "../components/icons/Hide";

function InputForm({
  name,
  type,
  placeholder,
  style,
  important = false,
  value,
  handlers,
  length,
}) {

  const [hide, setHide] = useState(true)

  return (
    <>
      <div className="relative w-full">
        <input
          name={name}
          value={value}
          onChange={handlers}
          required={important}
          className={style}
          type={type === "password" ? hide ? type : "text" : type}
          placeholder={placeholder}
          maxLength={length}
        />

        {type === "password" && <>
          <div onClick={() => {
            setHide(prev => !prev)
          }} className="absolute top-1/4 right-3 cursor-pointer"> {hide ? <Show /> : <Hide />} </div>
        </>}
      </div>
    </>
  );
}

export default InputForm;
