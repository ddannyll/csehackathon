import { getData } from "./data";

function getFeed(userId) {
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

        feed.push(feed_item);
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