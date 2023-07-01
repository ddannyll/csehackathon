import { getData, setData } from "./data";

function deleteEvent(event_id) {
    const data = getData();
    const events = data.events;
    
    return events.filter(event => event.event_id != event_id);
}

function getFeed(user_id) {
    const data = getData();
    const events = data.events;

    const user = data.users.find(user => user.user_id == user_id);

    // create array of feed_items
    // feed_items:
    //      - event: Event
    //      - tag_rating: int
    feed = new Array();
    for (const event in events) {
        const feed_item = {
            'event_id': event.event_id,
            'tag_rating': findTagRating(user.user_id, event_id),
        }

        if (event.user_id != user_id) {
            feed.push(feed_item);
        }
    }

    // sort by tags > data
    feed.sort((a, b) => (a.tag_rating > b.tag_rating) ? 1 : -1 || (a.date < b.date) ? 1 : -1);

    return feed;
}

function findTagRating(user_id, event_id) {
    const data = getData;
    const tag_rating = 0;

    const user = data.users.find(user => user.user_id == user_id);
    const event = data.events.find(event => event.event_id == event_id);

    for (const tag in user.tags) {
        if (event.tags.contains(tag)) {
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
