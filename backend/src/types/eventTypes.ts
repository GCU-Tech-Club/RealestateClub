export interface Event {
    uid: string;
    icon?: string;
    date: Date;
    location: string
    eventName: string;
    description: string;
    registered: string[];
    attended: string[];
  }