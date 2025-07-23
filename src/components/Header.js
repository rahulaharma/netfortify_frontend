export const Header=({isConnected})=>{
    const connectionStatusColor=isConnected?'bg-green-500':'bg-red-500'
    return(
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">NetFortify</h1> 
                    <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${connectionStatusColor}`}></div>
                        <span className="text-sm">
                            {isConnected ? 'Connected' : 'Disconnected'}
                        </span>
                    </div>
            </div>
        </header>
    )
}