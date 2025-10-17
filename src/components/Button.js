const Button = ({children, type="button", onClick, color, style={}}) => {
  return (
    <button
      type={type}
      onClick={onClick ? onClick : undefined}
      className={`btn btn-${color}`}
      style={style}
    >
      {children}
    </button>
  )
};

export default Button