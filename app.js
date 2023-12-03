const express = require("express");
const path = require("path");
const app = express();
const port = process.env.port || 80;
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/contact', { useNewUrlParser: true, useUnifiedTopology : true, family :4});
const bodyparser = require("body-parser");

// Defining mongoose schema 
var contactSchema = new mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    ques: String,
})

var Contact = mongoose.model('Contact', contactSchema);

app.use(express.static("Front-end/static"));
app.use(express.static("Front-end/static/staic-images"));
app.use(express.urlencoded());

app.engine("html", require('ejs').renderFile);
app.set("view engine", "html");
app.set('views', path.join(__dirname, 'Front-end/static'));

app.get("/", (req,res)=>{
    const parm = { };
    res.status(200).render("Index.html", parm);
})

app.get("/contact", (req,res)=>{ 
    const parm = { };
    res.status(200).render("contact.html", parm);
})

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("Your response has been recorded")
    }).catch(()=>{
        res.status(400).send("Your response was not recorded")
    });
})

app.listen(port ,"192.168.1.39" ,()=> {
    console.log(`Server started successfully on ${port}`);
})