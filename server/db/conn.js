const mongoose=require("mongoose");

const DB= "mongodb+srv://SaiKrishna:mongodb@cluster0.f5oeejg.mongodb.net/mernstack?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to MongoDB..."))
.catch(err => console.log(err.message));

