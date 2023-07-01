import {getData, setData} from './data.js'


function createNewEvent(eventID, hostID, eventName, date, description, tags, location, members, img) {
    const data = getData();
    data.events[eventID] = {eventID, hostID, eventName, date, description, tags, location, members, img};
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


export { getEventDetails, createNewEvent };