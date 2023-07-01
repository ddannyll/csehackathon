import { getData, setData } from "./data.js";

function deleteEvent(eventID) {
    const data = getData();
    const events = data.events;
    
    delete events.eventID;
    setData(data);
}

function getFeed(user_id) {
    const data = getData();
    const users = data.users;
    const events = data.events;

    const user = users.find(user => user.user_id === user_id);

    // create array of feed_items
    // feed_items:
    //      - event: Event
    //      - tag_rating: int
    var feed = new Array();
    for (const [eventID, event] of Object.entries(events)) {
        const feed_item = {
            'event_id': eventID,
            'tag_rating': findTagRating(user.user_id, eventID),
            'date': event.date,
        }

        if (event.hostID != user_id) {
            feed.push(feed_item);
        }
    }

    // sort by tags > date
    feed.sort(function (a, b) {
        return b.tag_rating - a.tag_rating || new Date(a.date) - new Date(b.date);
    });

    return feed;
}

function findTagRating(user_id, event_id) {
    const data = getData();
    var tag_rating = 0;

    const user = data.users.find(user => user.user_id === user_id);
    const event = data.events[event_id];
    
    for (const tag in user.tags) {
        if (event.tags.includes(user.tags[tag])) {
            tag_rating++;
        }
    }

    return tag_rating;
}


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


export { getEventDetails, deleteEvent, getFeed };
