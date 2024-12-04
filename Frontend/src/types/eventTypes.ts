export interface Event {
  UID: string;
  icon?: string;
  date: Date;
  location: string
  event_name: string;
  description: string;
  Registered: string[];
  Attended: string[];
}