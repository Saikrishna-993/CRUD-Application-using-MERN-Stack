const express = require("express");
const router = express.Router();
const users=require("../models/userSchema");
const mongoose = require("mongoose");





//register user

router.post("/register",async(req,res)=>{
   //console.log(req.body);
   const {name,email,age,mobile,work,address,description} = req.body;

   if (!name || !email || !age || !mobile || !work || !address || !description) {
        return res.status(404).json({error: "Please fill all fields"});
  }

  try {
    const preUser = await users.findOne({ email:email });
    console.log(preUser);

    if (preUser) {
      return res.status(404).send({ error: "This user is already registered" });
    } else {
      const userId =new mongoose.Types.ObjectId();
      const addUser = new users({
        _id:userId,
        name,
        email,
        age,
        mobile,
        work,
        address,
        description
      });
      console.log(userId);

      await addUser.save();
      res.status(201).json(addUser);
      console.log(addUser);
    }
    
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }

})

// get userdata

router.get("/getdata",async(req,res)=>{
    try {
        const userdata = await users.find();
        res.status(200).json(userdata);
        console.log(userdata);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error });
    }

})


// get individual user

router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const individualUser = await users.findById({_id:id});
    console.log(individualUser);

    if (!individualUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(individualUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
});

//update user data
router.patch("/updateuser/:id", async(req, res) => {
  try {
    const { id } = req.params;
    console.log("Update request received for ID:", id);
    console.log("Update data:", req.body);
    
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ID format");
      return res.status(400).json({ error: "Invalid ID format" });
    }
    
    const updatedUser = await users.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      console.log("User not found with ID:", id);
      return res.status(404).json({ error: "User not found" });
    }
    
    console.log("User updated successfully:", updatedUser);
    res.status(200).json(updatedUser);
    
  } catch (error) {
    console.error("Update error:", error.message);
    console.error("Full error:", error);
    res.status(500).json({ 
      error: "Exception while updating data", 
      message: error.message 
    });    
  }
});


// delete user
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await users.findByIdAndDelete({ _id: id });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports=router;