import { LineChart, ResponsiveContainer, YAxis, XAxis, CartesianGrid, Tooltip, Legend, Line } from "recharts";
import { Card } from "./Card";

export const ResultsDisplay=({data,metrics})=>(
    <Card>
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700" >3. Live Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Status</p>
                <p className={`text-xl font-bold ${metrics.status === 'COMPLETED'?'text-green-600': 'text-yellow-600'}`}>{metrics.status||'IDLE'}</p>
            </div>
             <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Nodes Removed</p>
                <p className={'text-xl font-bold text-blue-600'}>{metrics.nodesRemoved||0}({metrics.percentageRemoved?.toFixed(1)||0}%)</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Largest Component</p>
                <p className="text-xl font-bold text-blue-600">{metrics.largestConnectedComponentSize||0}</p>
            </div>
        </div>
        </div>
        <div style={{width:'100%',height:400}}>
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="percentageRemoved" type="number" domain={[0, 100]} label={{ value: '% of Nodes Removed',position:'insideBottom', offset: -5}}  tickFormatter={(tick) => `${tick.toFixed(0)}%`}/>
                    <YAxis label={{ value: 'Size of Largest Component', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => Math.round(value)} />
                    <Legend />
                    <Line type="monotone" dataKey="largestConnectedComponentSize" stroke="#8884d8" strokeWidth={2} dot={false} name="Network Resilience"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    </Card>
)