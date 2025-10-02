import e from 'express'
import { collectionName, connection } from './dbconfig.js'
import cors from 'cors'
import { ObjectId } from 'mongodb'
const app=e()
app.use(e.json())

app.use(cors());
app.get("/",(req,res)=>{
    res.send("Send")
})
app.post("/add-task",async(req,res)=>{
    const db= await connection()
    const collection=await db.collection(collectionName);
    const result=await collection.insertOne(req.body)
    // res.send("Working....")
    if(result){
        res.send({message:"new task added",success:true,result})
    }
    else{
        res.send({message:'task not added',success:false})
    }
})

app.get("/tasks",async(req,res)=>{
    const db= await connection()
    const collection=await db.collection(collectionName);
    const result=await collection.find().toArray();
    // res.send("Working....")
    if(result){
        res.send({message:"new task added",success:true,result})
    }
    else{
        res.send({message:'Error Try after sometime',success:false})
    }
})
app.get("/task/:id",async(req,res)=>{
    const db= await connection()
    const collection=await db.collection(collectionName);
     const id=req.params.id

    const result=await collection.findOne({_id:new ObjectId(id)});
    // res.send("Working....")
    if(result){
        res.send({message:"new task added",success:true,result})
    }
    else{
        res.send({message:'Error Try after sometime',success:false})
    }
})



app.put("/update-task",async(req,res)=>{
    const db= await connection()
    const collection=await db.collection(collectionName);
    const {_id,...fields}=req.body;
    const update={$set:fields}
    console.log(fields)
    
     const result=await collection.updateOne({_id:new ObjectId(_id)},update);
    // // res.send("Working....")
    if(result){
        res.send({message:"new task added",success:true,result})
    }
    else{
        res.send({message:'Error Try after sometime',success:false})
    }
    
    
})

app.delete("/delete/:id",async(req,res)=>{
    const db= await connection()
    const id=req.params.id
    const collection=await db.collection(collectionName);
    const result=await collection.deleteOne({_id:new ObjectId(id)});
    // res.send("Working....")
    if(result){
        res.send({message:"new task added",success:true,result})
    }
    else{
        res.send({message:'Error Try after sometime',success:false})
    }
})

app.listen(3200)