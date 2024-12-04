process.on("uncaughtException",()=>{
    console.log("uncought")
    process.exit(1)
}
)

import app from './app.js'




// start the server on port=3000
const server=app.listen(3000,()=>{
    console.log("app is running")
})
// unhandled rejection and close the server
process.on("unhandledRejection",()=>{
    server.close(()=>{
        console.log("all request finised")
        process.exit(1)
    })
})




