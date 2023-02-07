const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const User = require('./models/user');
const Message = require('./models/message');
const PrivateMessage = require('./models/privateMessage');
const bcrypt = require('bcryptjs');


mongoose.connect('mongodb+srv://vinz232:poli1998@lab-test-1.1kqmt54.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/register', (req, res) => {
    const { username, password, firstname, lastname } = req.body;
    const createon = new Date();
    User.findOne({ username }, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (user) return res.status(400).send('User already exists.');
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return res.status(500).send('Error on the server.');
            const newUser = new User({
                username,
                password: hash,
                firstname,
                lastname,
                createon
            });
            newUser.save((err, user) => {
                if (err) return res.status(500).send('Error on the server.');
                res.send(user);
            });
        });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) return res.status(500).send('Error on the server.');
            if (!result) return res.status(400).send('Wrong password.');
            res.send(user);
        });
    });
});

io.on('connection', socket => {
    socket.on('join room', room => {
        socket.join(room);
    });

    socket.on('leave room', room => {
        socket.leave(room);
    });

    socket.on('group message', data => {
        const {from_user, room, message} = data;
        const date_sent = new Date();
        const newMessage = new Message({
            from_user,
            room,
            message,
            date_sent
        });
        newMessage.save((err, message) => {
            if (err) return console.error(err);
            io.to(room).emit('group message', message);
        });
    });
});