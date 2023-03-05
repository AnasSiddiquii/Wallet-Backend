const mongoose = require('mongoose')

const DB = process.env.DATABASE

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{console.log('database connected successfully')
}).catch((err)=>console.log('database could not connect'))