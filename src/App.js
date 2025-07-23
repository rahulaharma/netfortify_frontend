import { useEffect, useRef, useState } from "react"
import SockJS from "sockjs-client"
import { Client } from "@stomp/stompjs"
import { toast } from "react-toastify"
import { startSimulation } from "./api"
import { SimulationController } from "./components/SimulationController"
import { Header } from "./components/Header"
import { FileUploader } from "./components/FileUploader"
import { ResultsDisplay } from "./components/ResultsDisplay"
import { ToastContainer } from "react-toastify"


export const App=()=>{
  const [simulationData,setSimulationData]=useState([])
  const [latestMetrics,setLatestMetrics]=useState({})
  const [isConnected,setIsConnected]=useState(false)
  const [isSimulating,setIsSimulating]=useState(false)
  const [isGraphLoaded,setIsGraphLoaded]=useState(false)
  const stompClient=useRef(null)

  useEffect(()=>{
     // Add CSS for react-toastify
    const toastifyCSS = document.createElement('link');
    toastifyCSS.rel = 'stylesheet';
    toastifyCSS.href = 'https://cdn.jsdelivr.net/npm/react-toastify@9.1.3/dist/ReactToastify.css';
    document.head.appendChild(toastifyCSS);

    const client=new Client({
      webSocketFactory:()=>new SockJS('http://localhost:8080/ws'),
      onConnect:()=>{
        setIsConnected(true)
        client.subscribe('/topic/metrics',(message)=>{
          const data=JSON.parse(message.body)
          setLatestMetrics(data)
          setSimulationData(prevData=>[...prevData,data])
          if(data.status==='COMPLETED'){
            setIsSimulating(false)
            toast.success('Simulation Completed!')
          }
        })
      },
      onDisconnect:()=>setIsConnected(false),
    })

    client.activate()
    stompClient.current=client

    return()=>{
      if(stompClient.current?.active){
        stompClient.current.deactivate()
      }
      document.head.removeChild(toastifyCSS)
    }
  },[])

  const handleStartSimulation=async(strategy)=>{
    setSimulationData([])
    setLatestMetrics({})
    setIsSimulating(true)
    try{
      await startSimulation(strategy)
      toast.info(`Simulation started with '${strategy}' strategy`)
    }
    catch(error){
      const errorMessage=error.response?error.response.data:error.message
      toast.error(`Error:${errorMessage}`)
      setIsSimulating(false)
    }
  }
  const handleUploadSuccess=()=>{
    setIsGraphLoaded(true)
    setSimulationData([])
    setLatestMetrics({})
  }
  return(
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
    <ToastContainer  position="top-right"  autoClose={5000} hideProgressBar={false}  closeOnClick   theme="colored" />
      <Header isConnected={isConnected}/>
       <main className="container mx-auto p-6">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-1 space-y-8">
            <FileUploader onUploadSuccess={handleUploadSuccess}  isSimulating={isSimulating} />
            <SimulationController onStart={handleStartSimulation} isSimulating={isSimulating} isGraphLoaded={isGraphLoaded} />
           </div>
            <div className="lg:col-span-2">
              <ResultsDisplay data={simulationData} metrics={latestMetrics} />
            </div>
         </div>
       </main>
    </div>
  )
}