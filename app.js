const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));


app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  console.log(firstName, lastName, email);

  const listId="1a5cef6bd2";

  const subscribingUser={
      firstName: firstName,
      lastName: lastName,
      email: email
  };
  async function run(){
    const response=await mailchimp.lists.addListMember(listId,{
      email_address: subscribingUser.email,
      status:"subscribed",
      merge_fields:{
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });
    res.sendFile(__dirname+"/success.html");
    console.log(`Successfully added contact as an audience member. The contact's id is ${
     response.id
     }.`
    );

  }
  run().catch(e => res.sendFile(__dirname + "/failure.html"));

});
app.listen(process.env.PORT|| 3000, function() {
  console.log("server started on port 3000");
});

mailchimp.setConfig({
  apiKey:"5f9555187c196e6b936d7efd45ecb624-us17",
  server: "us17"
});





//url
//https://us17.api.mailchimp.com/3.0/lists/1a5cef6bd2

// 5f9555187c196e6b936d7efd45ecb624-us17  :-  API key

// 1a5cef6bd2      :- List id
