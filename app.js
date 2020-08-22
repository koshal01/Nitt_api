const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { RSA_NO_PADDING } = require('constants');
const { exit } = require('process');
const app = express();

var students = [
{
    id: 1,
    roll: '107119140',
    name: 'KhushiRam',
    dept: 'EEE'
},
{
    id: 2,
    roll: '110119128',
    name: 'Yash',
    dept: 'ICE'  
}
];

var currentId = 2;

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/student', (req,res) => {
    res.send({ students: students });
})

app.post('/student', (req,res) => {
    var { roll, name, dept } = req.body;
    var found = 0;
    
    if (!roll || !name || !dept) {
        return res.send({ msg: 'Please enter all fields' });
    }
    
    students.forEach(student => {
        if(student.roll === roll){
            found++;
        }
    });
    
    if(found === 1) return res.send({msg: "Student with that roll no exists", status: "400"});    
    students.push({
        id: ++currentId,
        roll,
        name,
        dept
    });
    res.send({msg: "Successfully Added"});
});

app.put('/student/:id', (req, res) => {
    var id = req.params.id;
    var { newName, newRoll } = req.body;

    var found = false;

    students.forEach((student) => {
        if (!found && student.id === Number(id)) {
            student.name = newName;
            student.roll = newRoll;
        }
    });

    res.send('Succesfully updated student!');
})

app.delete('/students/:id', (req, res) => {
    var id = req.params.id;

    var found = false;

    students.forEach((student, index) => {
        if (!found && student.id === Number(id)) {
            students.splice(index, 1);
        }
    });

    res.send('Successfully deleted student!');
});

app.get('/searchbyroll/:roll', (req,res) => {
    var roll = req.params.roll;
    var found = false;

    students.forEach((student) => {
        if(!found && Number(student.roll) === Number(roll)) {
            found = true;
            res.send({student});
        }
    });
});

app.get('/specificroll/:roll', (req,res) => {
    var roll = req.params.roll;
    let rollPattern = new RegExp("^"+roll)
    
    var search = [];

    students.forEach((student) => {
        if(rollPattern.test(student.roll)) {
            search.push({
                id: student.id,
                name: student.name,
                roll: student.roll,
                dept: student.dept
            })
        }
    });
    res.send({search});
});


app.get('/searchbyname/:name', (req,res) => {
    var name = req.params.name;
    var found = false;

    students.forEach((student) => {
        console.log(student.roll);
        if(!found && student.name == name) {
            found = true;
            res.send({student});
        }
    });
});

app.get('/specificname/:name', (req,res) => {
    var name = req.params.name;
    let namePattern = new RegExp("^"+name)
    
    var search = [];

    students.forEach((student) => {
        if(namePattern.test(student.name)) {
            search.push({
                id: student.id,
                name: student.name,
                roll: student.roll,
                dept: student.dept
            })
        }
    });
    console.log(search);
    res.send({search});
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});