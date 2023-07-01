import {getData, setData} from './data.js'

function getEventMessages(eventID) {
    const data = getData();
    return data.events[eventID].messages;
}

function sendEventMessage(eventID, userID, content) {
    const data = getData();
    data.events[eventID].messages.push({userID, content});
    setData(data);
}

export { getEventMessages, sendEventMessage };