const express=require('express')
const PORT=4000
const app=express()
const HOSTNAME='localhost'
const routes=require('./Routes/resturants')
const mongoose=require('mongoose')
const cors=require('cors')
const path=require('path')
const dotenv=require('dotenv')
const passport= require("passport");
const cookieSession= require('cookie-session');
const auth=require('./Controllers/Auth');
const passPort=require('./Controllers/Passport')    

dotenv.config();
app.use(cookieSession({ name:"session", keys:["edureka"], maxAge:24*60*60*1000}));
app.use(express.json())
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
    methods:['GET', 'POST','PUT','DELETE']
    
}))

app.use('/',routes);
app.use('/auth',auth);


const atlasUrl="mongodb+srv://Admin:ilpP6YMBj5M2BNQT@cluster0.ktinm.mongodb.net/FoodApp?retryWrites=true&w=majority"

mongoose.connect(atlasUrl, {
    useNewUrlParser: true, useUnifiedTopology: true
})

.then( res => {
    app.listen(PORT, HOSTNAME, () => {
        console.log(`Server is running at ${HOSTNAME}:${PORT}`)
    });
})
.catch(err => console.log(err));
