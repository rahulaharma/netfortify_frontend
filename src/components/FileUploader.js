import { useState } from "react"
import { uploadGraph } from "../api"
import { toast } from "react-toastify"
import { Card } from "./Card"
import { useRef } from "react"
import { Button } from "./Button"

export const FileUploader=({onUploadSuccess,isSimulating})=>{
    const [file,setFile]=useState(null)
    const [uploading,setUploading]=useState(false)
    const fileInputRef=useRef(null)

    const handleFileChange=(event)=>{
        setFile(event.target.files[0])
    }
    const handleUpload=async()=>{
        if(!file){
            toast.warn('Please select a file first.')
            return
        }
        setUploading(true)
        toast.info('Uploading...')
        const formData=new FormData()
        formData.append('file',file)

        try{
            const response=await uploadGraph(formData)
            toast.success(`${response.data}`)
            onUploadSuccess()
        }
        catch(error){
            const errorMessage=error.response?error.response.data:error.message
            toast.error(`Error:${errorMessage}`)
        }
        finally{
            setUploading(false)
        }
    }
    return(
        <Card>
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">1. Upload Network File</h3>
                <p className="text-sm text-gray-500">Upload an edge list file(e.g., "node1 node2" per line).</p>
                <div className="flex items-center space-x-4">
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" disabled={isSimulating}/>
                    <Button onClick={()=>fileInputRef.current.click()} disabled={isSimulating}>
                        Choose File
                    </Button>
                    <span className="text-gray-600">
                        {file?file.name:'No file selected'}
                    </span>
                </div>
                <Button onClick={handleUpload} disabled={!file||uploading||isSimulating}>
                    {uploading?'Uploading...':'Upload Graph'}
                </Button>
            </div>
        </Card>
    )
}