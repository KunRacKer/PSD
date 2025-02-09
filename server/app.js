const express =require("express")
const cors = require("cors")
const app = express()


const PORT = 8000

app.use(cors())

app.get("/",(req,res)=>{
    res.json("asdasda")
})

app.get("/api/get/all/data",require("./src/routes/GetAllDataRoutes"))

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})