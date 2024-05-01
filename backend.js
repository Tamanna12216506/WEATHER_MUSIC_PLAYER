const express = require("express");
const mongoose = require('mongoose')
const app = express();
app.use(express.urlencoded({ extended: true }))
const path = require('path'); 

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));


main().then(res => {
    console.log("Connection successfully")
})
    .catch(err => {
        console.log(err);
    })

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/MRegistration")
}

const registerSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Username: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Created_at: {
        type: Date,
        required: true,
    }
})

const Userdata = mongoose.model("Userdata", registerSchema)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.get('/playlist/winter.html', (req, res) => {
    res.sendFile(path.join(__dirname, "playlist/winter.html"))
})

app.get('/playlist/summer.html', (req, res) => {
    res.sendFile(path.join(__dirname, "playlist/summer.html"))
})

app.get('/playlist/party.html', (req, res) => {
    res.sendFile(path.join(__dirname, "playlist/party.html"))
})

app.get('/playlist/rainy.html', (req, res) => {
    res.sendFile(path.join(__dirname, "playlist/rainy.html"))
})

app.get('/playlist/india.html', (req, res) => {
    res.sendFile(path.join(__dirname, "playlist/india.html"))
})

app.get('/playlist/night.html', (req, res) => {
    res.sendFile(path.join(__dirname, "playlist/night.html"))
})

app.get('/playlist/ride.html', (req, res) => {
    res.sendFile(path.join(__dirname, "playlist/ride.html"))
})

app.get('/playlist/moring.html', (req, res) => {
    res.sendFile(path.join(__dirname, "playlist/moring.html"))
})

app.get('/playlist/top.html', (req, res) => {
    res.sendFile(path.join(__dirname, "playlist/top.html"))
})


app.get('/loginPage/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, "loginPage/register.html"))
})


app.get('/loginPage/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, "loginPage/login.html"))
})


app.post('/store', (req, res) => {

    var { fname, uname, add, pas } = req.body
    let username = uname
    Userdata.findOne({ Username: uname })
        .then((data1) => {
            if (data1 == null) {
                var reg = new Userdata({
                    Name: fname,
                    Username: uname,
                    Address: add,
                    Password: pas,
                    Created_at: new Date(),
                })
                reg.save()
                    .then(() => {
                        
                        res.sendFile(path.join(__dirname,"index.html"))
                    })
            }
            else {
                res.send(`<h1>Such username is already in use. Give different username</h1>`)
            }
        })


})

app.post("/loggedin", (req, res) => {
    let username = req.body.username;
    let pass = req.body.pass;
    Userdata.findOne({ Username: username, Password: pass })
        .then((data) => {
          
            if (data == null) {
                res.send(`<h1>Such user does not exist</h1>`)
            }
            else {
            //    res.send("working")
                res.sendFile(path.join(__dirname,"index.html"))
            }
        })
        .catch(() => {
            res.status(401).send(`<h1>Invalid username or password</h1>`);
        })
})

app.listen(8080, () => {
    console.log("Listening on port 8080")
})