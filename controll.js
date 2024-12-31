const multer =require('multer');
const express=require('express');
var router= express.Router();



const contactSchema=require("../model/contactschema");
const userschema=require("../model/registerschema");
const addsubjectschema=require("../model/addsubjectschema")


router.get('/',async(req,res)=>{
  try {
    const indexdata= await addsubjectschema.find({});
    res.render("index",{indexdata : indexdata})
  } 
  catch (err) {
    console.log(err);
  }
})
router.get('/about',(req,res)=>{
  res.render("aboutus")
})
//CONTACT
router.get('/contact',(req,res)=>{
  res.render("contact")
})


router.post('/contact',(req,res) =>
  {
      var contact = {
          name: req.body.name,
          email: req.body.email,
          message: req.body.message
      };
      var regpost1 = new contactSchema(contact);
      regpost1.save()
      .then(() =>
      
      res.json('We will contact you soon'))
      .catch(err => res.status(400).json('error:' + err));
    });

router.get('/dashboard',function(req,res){
   if(req.session.user && req.cookies.user_sid){
  res.render("dashboard/index");
 }
 else{
   res.redirect("/login");
 }
});


//api for view contact
router.get('/viewcontact',async(req,res)=>{
  try {
    const contactdata= await contactSchema.find({});
    if(req.session.user && req.cookies.user_sid){
      res.render("./dashboard/viewcontact",{contactdata : contactdata})
     }
     else{
       res.redirect("/login");
     }
   
  } catch (err) {
    console.log(err);
  }
})

//Delete api contact
router.get("/delete_2/:id", async(req, res)=>{
  try{
    const contactdata =await contactSchema.findByIdAndDelete(req.params.id);
    res.redirect('/viewcontact');
  }
  catch(err){
    console.log(err);
  }
});

//Edit api 1 add contact
router.get("/edit_2/:id",async (req,res)=>{
  try{
    const  contactdata=await contactSchema.findById(req.params.id);
    res.render("./dashboard/edit-contact",{contactdata :contactdata});
    console.log(contactdata)
  }
  catch(err){
    console.log(err);
  }
});

//edit api2 view contact
router.post('/edit_2/:id',async(req,res)=>{
  const itemId_2= req.params.id;
  const updatedData_2 ={
    name: req.body.name,
    email: req.body.email,
    message: req.body.message, 
  }
  //Data to update with view contact
  try{
    const updatedItem_2=await contactSchema.findByIdAndUpdate(itemId_2,updatedData_2,{new :true});
    
    if(!updatedItem_2){
      return res.status(404).json({message: 'Item not found'});
    }
    res.redirect('../viewcontact');
  }catch (err){
    res.status(500).json({message:'server error'});
  }
});




//registration router
router.post('/signup',(req,res) =>
  {
      var register = {
          fullname: req.body.fullName,
          emailaddress: req.body.email,
          phonenumber: req.body.phone,
          address:req.body.address,
          password:req.body.password,
          confirmpassword:req.body.confirmPassword,
      };
      var regpost = new userschema(register);
      regpost.save()
      .then(() =>
      

      res.redirect('/login'))
      .catch(err => res.status(400).json('error:' + err));
    });

//Login form

router.get('/login',(req,res)=>{
  res.render("common/login")
});





router.post('/login',async (req, res) => {
  var emailaddress = req.body.emailaddress,
    password = req.body.password;

    try {
      
      var user = await userschema.findOne({ emailaddress: emailaddress })
      .exec();
       if(!user) {
          res.redirect("/");
       }
       user.comparePassword(password,(error, match) => {
           if(!match) {
             res.redirect("/login");
          }
    });
       req.session.user = user;

        
      res.redirect("/dashboard");
  } catch (error) {
    console.log(error)
  }
});




//ADD SUBJECT

router.get('/addsubject',function(req,res){
  if(req.session.user && req.cookies.user_sid){
  res.render("dashboard/addsubject")
  }
  else{
    res.redirect("/login");
  }
});
// multer file upload add subject 
const storage = multer. diskStorage({
  destination: function(req, file, cb){
    cb(null,'./upload');
  },
  filename: function(req, file, cb){
    cb(null,file.originalname);
    //cb(null, uuidv4()+ '-' Date.now() + path.extname(file.orginalname))
  }
});
const fileFilter = (req, file , cb) =>{
  const allowedFileTypes =['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if(allowedFileTypes.includes(file.mimetype)){
    cb(null,true);
  }
  else{                                   
    cb(null,false);
  }
}
let upload = multer({storage,fileFilter});
//addsubject 
router.post('/addsub', upload.single('customfile'), (req,res) =>
  {
      var addsubject = {
        subjectname: req.body.subjectname,
        subjectcode: req.body.subjectcode,
        subjectdescription: req.body.subjectdescription,
        customfile :req.file.filename,
        subjectcategory :req.body.subjectcategory,
      };
      var regpost2 = new addsubjectschema(addsubject);
      regpost2.save()
      .then(() =>
      
      res.json('Added Subject sucessfully'))
      .catch(err => res.status(400).json('error:' + err));
    });

//ADD api view add SUBJECT router 
router.get('/viewaddsubject',async(req,res)=>{
  try {
    const adddata= await addsubjectschema.find({});
    if(req.session.user && req.cookies.user_sid){
    res.render("./dashboard/viewcourse",{adddata : adddata})
  }
  else{
    res.redirect("/login");
  }
} 
  catch (err) {
    console.log(err);
  }
})

 
 
 
//Delete api  view add subject
router.get("/delete_1/:id", async(req, res)=>{
  try{
    const adddata =await addsubjectschema.findByIdAndDelete(req.params.id);
    res.redirect('/viewaddsubject');
  }
  catch(err){
    console.log(err);
  }
});
//Edit api 1 view add subject
router.get("/edit_1/:id",async (req,res)=>{
  try{
    const  adddata=await addsubjectschema.findById(req.params.id);
    res.render("./dashboard/edit-addsub",{adddata :adddata});
    console.log(adddata)
  }
  catch(err){
    console.log(err);
  }
});

//edit api2  addsubject
router.post('/edit_1/:id',async(req,res)=>{
  const itemId_1= req.params.id;
  const updatedData_1 ={
    subjectname: req.body.subjectname,
    subjectcode: req.body.subjectcode,
    subjectdescription: req.body.subjectdescription,
    subjectcategory:req.body.subjectcategory,
  
    
  }
  //Data to update with addsubject
  try{
    const updatedItem_1=await addsubjectschema.findByIdAndUpdate(itemId_1,updatedData_1,{new :true});
    
    if(!updatedItem_1){
      return res.status(404).json({message: 'Item not found'});
    }
    res.redirect('../viewaddsubject');
  }catch (err){
    res.status(500).json({message:'server error'});
  }
});

//registration api router

router.get('/viewregistration',async(req,res)=>{
  try {
    const regdata= await userschema.find({});
    if(req.session.user && req.cookies.user_sid){
    res.render("./dashboard/viewreg",{regdata : regdata})
  }
  else{
    res.redirect("/login");
  }
  } 
  catch (err) {
    console.log(err);
  }
});

//Delete api View Registration
router.get("/delete/:id", async(req, res)=>{
  try{
    const regdata =await userschema.findByIdAndDelete(req.params.id);
    res.redirect('/viewregistration');
  }
  catch(err){
    console.log(err);
  }
});

//Edit api 1 view registration
router.get("/edit/:id",async (req,res)=>{
  try{
    const regdata =await userschema.findById(req.params.id);
    res.render("./dashboard/edit-register",{regdata :regdata});
    console.log(regdata)
  }
  catch(err){
    console.log(err);
  }
});

//edit api2 view registration
router.post('/edit/:id',async(req,res)=>{
  const itemId= req.params.id;
  const updatedData ={
    fullname: req.body.fullName,
    emailaddress: req.body.email,
    phonenumber: req.body.phone,
    password:req.body.password,
    confirmpassword:req.body.confirmPassword,
    
  }
  //Data to update with
  try{
    const updatedItem=await userschema.findByIdAndUpdate(itemId,updatedData,{new :true});
    
    if(!updatedItem){
      return res.status(404).json({message: 'Item not found'});
    }
    res.redirect('../viewregistration');
  }catch (err){
    res.status(500).json({message:'server error'});
  }
});




router.get('/logout',(req,res)=>{
  if (req.session.user && req.cookies.user_sid){
    res.clearCookie("user_sid");
    res.redirect("/");
  }
  else{
  res.render("/login");
  }
});



//Subject Details edit api in add subject schema
router.get("/subjectdetails/:id",async (req,res)=>{
  try{
    const  detailsdata=await addsubjectschema.findById(req.params.id);
    res.render("subjectdetail",{detailsdata:detailsdata});
    console.log(detailsdata)
  }
  catch(err){
    console.log(err);
  }
});

module.exports=router;