import {getData, setData} from './data.js'

function getEventMessages(eventID) {
    const data = getData();
    return data.events[eventID].messages;
}

function sendEventMessage(eventID, userID, content) {
    const data = getData();
    const messages = data.events[eventID].messages;
    messages.push({userID, content});
    data.events[eventID].messages = messages;
    setData(data);
}

export { getEventMessages, sendEventMessage };