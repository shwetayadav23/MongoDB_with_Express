const mongoose = require('mongoose');

main().then(res => {
    console.log("connection successful");
}).catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

const Chat = require("./models/chat.js");

let allChats = [
    {
        from: "shweta",
        to: "preetididi",
        message: "love youuu maxxx!!",
        created_at: new Date()
    },
    {
        from: "nonu",
        to: "mumma",
        message: "should I bring dosas?",
        created_at: new Date()
    },
    {
        from: "papa",
        to: "preeti",
        message: "how was your day?",
        created_at: new Date()
    },
    {
        from: "rutuja",
        to: "shraddha",
        message: "what should I wear for the party?",
        created_at: new Date()
    }
];

Chat.insertMany(allChats);