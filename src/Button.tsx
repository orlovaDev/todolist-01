type PropsType = {
  title: string
}

export const Button = ({title}: PropsType) => {
  return (
    <button>{title}</button>
  );
};


