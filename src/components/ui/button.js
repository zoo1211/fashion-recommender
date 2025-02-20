export function Button({ children, onClick, className = "", variant = "default" }) {
    const baseStyle = "px-4 py-2 rounded-md";
    const variantStyle = variant === "ghost" ? "bg-transparent text-gray-700" : "bg-blue-500 text-white";
  
    return (
      <button onClick={onClick} className={`${baseStyle} ${variantStyle} ${className}`}>
        {children}
      </button>
    );
  }
  