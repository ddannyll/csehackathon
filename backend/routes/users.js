import { getData, setData } from './data'
const express = require('express')
const router = express.Router()

router.get('/register', (req, res) => {
    console.log(req.query.name)
    res.send("users")
})

module.exports = router



function register(username, password) {
    let data = getData();
    data.users.push({
        uId: username,
        password: password,
    })
    setData(data);
    return { username };
}

function login(username, password) {
    let data = getData();
    user = data.users.find(user => user.username === username);
    if (user != undefined && user.password === password) {
        return { username };
    } else {
        return { error: 'error' };
    }
}

function updateProfile(name, bio, tags, picture) {
    let data = getData();
    index = data.users.inde
}