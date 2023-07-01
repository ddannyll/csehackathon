import {getData, setData} from './data.js'


// class Event {
//     constructor (token, eventID, eventName, date, description, img) {
//         this.token = token;
//         this.eventID = eventID;
//         this.eventName = eventName;
//         this.date = date;
//         this.description = description;
//         this.img = img;
//     }
// }

// const eventGenerator = (token, eventID, eventName, date, description, img) => {
//     return {token, eventID, eventName, date, description, img}
// }

function createNewEvent(eventID, hostID, eventName, date, description, tags, location, members, img) {
    const temp = getData();
    temp.events[eventID] = {eventID, hostID, eventName, date, description, tags, location, members, img};
    setData(temp);

    // console.log(getData());
    // const data = getData();
    //console.log(data.events['sdj'])
    // logEvent('sdj');
    // setData({token, eventID, eventName, date, description, img});
}

function logEvent(eventID) {
    const data = getData();
    console.log(data.events[eventID]);
}

//createNewEvent(19283, 22, 'vietnam', '17/3/24', 'going to vietnam', './image');
//createNewEvent(183, 66, 'tokyo', '17/3/24', 'going to TOKYOOO', './image');
//createNewEvent(183, 'sdj', 'tokyo', '17/3/24', 'going to TOKYOOO', './image');

function getEventDetails(id) {
    createNewEvent('5', 'kieren', 'tokyo', '17/3/24', 'going to TOKYOOO', ['local', 'temple'], 'sydney', ['william', 'kieren'], './image');
    logEvent(id);
}


export { getEventDetails };