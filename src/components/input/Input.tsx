import React from "react";

interface Props {
  iconPath?: string;
  text: string;
}

function Input({ iconPath, text }: Props) {
  return (
    <div>
      <input value={text} />
      {iconPath && <div></div>}
    </div>
  );
}

export default Input;
