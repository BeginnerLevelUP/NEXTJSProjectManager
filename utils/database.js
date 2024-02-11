// Establishing the connection to the database
import mongoose, { connect, mongo } from "mongoose"; // importing mongoose
let connection=false //- boolean value meant to track the connection status 
const URI=process.env.MONGODB_URI||"mongodb://localhost:27017/projectManager" // mongodb uri for atlas or to use locally 

export const establishConnection=async()=>{
    mongoose.set('strictQuery',true)
    /*
    ensures that values passed to our model constructor that were not specified in our schema do not get saved to the db
    https://www.mongodb.com/community/forums/t/deprecationwarning-mongoose-the-strictquery/209637
    */
    if(connection){
            console.log('MongoDB already connected')
            return
    }
    try{
        // https://mongoosejs.com/docs/5.x/docs/deprecations.html
        await mongoose.connect(URI,{
            // useNewUrlParser: true,
            // useFindAndModify: false,
            // useCreateIndex:true,
            // useUnifiedTopology:true,
        })
        connection=true
        console.log('MongoDB connected')
    }
    catch(e){
        console.error('Error Establishing a connection to the database',e)
    }

}