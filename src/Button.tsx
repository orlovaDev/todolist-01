import * as React from "react";

type ButtonPropsType = {
  title: string
  onClick?: () => void
  style?: React.CSSProperties;
}

export const Button = ({title, onClick, style}: ButtonPropsType) => {
  return (
    <button style={style} onClick={onClick}>{title}</button>
  );
};


