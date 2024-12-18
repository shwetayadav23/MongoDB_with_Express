const express = require('express');
const app = express();
const port = 8080;
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require('method-override');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); 
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());

const mongoose = require('mongoose');

main().then(res => {
    console.log("connection successful");
}).catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// let chat1 = new Chat({
//     from: "nonu",
//     to: "shweta",
//     message: "did you had lunch?",
//     created_at: new Date()
// });

// chat1.save()
//     .then(res => {
//         console.log(res);
//     }).catch(err => {
//         console.log(err);
//     });

app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", { chats });
});

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/chats", (req, res) => {
    let { from, msg, to } = req.body;
    let newChat = new Chat({
        from: from,
        message: msg,
        to: to,
        created_at: new Date()
    });
    newChat.save().then(res => {
        console.log("chat saved successfully");
    }).catch(err => {
        console.log(err);
    });
    res.redirect("/chats");
});

app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    console.log(id);
    Chat.findById(id).then(chat => {
        res.render("form.ejs", { chat });
    }).catch(err => {
        console.log(err);
    });
});

app.put("/chats/:id", (req, res) => {
    let { id } = req.params;
    let { msg } = req.body;
    console.log(req.body);
    Chat.findByIdAndUpdate(id, {message: msg}, { runValidators: true, new : true }).then(chat => {
        res.redirect("/chats");
    }).catch(err => {
        console.log(err);
    });
});

app.delete("/chats/:id", (req, res) => {
    let { id } = req.params;
    Chat.findByIdAndDelete(id).then(chat => {
        res.redirect("/chats");
    }).catch(err => {
        console.log(err);
    });
});

app.get("/", (req, res) => {
    res.send("route is working");
});

app.listen(port, () => {
    console.log(`app is listening at port ${port}`);
});
