const Button = ({ children, onClick }: { children: string; onClick: () => void }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
