const express = require("express");

const User = require("../models/user.model");
const fs = require("fs")
const {uploadSingle} = require("../middlewares/upload");
const router = express.Router();



router.post("/single", uploadSingle("profile_pic"), async (req, res) => {
  try {

    // console.log(req.file.path)
    const user = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      profile_pic: req.file.path,
    });
    return res.send({user})
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("",async(req,res)=>{
    try {
        const users = await User.find().lean().exec();
    
        return res.send(users);
      } catch (err) {
        return res.status(500).send(err);
      }
})

router.get("/:id",async (req, res) => {
    try {
      const user = await User.findById(req.params.id).lean().exec();

      return res.status(200).send(user);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  });
 router.patch("/:id",uploadSingle("profile_pic"),async(req,res)=>{
   try{
let userName = await User.findById(req.params.id).lean().exec()
 let path = userName.profile_pic
 remove(path);

 let user = await User.findByIdAndUpdate(req.params.id,{profile_pic: req.file.path},{new:true})
 return res.status(200).send(user)
   }catch(e){
    return res.status(500).json({ error: e.message });
   }
 })

 router.delete("/:id",async(req,res)=>{
   try{
    let userFile = await User.findById(req.params.id).lean().exec()
    let path = userFile.profile_pic;
    remove(path)
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();
    return res.send(user)
   } catch(e){
     return res.status(500).send({message:e.message})
   }
 })
  router.delete("/:id",async (req, res) => {
    try {
      let userName = await User.findById(req.params.id).lean().exec()
      let path = userName.profile_pic
  
      const user = await User.findByIdAndDelete(req.params.id).lean().exec();
      // p = req.params.profile_pic
      // console.log('p:', path)
      
      remove(path)
      return res.status(200).send(user);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  });

  const remove = (fileName) => {
    console.log(fileName)
    return fs.unlink(fileName, (err => {
    if (err) console.log(err);
    else {
      console.log("\nDeleted file: example_file.txt");
    
    }
  }))};
module.exports = router;
