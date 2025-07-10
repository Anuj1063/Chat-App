const mongoose=require('mongoose')

class DbConnect{

    async connectDb(){
        try {
            
            await mongoose.connect(process.env.MONGO_URI)
            console.log("DataBase Connected Sucessfully!!")
        } catch (error) {
            console.log("Failed to Connect Database",error)
        }
    }
}

module.exports=new DbConnect();

