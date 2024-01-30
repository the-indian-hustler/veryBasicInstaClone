const express = require("express");
const app = express();
const path = require('path');

const port = 8080;

//ek folder bnaya jarha jisme css ka logic ho 
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine","ejs");
app.get("/",(req,res) => {
    // res.send("this is home");
    res.render("home.ejs");
});

app.get("/hello",(req,res) => {
    res.send("hello");
});

// app.get("/rolldice",(req, res) => {
//     res.send("hello");
// });
//the above was able to just send hello to the website but the below code using render would be capable to send the whole javascipt file hence the website would become dynamic

// app.get("/rolldice", (req, res) => {
// res.render("rolldice.ejs");
// });
//the above was directly passing it but generally it is passed in the form of database 
app.get("/rolldice", (req,res) => {
    let diceVal = Math.floor(Math.random() * 6 +1);
    res.render("rolldice.ejs",{diceVal})
    //now we are passing as a database and will also import as a database
});

//we are making a route for instagram like page
// app.get("/ig/:username",(req,res) => {
//     const followers = ["adam","apple","google","alphabet"];
//     let {username} = req.params;
//     console.log(username);
//     res.render("instagram.ejs",{username,followers});
// });

//the above code was just to get an array but now we are getting data from data.jsomn file 
app.get("/ig/:username", (req, res) => {
    let { username } = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    if (data) {
        res.render("instagram.ejs", { username, data }); // Pass username along with data
    } else {
        res.render("error.ejs");
    }
});



app.listen(port, () => {
    console.log(`listening on port ${port}`);
});