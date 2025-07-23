import axios from "axios"; 

export const api=axios.create({
    baseURL:'http://localhost:8080/api',   
})

export const startSimulation=(strategy)=>{
    return api.post(`/graph/simulate?strategy=${strategy}`) //?=>after it the querry string is starting which is used to send data to server
}
export const uploadGraph=(formData)=>{
    return api.post('/graph/upload',formData,{
        headers:{
            'Content-Type':'multipart/form-data',
        },
    })
}
