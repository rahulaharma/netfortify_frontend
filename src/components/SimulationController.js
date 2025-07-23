import { useState } from "react"
import { Card } from "./Card"
import { Button } from "./Button"
export const SimulationController=({onStart,isSimulating,isGraphLoaded})=>{
    const [strategy,setStrategy]=useState('random')
    return(
        <Card>
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">2. Choose an attack strategy</h3>
                <div className="flex space-x-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="strategy" value="random" checked={strategy==='random'} onChange={()=>setStrategy('random')} className="form-radio h-4 w-4 text-blue-600" disabled={isSimulating||!isGraphLoaded}/>
                    <span className="text-gray-700">Random Failure</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="strategy" value="high-degree" checked={strategy==='high-degree'} onChange={()=>setStrategy('high-degree')} className="form-radio h-4 w-4 text-blue-600" disabled={isSimulating||!isGraphLoaded}/>
                    <span className="text-gray-700">Targeted Attack</span>
                    </label>
                </div>
                <Button onClick={()=>onStart(strategy)} disabled={!isGraphLoaded||isSimulating} className="bg-red-600 hover:bg-red-700 focus:ring-red-500">
                Start Simulation
                </Button>
            </div>
        </Card>
    )
}