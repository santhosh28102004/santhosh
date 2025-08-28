const express = require("express")
const mongoose = require("mongoose")
const app = express();
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/studentdb")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("DB connection error:", err))
const studentschema = new mongoose.Schema({
    name: String,
    age: Number,
    dept: String,
    rollno: String
});
app.post('/insert',middleware,insertdata);
function middleware(req,res,next){
    let reqdata=req.body;
    if(reqdata.rollno && reqdata.age && reqdata.dept && reqdata.name){
        next();
    }else{
        res.send("Missing required Params");
    }
}
async function insertdata(req,res){
    const {name,age,dept,rollno}=req.body;
    const newstudent=new student({name,age,dept,rollno});
    try{
        await newstudent.save();
        res.status(201).send("Student inserted")
    } catch(error){
        res.status(400).send("Error inserting student");
    }
}
const student = mongoose.model("student", studentschema);
app.post('/insert', async (req, res) => {
    const { name, age, dept, rollno } = req.body;
    const newstudent = new student({ name, age, dept, rollno });
    try {
        await newstudent.save();
        res.status(201).send("student inserted");
    } catch (error) {
        res.status(400).send("Error inserting student");
    }
});
app.get('/getallstudents', async (req, res) => {
    try {
        const data = await student.find()
        res.send(data)
    } catch (error) {
        res.status(500).send("Error fetching student");
    }
});
app.get('/getstudentbyrollno', async (req, res) => {
    try {
        const { rollno } = req.body;
        const data = await student.findOne({ rollno });
        if (data) {
            res.send(data)
        } else {
            res.status(404).send("Student not found")
        }
    } catch (error) {
        res.status(500).send("Error fetching student");
    }
});
app.delete('/deletestudentbyrollno', async (req, res) => {
    const { rollno } = req.body;
    try {
        const deletedstudent = await student.findOneAndDelete({ rollno })
        if (deletedstudent) {
            res.send("Student Deleted");
        } else {
            res.status(404).send("Student not found");
        }
    }
    catch (err) {
        res.send("Error in deleting Student")
    }
})
app.get('/getstudentbyparams/:rollno', async (req, res) => {
    try {
        const { rollno } = req.params;
        const data = await student.findOne({ rollno })
        if (data) {
            res.send(data);
        } else {
            res.status(404).send("Student not found");
        }
    }
    catch (err) {
        res.send("Error fetching Student")
    }
})
app.get('/getstudentbyquery', async (req, res) => {
    try {
        console.log("Query")
        const { rollno } = req.query;
        const data = await student.findOne({ rollno });
        if (data) {
            res.send(data);
        } else {
            res.status(404).send("Student not found");
        }
    } catch (err) {
        res.status(500).send("Error fetching student");
    }
});
app.put('/updatestudent', async (req, res) => {
    const {rollno,name,age,dept}=req.body;
    try {
        const updatedstudent=await student.findOneAndUpdate(
            {rollno},
            {name,age,dept},
            {new:true}
        )
        if(updatedstudent){
            res.send("Student updated")
        }else{
            res.status(404).send("Student not found")
        }
    } catch (err) {
        res.status(500).send("Error updating student");
    }
});
app.listen(3000);