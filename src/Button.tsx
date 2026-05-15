type ButtonPropsType = {
  title: string
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export const Button = ({title, onClick, className, disabled}: ButtonPropsType) => {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>{title}</button>
  );
};


