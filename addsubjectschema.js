var mongoose = require('mongoose');

const addsubjectschema = new mongoose.Schema({
  subjectname:
  {
      type: String,
      required:true
  },

  subjectcode:
  {
      type: String,
      required:true
  },

  subjectdescription:
  {
      type: String,
      required:true
  },
  
  customfile:
  {
    type: String,
    required:true
  },

  subjectcategory:
  {
      type: String,
      required:true
  }
})

const addsubjectschema1 = new mongoose.model("addsubject", addsubjectschema);
module.exports=addsubjectschema1;