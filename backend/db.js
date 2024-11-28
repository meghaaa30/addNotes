const mongoose= require('mongoose');
const mongoURI= "mongodb://localhost:27017/inotebooks"
                 
const connectTo=()=>{
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000 
    })
}

module.exports= connectTo;
