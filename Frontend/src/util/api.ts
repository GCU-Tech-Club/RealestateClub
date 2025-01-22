import { Event, EventRest } from "../types/eventTypes";

export class APIWrapper {

    private api: string = 'http://ec2-54-215-43-213.us-west-1.compute.amazonaws.com/api/v1';
    private events: Event[];
    static instance: APIWrapper;

    constructor() {
        this.events = [];
        if (process.env.NODE_ENV === 'development') {
            this.api = 'http://localhost:5001/api/v1'; // development api
            console.log('Development mode');
        } else {
            this.api = process.env.connection_api || 'http://ec2-54-215-43-213.us-west-1.compute.amazonaws.com/api/v1'; // fallback to default if not set
        }
    }

    static getInstance(): APIWrapper {
        if (!APIWrapper.instance) {
            APIWrapper.instance = new APIWrapper();
        }
        return APIWrapper.instance;
    }

    async fetchEvents(page: number = 0, pageSize: number = 10): Promise<Event[]> {
        const events = await this.loadEventsFromAPI(page, pageSize);

        this.events = events.events;
        return this.events as Event[];
    }

    private async loadEventsFromAPI(page: number = 0, pageSize: number = 10): Promise<EventRest> {

        const response = await fetch(this.api + `/events?page=${page}&pageSize=${pageSize}`)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const loadedEvents = await response.json()

        console.log('Got events from server: ', loadedEvents);
        // removed AXIOS
        // const loadedEvents: unknown = await axios.get(this.api + `/events?page=${page}&pageSize=${pageSize}`)
        //     .then(res => res?.data ?? null)
        //     .catch((error) => {
        //         console.error(error);
        //         return {
        //             page: 0,
        //             pageSize: 10,
        //             totalEvents: 0,
        //             events: []
        //         };
        //     });

        return loadedEvents as EventRest;
    }
}

export default APIWrapper.getInstance()