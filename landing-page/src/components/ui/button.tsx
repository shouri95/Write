const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
    >
      {children}
    </button>
  );
};

export default Button;