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

export { getEventDetails, createNewEvent, updateName, updateLocation, updateDate, addMember, removeMember, getFeed, deleteEvent };
