import { Event } from "../types/event";


const sampleEvents: Event[] = [
    {
        icon: 'https://i.ytimg.com/vi/PaprAoCWe2M/hq720.jpg?sqp=-oaymwEpCNAFEJQDSFryq4qpAxsIARUAAIhCGAHYAQHiAQwIHBACGAYgATgBQAE=&rs=AOn4CLDCnuwwV7sV3dgj3e_WUh1IB59Jag',
        id: 0,
        location: "Student Union",
        title: "Welcome Week",
        type: "VIRTUAL",
        date: new Date(), 
        description: `Take part in the greatest event yet! These are some random words that will be filling up the event description. It shouldn't be too long.\n\nIf the world was ending, I wanna be next to youuuUUuuu. If the party was over and our time on earth was throughhhh. ` 
    },
    {
        icon: 'https://i.ytimg.com/vi/PaprAoCWe2M/hq720.jpg?sqp=-oaymwEpCNAFEJQDSFryq4qpAxsIARUAAIhCGAHYAQHiAQwIHBACGAYgATgBQAE=&rs=AOn4CLDCnuwwV7sV3dgj3e_WUh1IB59Jag',
        id: 1,
        location: "Student Union",
        title: "Welcome Week",
        type: "VIRTUAL",
        date: new Date(), 
        description: `Take part in the greatest event yet! These are some random words that will be filling up the event description. It shouldn't be too long.\n\nIf the world was ending, I wanna be next to youuuUUuuu. If the party was over and our time on earth was throughhhh. ` 
    },
    {
        icon: 'https://i.ytimg.com/vi/PaprAoCWe2M/hq720.jpg?sqp=-oaymwEpCNAFEJQDSFryq4qpAxsIARUAAIhCGAHYAQHiAQwIHBACGAYgATgBQAE=&rs=AOn4CLDCnuwwV7sV3dgj3e_WUh1IB59Jag',
        id: 2,
        location: "Student Union",
        title: "Welcome Week",
        type: "VIRTUAL",
        date: new Date(), 
        description: `Take part in the greatest event yet! These are some random words that will be filling up the event description. It shouldn't be too long.\n\nIf the world was ending, I wanna be next to youuuUUuuu. If the party was over and our time on earth was throughhhh. ` 
    },
    {
        icon: 'https://i.ytimg.com/vi/PaprAoCWe2M/hq720.jpg?sqp=-oaymwEpCNAFEJQDSFryq4qpAxsIARUAAIhCGAHYAQHiAQwIHBACGAYgATgBQAE=&rs=AOn4CLDCnuwwV7sV3dgj3e_WUh1IB59Jag',
        id: 3,
        location: "Student Union",
        title: "Welcome Week",
        type: "VIRTUAL",
        date: new Date(), 
        description: `Take part in the greatest event yet! These are some random words that will be filling up the event description. It shouldn't be too long.\n\nIf the world was ending, I wanna be next to youuuUUuuu. If the party was over and our time on earth was throughhhh. ` 
    },
    {
        icon: 'https://i.ytimg.com/vi/PaprAoCWe2M/hq720.jpg?sqp=-oaymwEpCNAFEJQDSFryq4qpAxsIARUAAIhCGAHYAQHiAQwIHBACGAYgATgBQAE=&rs=AOn4CLDCnuwwV7sV3dgj3e_WUh1IB59Jag',
        id: 4,
        location: "Student Union",
        title: "Welcome Week",
        type: "VIRTUAL",
        date: new Date(), 
        description: `Take part in the greatest event yet! These are some random words that will be filling up the event description. It shouldn't be too long.\n\nIf the world was ending, I wanna be next to youuuUUuuu. If the party was over and our time on earth was throughhhh. ` 
    },
    {
        icon: 'https://i.ytimg.com/vi/PaprAoCWe2M/hq720.jpg?sqp=-oaymwEpCNAFEJQDSFryq4qpAxsIARUAAIhCGAHYAQHiAQwIHBACGAYgATgBQAE=&rs=AOn4CLDCnuwwV7sV3dgj3e_WUh1IB59Jag',
        id: 5,
        location: "Student Union",
        title: "Welcome Week",
        type: "VIRTUAL",
        date: new Date(), 
        description: `Take part in the greatest event yet! These are some random words that will be filling up the event description. It shouldn't be too long.\n\nIf the world was ending, I wanna be next to youuuUUuuu. If the party was over and our time on earth was throughhhh. ` 
    }
]

let api = ''

if (import.meta.env.MODE === 'development') {
    api = 'http://localhost:5001/api/v1/events'
} else {
    api = 'http://ec2-3-101-123-79.us-west-1.compute.amazonaws.com:8080/api/v1/events'
}

class eventsService {
    /**
     * Gets the sameple data from 
     */
    static async getEvents(): Promise<Event[]> {
        return sampleEvents;
    }
    static async getActualEvents(): Promise<Event[]> {
        console.log('Fetching events from Firebase...', api)
        const response = await fetch(api, { mode: 'no-cors'});
        const data = await response.json();
        console.log('Firebase Data: ', data)
        return data;
    }
}

export default eventsService;