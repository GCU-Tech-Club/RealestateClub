export interface Event {
  UID: string;
  icon?: string;
  Date: Date;
  Location: string
  EventName: string;
  Description: string;
  Registered: string[];
  Attended: string[];
}

export interface EventRest {
  page: number;
  pageSize: number;
  totalEvents: number;
  events: Event[];
}