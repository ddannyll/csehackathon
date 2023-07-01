import { getData, setData } from './data.js'



function register(username, password) {
    let data = getData();
    data.users[username] = {
        userID: username,
        password: password,
        bio: null,
        tags: [],
        picture: null
    }
    setData(data);
    return { username };
}

function login(username, password) {
    let data = getData();
    if (data.users[username] !== undefined && data.users[username].password === password) {
        return { username };
    } else {
        return { error: 'error' };
    }
}

function updateProfile(username, bio, tags, picture) {
    let data = getData();
    data.users[username].bio = bio;
    data.users[username].tags = tags;
    data.users[username].picture = picture;
    setData(data);
    return true;
}

function profileDetails(username) {
    let data = getData();
    let user = data.users[username];
    return {
        username: user.userID,
        bio: user.bio,
        tags: user.tags,
        picture: user.picture,
        hostedEvents: Object.values(data.events).filter(event => event.hostID === username).map(a => a.eventID),
        joinedEvents: Object.values(data.events).filter(event => event.members.find(member => member === username) !== undefined).map(a => a.eventID)
    };
}


export { login, register, updateProfile, profileDetails };