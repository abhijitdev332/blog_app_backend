import express from 'express'
const app=express()
import globalError from './utils/globalErrorHandler.js'


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res,next)=>{
    console.log(req)
    res.json("this is response")
})




app.use("/*",globalError)




export default app