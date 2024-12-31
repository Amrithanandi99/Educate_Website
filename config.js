const { name } = require("ejs");
const mongoose = require("mongoose")
var conn=mongoose.connect("mongodb+srv://amritha_1:12345@cluster0.llkzcxh.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster0",
  {
      useNewUrlParser:true,
      useUnifiedTopology:true
  })
  .then(()=> console.log("connection sucessfully.."))
  .catch((err)=> console.log(err));
  //module.exports =conn;
  const listSchema = new mongoose.Schema({
    name:
    {
      type:String,
      required: true
    },
    email:{
      type:String,
      required:true
    },
    address:{
      type:String,
      required:true
    },

    //active:Boolean,

    date:{
      type:Date,
      default:Date.now
    }
  })
 const playlist =new mongoose.model("playlist",listSchema)

 const createDocument=async () =>{
  try{
    const productList2 =new playlist({
        name:'Amritha',
        email:'amritha@gmail.com',
        address:'kerala'
      })
      const productList3 =new playlist({
        name:'Sita',
        email:'sita@gmail.com',
        address:'new delhi'
      }) 
      const productList4 =new playlist({
        name:'amit',
        email:'amit@gmail.com',
        address:"punjab"
      })
      const result= await playlist.insertMany([productList2,productList3,productList4])
      console.log(result);
    }catch (err){
      console.log(err);
    }
  }
 //createDocument();

 const getDocument=async()=>{
  const result = await playlist.find({},{name:1,address:1});
  console.log(result);
 }
 //getDocument();

 const getDocument1=async()=>{
  const result = await playlist.find({});
  console.log(result);
 }
 //getDocument1();

 const getDocument2= async()=>{
  var query={ address:'punjab'};
  const result = await playlist.find(query);
  console.log(result);
 }
 //getDocument2();

 const getDocument3= async()=>{
  var query={ name:/^A/};
  const result = await playlist.find(query);
  console.log(result);
 }
 //getDocument3();

 const getDocument4= async()=>{
  var mysort={name:-1};
  const result = await playlist.find().sort(mysort);
  console.log(result);
 }
 //getDocument4();

 const getDocument5= async()=>{
  var mysort={name:1};
  const result = await playlist.find().sort(mysort);
  console.log(result);
 }
 //getDocument5();

 const getDocument6= async()=>{
  var myquery= {address:'kerala'}
  const result = await playlist.deleteOne(myquery);
  console.log(result);
 }
 //getDocument6();

 const getDocument7= async()=>{
  var myquery= {address:'punjab'}
  var newvalues={$set:{name: "aji",address:'sikkim'}};
  const result = await playlist.updateOne(myquery, newvalues);
  console.log(result);
 }
 getDocument7();
 

 

