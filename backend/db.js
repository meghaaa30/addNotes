const mongoose= require('mongoose');
const mongoURI= "mongodb://localhost:27017/inotebooks"
                 
const connectTo=()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected");
    })
}

module.exports= connectTo;
