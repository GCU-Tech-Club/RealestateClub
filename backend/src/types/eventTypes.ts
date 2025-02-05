export interface Event {
    uid: string;
    icon?: string;
    date: Date;
    location: string
    eventName: string;
    description: string;
    registered: string[];
    attended: string[];
    createdBy: string;
    secret: string;
}

export type PublicEvent = Omit<Event, 'secret'>;