const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors= require('cors')
const AuthRouter=require('./routes/AuthRouter')
const NotificationRouter=require('./routes/NotificationRouter')
const User=require('./models/user')
const UserRouter=require('./routes/UserRouter')
const communityRouter=require('./routes/CommunityRouter')
const reportRouter=requre("./routes/ReportRouter")
const commentRouter=require('./routes/commentRoutes')
require('dotenv').config()
require('./utils/db')
const PORT= 8080

app.get('/',(req,res) => {
  res.send("Hello World")
})

app.use(bodyParser.json())
app.use(cors(
  
))
app.use('/auth',AuthRouter)
app.use('/user',UserRouter)
app.use('/community',communityRouter)
app.use('/notification',NotificationRouter)
app.use('/reports', reportRouter);
app.use('/comments', commentRouter);





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
}
)