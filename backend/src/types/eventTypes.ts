export interface Event {
    UID: string;
    icon?: string;
    Date: Date;
    Location: string
    Event_Name: string;
    Description: string;
    Registered: string[];
    Attended: string[];
  }