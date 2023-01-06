const express = require("express");
const bodyPArser = require("body-parser");
// const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyPArser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/Signup.html");
});
app.post("/", function (req, res) {

    const fistNAme = req.body.fname;
    const lastNAme = req.body.lname;
    const email = req.body.email;


    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fistNAme,
                    LNAME: lastNAme
                }
            }
        ]
    };

    const jasonData = JSON.stringify(data);
    const url = "https://us12.api.mailchimp.com/3.0/lists/c9756c2f28";
    const option = {
        method: "POST",
        auth: "ravi02:3a1fcacc1cab7fe4a780b36cea377d1b-us12"
    }
    const request = https.request(url, option, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/sucesss.html");
        }
        else {
            res.sendFile(__dirname + "/failuree.html");
        };
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });



    });

    request.write(jasonData);
    request.end();



});

app.post("/failure", function (req, res) {
    res.redirect("/");
});








app.listen(process.env.PORT || 3000, function () {
    console.log("server is running");

});






// apikey







