const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://hashubug:ඔබේ_Password@hashubug.1zu35bv.mongodb.net/?appName=hashubug");

const User = mongoose.model('User', new mongoose.Schema({ name: String, phone: String }));
const Message = mongoose.model('Message', new mongoose.Schema({ text: String, sender: String }));

app.post('/register', async (req, res) => {
    await new User(req.body).save();
    res.json({ success: true });
});

app.post('/chat', async (req, res) => {
    await new Message(req.body).save();
    res.json({ success: true });
});

app.get('/chat', async (req, res) => {
    const msgs = await Message.find();
    res.json(msgs);
});

app.listen(3000, () => console.log("Server Running on port 3000"));
