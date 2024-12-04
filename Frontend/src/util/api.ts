import axios from "axios";
import { Event } from "../types/event_types";

export default class APIWrapper {

    api: string = 'http://ec2-3-101-123-79.us-west-1.compute.amazonaws.com:8080/api/v1';
    events: Event[];
    dummyEvents: Event[] = [];

    constructor() {
        this.events = [];
        this.dummyEvents.push({
            UID: "7d2fdf61-d058-4cfe-b2dc-ad0f79d8d379",
            icon: 'https://i.ytimg.com/vi/PaprAoCWe2M/hq720.jpg?sqp=-oaymwEpCNAFEJQDSFryq4qpAxsIARUAAIhCGAHYAQHiAQwIHBACGAYgATgBQAE=&rs=AOn4CLDCnuwwV7sV3dgj3e_WUh1IB59Jag',
            location: "Student Union",
            event_name: "Welcome Week",
            date: new Date(),
            description: `Take part in the greatest event yet! These are some random words that will be filling up the event description. It shouldn't be too long.\n\nIf the world was ending, I wanna be next to youuuUUuuu. If the party was over and our time on earth was throughhhh. `,
            registered: [],
            attended: []
        });
        this.dummyEvents.push({
            UID: "245fdf61-d058-4cfe-b2dc-ad0f79d8d379",
            icon: 'https://i.ytimg.com/vi/PaprAoCWe2M/hq720.jpg?sqp=-oaymwEpCNAFEJQDSFryq4qpAxsIARUAAIhCGAHYAQHiAQwIHBACGAYgATgBQAE=&rs=AOn4CLDCnuwwV7sV3dgj3e_WUh1IB59Jag',
            location: "idk",
            event_name: "Fall Break",
            date: new Date(),
            description: `Yay!!!. `,
            registered: [],
            attended: []
        });
        this.dummyEvents.push({
            UID: "7d345f34-d058-4cfe-b2dc-ad0f79d8d379",
            icon: 'https://i.ytimg.com/vi/PaprAoCWe2M/hq720.jpg?sqp=-oaymwEpCNAFEJQDSFryq4qpAxsIARUAAIhCGAHYAQHiAQwIHBACGAYgATgBQAE=&rs=AOn4CLDCnuwwV7sV3dgj3e_WUh1IB59Jag',
            location: "Chick-Fil-A",
            event_name: "Discounts",
            date: new Date(),
            description: `free food holy moly!`,
            registered: [],
            attended: []
        });
        this.dummyEvents.push({
            UID: "7d345f34-d058-4cfe-b2dc-d39f79d8d379",
            icon: 'https://i.ytimg.com/vi/PaprAoCWe2M/hq720.jpg?sqp=-oaymwEpCNAFEJQDSFryq4qpAxsIARUAAIhCGAHYAQHiAQwIHBACGAYgATgBQAE=&rs=AOn4CLDCnuwwV7sV3dgj3e_WUh1IB59Jag',
            location: "Panda Express",
            event_name: "Free orange chicken bowl",
            date: new Date(),
            description: `free food holy moly!`,
            registered: [],
            attended: []
        });
    }

    async fetchEvents(): Promise<Event[]> {
        await this.loadEvents();
        return this.events as Event[];
    }

    private async loadEvents() {
        const loadedEvents: unknown = await axios.get(this.api + "/events")
            .then(res => res?.data ?? null)
            .catch((error) => {
                console.log(error);
                return this.dummyEvents;
            });

        this.events = loadedEvents as Event[];
    }
}