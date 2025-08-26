const express = require('express');
const controller = require('./controller')
const app = express();
app.use(express.json());

app.post('/insert', controller.insertdata);
app.get('/getAllStudents', controller.getAllStudents);
app.get('/getStudentByRollNo', controller.getStudentByRollNo);
app.delete('/deleteStudent', controller.deleteStudent);

app.get('/pharamscheck/:id',(req,res) => {
    console.log(req.phrams.id);
    res.end("params checked");
})


app.listen(3000); 