export interface Event {
  id: number;
  icon: string;
  date: Date;
  location: string;
  type: "IN_PERSON" | "VIRTUAL" | "HYBRID";
  title: string;
  description: string;
}
