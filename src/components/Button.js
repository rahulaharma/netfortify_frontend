export const Button=({children,onClick,disabled=false,className=''})=>(
    <button onClick={onClick} disabled={disabled} className={`px-6 py-2 font-semibold text-white rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${disabled ? 'bg-gray-400 cursor-not-allowed' :'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'} ${className}`}>
        {children}
    </button>
)