const Button = ({children, type="button", onClick, color, style={}, disabled=false}) => {
  return (
    <button
      type={type}
      onClick={onClick ? onClick : undefined}
      className={`btn btn-${color}`}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  )
};

export default Button