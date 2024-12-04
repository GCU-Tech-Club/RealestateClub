import { Timestamp } from 'firebase/firestore';

export interface EventData {
    UID: string;
    Name: string;
    Location: string;
    Time: Timestamp;
    Description: string;
    Registered: string[];
    Attended: string[];
};