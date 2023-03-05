// securities
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const PORT = process.env.PORT
const bcrypt = require('bcryptjs')

// basics
const express = require('express')
const cors = require('cors')
const multer = require("multer");
const app = express()
app.use(express.json())
app.use(cors())

// imports
require('./db/config')
const Admin = require('./db/Admin')
const User = require('./db/User')
const Product = require('./db/Product')



// homepage
app.get('/', (req, resp)  =>  {
    resp.send(`
        <html>
            <head>
                <style>
                    body {display: flex; justify-content: center; align-items: center; margin: 0;}
                    h1 {background-color: black; border-radius: 50%; padding: 25px 50px; box-shadow: 0px 0px 30px 10px gray;}
                    a {text-decoration: none; color: #5cb85c;}
                </style>
            </head>
            <body>
                <h1><a href="https://wallet.iice.foundation">Wallet</a></h1>
            </body>
        </html>
    `);
});



// Admin
app.post('/adminSignup', async (req,resp) => {
    const { name, email, password, cpassword, post } = req.body
    
    if(!name || !email || !password || !cpassword || !post){
        resp.status(400).json({ error: 'Please Fill All Fields' })
    }
    else{
        const adminExists = await Admin.findOne({ email: email })
        
        if(adminExists){
            resp.status(400).json({ error: 'Email Already Exists' })
        }
        else if(password != cpassword){
            resp.status(400).json({ error: 'Password Do Not Match' })
        }
        else{
            const admin = new Admin({ name, email, password, cpassword, post })
            await admin.save()
            resp.status(201).json({ message: 'Registered Successfully' })
        }
    }
})

app.post('/adminLogin', async (req,resp) => {
    const { email, password } = req.body
    
    if(!email || !password){
        resp.status(400).json({ error: 'Please Fill All Fields' })
    }
    else{
        const adminExists = await Admin.findOne({ email: email })

        if(adminExists){
            const match = await bcrypt.compare(password, adminExists.password)
                        
            if(!match){
                resp.status(400).json({ error: 'Invalid Credientials'})
            }
            else{
                resp.send(adminExists) // Login Successful
            }
        }
        else{
            resp.status(400).json({ error: 'Invalid Credientials'})
        }
    }
})



// Users
app.post('/signup', async (req,resp) => {
    const { name, email, password, cpassword, post } = req.body
    
    if(!name || !email || !password || !cpassword || !post){
        resp.status(400).json({ error: 'Please Fill All Fields' })
    }
    else{
        const userExists = await User.findOne({ email: email })
        
        if(userExists){
            resp.status(400).json({ error: 'Email Already Exists' })
        }
        else if(password != cpassword){
            resp.status(400).json({ error: 'Password Do Not Match' })
        }
        else{
            const user = new User({ name, email, password, cpassword, post })
            await user.save()
            resp.status(201).json({ message: 'Registered Successfully' })
        }
    }
})

app.post('/login', async (req,resp) => {
    const { email, password } = req.body
    
    if(!email || !password){
        resp.status(400).json({ error: 'Please Fill All Fields' })
    }
    else{
        const userExists = await User.findOne({ email: email })

        if(userExists){
            const match = await bcrypt.compare(password, userExists.password)
                        
            if(!match){
                resp.status(400).json({ error: 'Invalid Credientials'})
            }
            else{
                resp.send(userExists) // Login Successful
            }
        }
        else{
            resp.status(400).json({ error: 'Invalid Credientials'})
        }
    }
})



// Products

app.get('/products', async (req,resp) => {
    const product = await Product.find()
    if(product.length>0){
        resp.send(product)
    }
    else{
        resp.send({result:'No Product Found'})
    }
})

app.post('/checkProduct', async (req,resp) => {
    const { name, state } = req.body
    
    if(!name || !state){
        resp.status(400).json({ error: 'Please Fill All Fields' })
    }
    else{
        const productExists = await Product.findOne({ name: name, state: state })

        if(productExists){
            resp.status(400).json({ error: 'Product Already Exists'})
        }
        else{
            resp.status(202).json({ message: 'Product Do Not Exists'})
        }
    }
})

const Storage1 = multer.diskStorage({
    destination:'photos',
    filename:(req,file,cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.png' )
    }
})

const upload1 = multer({storage:Storage1})

app.post('/addProduct', upload1.single('photo'), async (req,resp) => {
    try{
        const { name, state } = req.body
        const photo = req.file.filename
        
        const product = new Product({ name, photo, state })
        await product.save()
        resp.status(201).json({ message: 'Registered Successfully' })
    }
    catch{
        resp.status(400).json({ error: 'Error' })
    }
})

app.delete('/deleteProduct/:id', async (req,resp) => {
    const result = await Product.deleteOne({_id:req.params.id})
    resp.send(result)
})

// pre-filled data
app.get('/updateProduct/:id', async (req,resp) => {
    const product = await Product.findOne({_id:req.params.id})
    if(product){
        resp.send(product)
    }
    else{
        resp.send({result:'No Product Found'})
    }
})

app.put('/updateProduct/:id', async (req,resp) => {
    const result = await Product.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result)
})

app.get('/searchProduct/:key', async (req,resp) => {
    const product = await Product.find({
        '$or':[
            {name:{$regex:req.params.key}},
            {state:{$regex:req.params.key}}
        ]
    })
    if(product.length>0){
        resp.send(product)
    }
    else{
        resp.send({result:'No Product Found'})
    }
})



app.listen(PORT,() => {
    console.log(' ')
    console.log('You can now view backend in the browser.')
    console.log(' ')
    console.log(`  http://localhost:${PORT}`)
    console.log(`  http://localhost:${PORT}`)
    console.log(' ')
    console.log('Compiled successfully!')
    console.log('Compiled successfully!')
    console.log(' ')
})