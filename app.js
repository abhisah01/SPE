const express = require("express");       // Package to look after request and respose
const bodyParser = require("body-parser");      // Package to parse the data from the HTML forms
const ejs  =require("ejs");
const mongoose = require("mongoose");         // package to connect to the database server
const multer = require("multer");             // package which creates a folder and store images there
const path = require("path");                    // it gives a unique name to the uploaded image
const logger = require("./config/logger");

const app = express();


mongoose.connect("mongodb://mongo:27017/homeDB", {useNewUrlParser: true, useUnifiedTopology: true});              // making the connection to db server

const date = new Date();

const contactSchema = new mongoose.Schema({                            // layout of contact-us form schema
    fullname: {
        type: String,
        required: [true,"No name specified!"]
    },
    email: String,
    subject: {
        type: String,
        required: [true,"No subject specified!"]
    },
    description: String
});

const Contact = mongoose.model("Contact", contactSchema);              // creating a model for contactSchema

const adoptSchema = new mongoose.Schema({                              // layout of book-a-meeting form schema
    fullname: {
        type: String,
        required: [true,"No name specified!"]
    },
    gender: {
        type: String,
        required: [true,"No gender specified!"]
    },
    marriage: {
        type: String,
        required: [true,"Martial status not specified!"]
    },
    age: {
        type: Number,
        min: 25,
        max: 50,
        required: [true,"No age specified"]
    },
    email: String,
    address: String,
    job: String,
    income: Number,
    phonenumber: {
        type: Number,
      //  min: 10,
      //  max: 12,
        required: [true,"No contact number given!"]
    },
    date: Date,
    time: String,
    reason: String
});

const Meeting = mongoose.model("Meeting", adoptSchema);                // creating a model for meeting schema

const labourSchema = new mongoose.Schema({                             // layout of child-labour form schema
    fullname: {
        type: String,
        required: [true, "No name given!"]
    },
    email: String,
    phone: {
        type: Number,
      //  min: 10,
      //  max: 12,
        required: [true,"No contact number given!"]                     // Validators check to see that info is given by user
    },
    state: String,
    district: String,
    landmark: String,
    filename: String,
    description: String
});

const Labour = mongoose.model("Labour", labourSchema);                  // creating a model for child-labour schema

app.set('view engine','ejs');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));        // to parse multiple inputs from a form at the same time

/////////////////////Request made to the home page//////////////////////////////
app.get("/", function(req,res){

  logger.info("Home page request");
    res.render("home",{date: date});
});



/////////////////////Getting data from the contact us form////////////////////////
app.post("/", function(req,res){


    const data = new Contact({
        fullname: req.body.fullname,
        email: req.body.email,
        subject: req.body.subject,
        description: req.body.textarea
    });

     
    console.log(data);

    data.save(function(err,result){

        if(err){
          logger.error(err);
          res.sendFile(__dirname + "/failure.html");
        }
        else{
          logger.info("Entry saved for contact-us");
          res.sendFile(__dirname + "/success.html");
        }
    });

    
});


////////////////////Request made to the adoption page/////////////////////////////
app.get("/adoption", function(req,res){

    logger.info("Adoption page request");

    res.render("adoption");
});


/////////////////////Getting data from the book a meeting form//////////////////////
app.post("/adoption", function(req,res){
   
    const data = new Meeting({
        fullname: req.body.fullname,
        gender: req.body.gender,
        marriage: req.body.marriage,
        age: req.body.age,
        email: req.body.email,
        address: req.body.address,
        job: req.body.job,
        income: req.body.income,
        phonenumber: req.body.phonenumber,
        date: req.body.meeting,
        time: req.body.time,
        reason: req.body.reason
    });

    console.log(data);

    data.save(function(err,result){

        if(err){
          logger.error(err);
          res.sendFile(__dirname + "/failure.html");
        }
        else{
          logger.info("Meeting form entry saved");
          res.sendFile(__dirname + "/success.html");
        }
          
    });
});


/////////////////////Request made to the child labour page/////////////////////////
app.get("/child_labour", function(req,res){

    logger.info("Child labour page request");

    res.render("child_labour");
});


////////////////////Getting data from the child_labour form////////////////////////

const Storage1 = multer.diskStorage({

    destination: "./uploads",
    filename: (req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({
    storage: Storage1

}).single('filename');


app.post("/child_labour",upload, function(req,res){

    const data= new Labour({
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        state: req.body.state,
        district: req.body.district,
        landmark: req.body.landmark,
        filename: req.file.filename,
        description: req.body.description
    });

    console.log(data);

    data.save(function(err,result){

        if(err){
          logger.error(err);
          res.sendFile(__dirname + "/failure.html");
        }
        else{
          logger.info("child-labour entry saved");
          res.sendFile(__dirname + "/success.html");
        }
    });
});


/////////////////////Request made to the donation page/////////////////////////////
app.get("/donation", function(req,res){

    logger.info("Donation page request");

    res.render("donation");
});















////////////////////Browser making a get request to our server at port 3000//////////////////////////

app.listen(3000, function(){

    console.log("Server started on port 3000");

    //logger.info("Server started on port 3000");
});


module.exports = app;
