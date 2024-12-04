export interface Event {
  UID: string;
  icon?: string;
  date: Date;
  location: string
  event_name: string;
  description: string;
  registered: string[];
  attended: string[];
}