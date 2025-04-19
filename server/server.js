const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors= require('cors')
const AuthRouter=require('./routes/AuthRouter')
require('dotenv').config()
require('./utils/db')
const PORT= 8080

app.get('/',(req,res) => {
  res.send("Hello World")
}
)

app.use(bodyParser.json())
app.use(cors(
  
))
app.use('/auth',AuthRouter)
app.use('/products',ProductRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
}
)