const mongoose=require("mongoose");

async function connect_db(){
    try{
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Connected to the Database")

    }catch(err){
        console.log(err)
    }
}

module.exports=connect_db;