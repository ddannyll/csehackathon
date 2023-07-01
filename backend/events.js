import {getData, setData} from "./data.js";


function getFeed(userID) {
    const data = getData();
    const users = data.users;
    const events = data.events;

    const user = users.find(user => user.userID === userID);

    // create array of feed_items
    // feed_items:
    //      - event: Event
    //      - tag_rating: int
    const feed = [];
    for (const [eventID, event] of Object.entries(events)) {
        const feed_item = {
            'event_id': eventID,
            'tag_rating': findTagRating(user.userID, eventID),
            'date': event.date,
        }

        if (event.hostID !== userID) {
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
    let tag_rating = 0;

    const user = data.users.find(user => user.userID === user_id);
    const event = data.events[event_id];
    
    for (const tag in user.tags) {
        if (event.tags.includes(user.tags[tag])) {
            tag_rating++;
        }
    }

    return tag_rating;
}

function createNewEvent(eventID, hostID, eventName, date, description, tags, location, limit, members, img) {
    const data = getData();
    const messages = []
    data.events[eventID] = {eventID, hostID, eventName, date, description, tags, location, limit, members, img, messages};
    setData(data);
}

function deleteEvent(user, id) {
    const data = getData();
    if (user !== data.events[id].hostID) return false;
    delete data.events[id];
    setData(data);
    return true;
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

function updateImage(user, id, image) {
    const data = getData();
    if (user !== data.events[id].hostID) return false;
    data.events[id].img = image;
    setData(data);
    return true;
}

function updateLimit(user, id, limit) {
    const data = getData();
    const members = data.events[id].members;
    if (user !== data.events[id].hostID) return false;
    if (limit < members.length) return false;
    data.events[id].limit = limit;
    setData(data);
    return true;
}

function addMember(user, id) {
    const data = getData();
    const members = data.events[id].members;
    if (members.includes(user)) return false;

    const limit = Number(data.events[id].limit);
    if (members.length === limit) return false;

    members.push(user);
    data.events[id].members = members;
    setData(data);
    return true;
}

function removeMember(user, remove, id) {
    const data = getData();
    const members = data.events[id].members;
    if (user !== data.events[id].hostID) return false;
    if (!members.includes(user)) return false;
    data.events[id].members = members.filter(member => member !== remove);
    setData(data);
    return true;
}

export { getEventDetails, createNewEvent, updateName, updateLocation, updateDate, updateImage, updateLimit, addMember, removeMember, getFeed, deleteEvent };
