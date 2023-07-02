import { stringify } from 'querystring'

export const fetchUserDetails = async ({userId}: {userId: string}) => {
    const dummyData = {
        username: 'daniel',
        bio: 'this is my really cool bio i am a really cool person and i like travelling to really cool places',
        tags: ['korea', 'food', 'pets'],
        picture: 'https://cgi.cse.unsw.edu.au/~cs2041//team/5363586/profile.jpg',
        hosted_events: ['eventid1', 'eventid2', 'eventid3'],
        joined_events: ['otherEventId1', 'eventid2', 'eventid1', 'otherEventId1'],
    }

    return dummyData
}

export const fetchEventDetails = async ({eventId}: {eventId: string}) => {
    const dummyData = {
        hostId: 'kieranId',
        eventName: 'Bouldering',
        date: '2023-07-01T14:16:13+0000',
        description: 'Let\'s climb at 9 Degrees Waterloo!. Meet up at Redfern station at 12pm, everyone is welcome! Dinner aftewards at Mascot.',
        tags: ['fitness', 'climb', 'local'],
        location: 'sydney',
        members: [],
        limit: 5,
        img: 'https://media.timeout.com/images/105287783/image.jpg',
    }

    const dummyData2 = {
        hostId: 'kieranId',
        eventName: 'Hiking Adventure',
        date: '2023-07-15T09:00:00+0000',
        description: 'Join us for an exciting hiking adventure in the scenic mountains!',
        tags: ['hiking', 'adventure', 'nature', 'outdoor'],
        location: 'mountains',
        limit: 5,
        members: [],
        img: '',
    };

    const dummyData3 = {
        hostId: 'kieranId',
        eventName: 'Skiing Adventure',
        date: '2023-07-15T09:00:00+0000',
        description: 'Join us for an exciting skiing adventure in the scenic mountains!',
        tags: ['snow', 'adventure', 'nature', 'outdoor'],
        location: 'perisher',
        limit: 7,
        members: [],
        img: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Norway_skiing.jpg',
    }

    switch (eventId) {
    case 'eventid1':
        return dummyData
    case 'otherEventId1':
        return dummyData3
    default:
        return dummyData2
    }

}

export const fetchFeed = async ({userId}: {userId: string}) => {
    const dummyData = [
        {
            'event_id': 'eventid1',
            'tag_rating': 5,
            'date': '2023-07-01T14:16:13+0000',
        },
        {
            'event_id': 'eventid2',
            'tag_rating': 3,
            'date': '2023-07-01T14:16:13+0000',
        },
    ]
    return dummyData
}
