export const RadioInput = ({
  className = "",
  onChange = "",
  value,
  ...props
}) => {
  return (
    <div className="relative flex items-center justify-center">
      <input
        type="radio"
        value={value}
        onChange={() => onChange(value)}
        className="peer appearance-none h-5 w-5 border border-foreground rounded-full checked:border-error"
        {...props}
      />
      <span className="absolute w-3 h-3 peer-checked:bg-error rounded-full pointer-events-none"></span>
    </div>
  );
};
