const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/studentdb")
.then(()=>console.log("MongoDB connected"))
.catch(err => console.log("Db connection Error:",err));

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    department:String,
    rollno:String
})
const Student = mongoose.model("student",studentSchema);  

app.post("/insert", async (req, res) => {
  const { name, age, department, rollno } = req.body;
  const newStudent = new Student({ name, age, department, rollno });

  try {
    await newStudent.save();
    res.status(201).send("Student inserted");
  } catch (error) {
    console.error("Insert Error:", error);
    res.status(400).send("Error inserting student");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/getStudentByRollNo", async (req, res) => {
  try {
    const { rollno } = req.query; 
    const data = await Student.findOne({ rollno });

    if (data) {
      res.json(data); 
    } else {
      res.status(404).send("Student not found");
    }
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).send("Server error");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


app.delete("/deleteStudentByRollNo", async (req, res) => {
  const { rollno } = req.body; 
  try {
    const result = await Student.deleteOne({ rollno });

    if (result.deletedCount > 0) { 
      res.status(200).send("Student deleted successfully");
    } else {
      res.status(404).send("Student not found");
    }
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).send("Server error while deleting student");
  }
});

app.put('/updateStudent',async(req,res) => {
    const {rollNo,name,age,department} =req.body;
    try{
        const updatedStudent = await Student.findOneAndUpdate(
            {rollNo},
            {name,age,department},
            {new:true}
        );
        if(updatedStudent){
            res.send("Student updated");
        }else{
            res.status(404).send("students not found");
        }
    }catch (error){
        res.status(500).send("error uploding student");
    }
});


