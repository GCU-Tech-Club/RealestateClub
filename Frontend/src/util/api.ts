import axios from "axios";
import { Event, EventRest } from "../types/event_types";

export default class APIWrapper {

    api: string = 'http://ec2-54-215-43-213.us-west-1.compute.amazonaws.com/api/v1';
    events: Event[];

    constructor() {
        this.events = [];
    }

    async fetchEvents(page: number = 0, pageSize: number = 10): Promise<Event[]> {
        const { events } = await this.loadEventsFromAPI(page, pageSize);

        this.events = events;
        return this.events as Event[];
    }

    private async loadEventsFromAPI(page: number = 0, pageSize: number = 10): Promise<EventRest> {
        const loadedEvents: unknown = await axios.get(this.api + `/events?page=${page}&pageSize=${pageSize}`)
            .then(res => res?.data ?? null)
            .catch((error) => {
                console.error(error);
                return {
                    page: 0,
                    pageSize: 10,
                    totalEvents: 0,
                    events: []
                };
            });

        return loadedEvents as EventRest;
    }
}