const express = require('express');
const mongoose = require('mongoose');
const comps = require('./companymodel')
const jwt = require('jsonwebtoken');
const middleware = require('./middleware')
const cors = require('cors');
const users = require('./usermodel');
const appliedcomps = require('./appliedcomps');


const app = express();
mongoose.connect('mongodb+srv://tharunkarnekota:tharunkarnekota@cluster0.dws2t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(
    ()=> console.log('Db connected..')
)

app.use(express.json());
app.use(cors({origin:"*"}));




app.post('/register',async (req,res) =>{
    try{
        const { fullname,collegeId,branch,email,mobile,github,linkedin,password,confirmpassword } = req.body;
        const exist = await users.findOne({email});
        if(exist){
            return res.status(200).send('user already registered')
        }
        const existId = await users.findOne({collegeId});
        if(existId){
            return res.status(200).send('this collegeID already registered')
        }
        if(password !== confirmpassword){
            return res.status(400).send('password invalid')
        }

        let newUser = new users({
            fullname,collegeId,branch,email,mobile,github,linkedin,password,confirmpassword
        })
        newUser.save();
        return res.status(200).send('User Registered Successfully')
    }
    catch(err){
        console.log(err)
        return res.status(500).send('register Server Error')
    }
})





app.post('/login',async (req,res)=>{
    try{
        const {email,password} = req.body;
        const exist = await users.findOne({email})
        if(!exist){
            return res.status(200).send('User not Exist plz register')
        }
        if(exist.password !== password){
            return res.status(200).send('password invalid')
        }
        let payload = {
            user : {
                id : exist.id
            }
        }
        jwt.sign(payload,'jwtPassword',{expiresIn:360000000},
        (err,token)=>{
            if(err) throw err
            return res.json({token})
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send('login Server Error')
    }
})




app.get('/getcomp',async(req,res)=>{
    try{
        return res.json(await comps.find())
    }
    catch(err){
        console.log(err);
        return res.send("getcomp server error")
    }
})


app.post('/registercomp',async (req,res)=>{
    try{
        const {compname,compId,clgId,salary,studentId,studentname} = req.body;
        const newRegisteration = new appliedcomps({
            compname:compname,
            compId:compId,
            studentname:studentname,
            studentId:studentId,
            clgId:clgId,
            salary:salary
        })
        await newRegisteration.save();
        return res.status(200).send('Registered company added successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('login Server Error')
    }
})


app.get('/getpresentuser',middleware,async(req,res)=>{
    try{
        const userid = req.user.id
        const exist = await users.findById(userid)
        return res.status(200).json(exist);

    }
    catch(err){
        console.log(err);
        return res.status(500).send('getpresentuser Server Error')
    }
})



app.get('/indcompprofile/:id',async(req,res)=>{
    try{
        const exist = await comps.findById(req.params.id)
        return res.status(200).json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('ind comp Server Error')
    }
})

app.get('/indregcompprofile/:id',async(req,res)=>{
    try{
        const exist = await appliedcomps.findById(req.params.id)
        return res.status(200).json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('ind comp Server Error')
    }
})

app.get('/getregisteredcompanies',middleware,async(req,res)=>{
    try{
        const userid = req.user.id
        const exist = await appliedcomps.find()
        const filtered = exist.filter(profile => profile.studentId === userid)
        return res.status(200).json(filtered);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('ind comp Server Error')
    }
})

app.put('/updatewrittentest/:id',async(req,res) =>{
    try{
        const updated = await appliedcomps.findByIdAndUpdate(req.params.id,{
            
            writtentest : "1",
            
        })
        return res.status(200).json("successfully updated ");
    }
    catch(err){
        console.log(err);
        return res.status(500).send('ind comp Server Error')
    }
})

app.put('/updatetechnicalround/:id',async(req,res) =>{
    try{
        const updated = await appliedcomps.findByIdAndUpdate(req.params.id,{
            
            technicalround : "1",
            
        })
        return res.status(200).json("successfully updated ");
    }
    catch(err){
        console.log(err);
        return res.status(500).send('ind comp Server Error')
    }
})

app.put('/updatehrround/:id',async(req,res) =>{
    try{
        const updated = await appliedcomps.findByIdAndUpdate(req.params.id,{
            
            hrround : "1",
            
        })
        return res.status(200).json("successfully updated ");
    }
    catch(err){
        console.log(err);
        return res.status(500).send('ind comp Server Error')
    }
})

app.listen(5000,()=> console.log('Server is Running..'))