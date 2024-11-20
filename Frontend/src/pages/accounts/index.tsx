
import React, { useEffect, useState } from 'react';
import EventCarouselComponent from '../../components/EventCarouselComponent'
import eventsService from '../../util/eventsService';
import { Event } from '../../types/event';
interface UserObject {
  name: string
  email: string
  bio: string
  profileURL: string
  major: string
  dateRegistered: Date
}

const sampleUser: UserObject = {
  name: "John Doe",
  email: "johndoe@example.com",
  bio: "I am a software engineer.",
  profileURL: "https://fastly.picsum.photos/id/50/4608/3072.jpg?hmac=E6WgCk6MBOyuRjW4bypT6y-tFXyWQfC_LjIBYPUspxE",
  major: "Computer Science",
  dateRegistered: new Date()
}
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Accounts: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const getEvents = async () => {

      const events = await eventsService.getEvents()
      setEvents(events)
    }
    getEvents()
  })


  return (
    <div className="mt-16 px-12">
      <div className="">
        <div>
          <img src={sampleUser.profileURL} className="rounded-full border-black border-2 w-48 h-48 object-cover mb-4" />
        </div >
        <TextComponent title={'Full name'} body={sampleUser.name} />
        <TextComponent title={'Email'} body={sampleUser.email} />
        <TextComponent title={'Bio'} body={sampleUser.bio} />
        <TextComponent title={'Major'} body={sampleUser.major} />
        <h3 className="border-b mt-4 text-gray-500 text-sm">All Registered Events</h3>
        <EventCarouselComponent events={events} />
        <h3 className="border-b mt-4 text-gray-500 text-sm">Previously Attended Events</h3>
        <EventCarouselComponent events={events} />
        <TextComponent title={'Date Registered'} body={sampleUser.dateRegistered.getDate() + ' ' + monthNames[sampleUser.dateRegistered.getMonth()] + ', ' + sampleUser.dateRegistered.getFullYear()} />
        <button type="button" className="border-gray-400 border-2 px-1 hover:bg-gray-400 hover:text-white rounded-md mr-5 my-3">Edit Account</button>
        <button type="button" className="border-red-500 border-2 px-1 hover:bg-red-500 hover:text-white rounded-md my-3 text-red-800">Delete Account</button>
      </div>
    </div>
  );
};

interface TextComponentProps {
  title: string
  body: string
}
const TextComponent: React.FC<TextComponentProps> = ({title, body}) => {
  return (
    <div className="mt-2">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p>{body}</p>
    </div>
  )
}

export default Accounts;
