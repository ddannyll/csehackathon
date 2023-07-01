import {getData, setData} from './data.js'


function createNewEvent(eventID, hostID, eventName, date, description, tags, location, members, img) {
    const data = getData();
    const messages = [];
    data.events[eventID] = {eventID, hostID, eventName, date, description, tags, location, members, img, messages};
    setData(data);
}


// logger for debugging
function logEvent(eventID) {
    const data = getData();
    console.log(data.events[eventID]);
}

function getEventDetails(id) {
    const data = getData();
    return data.events[id];
}

function updateName(user, id, name) {
    const data = getData();
    if (user !== data.events[id].hostID) return false;
    data.events[id].eventName = name;
    setData(data);
    return true;
}

function updateLocation(user, id, location) {
    const data = getData();
    if (user !== data.events[id].hostID) return false;
    data.events[id].location = location;
    setData(data);
    return true;
}

function updateDate(user, id, date) {
    const data = getData();
    if (user !== data.events[id].hostID) return false;
    data.events[id].date = date;
    setData(data);
    return true;
}

// function updateImage(user, id, image) {
//     const data = getData();
//     data.events[id].image = image;
//     setData(data)
// }

function addMember(user, id) {
    const data = getData();
    const members = data.events[id].members;
    if (members.includes(user)) return false;
    members.push(user);
    data.events[id].members = members;
    setData(data);
    return true;
}

function removeMember(user, id) {
    const data = getData();
    const members = data.events[id].members;
    if (!members.includes(user)) return false;
    const updatedMembers = members.filter(member => member !== user);
    data.events[id].members = updatedMembers;
    setData(data);
    return true;
}

export { getEventDetails, createNewEvent, updateName, updateLocation, updateDate, addMember, removeMember };