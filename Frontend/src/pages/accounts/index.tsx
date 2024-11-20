
import React from 'react';

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

const Accounts: React.FC = () => {
  return (
    <div className="mt-16 px-12">
      <div>
        <div>
          <img src={sampleUser.profileURL} className="rounded-full border-black border-2 w-48 h-48 object-cover" />
        </div>
        <TextComponent title={'Full name'} body={sampleUser.name} />
        <TextComponent title={'Email'} body={sampleUser.email} />
        <TextComponent title={'Bio'} body={sampleUser.bio} />
        <TextComponent title={'Major'} body={sampleUser.major} />
        <h3 className="border-b mt-5 text-gray-500 text-sm">All Registered Events</h3>
        <h3 className="border-b mt-5 text-gray-500 text-sm">Previously Attended Events</h3>
        <TextComponent title={'Date Registered'} body={sampleUser.dateRegistered.getDate() + ' ' + sampleUser.dateRegistered.getMonth().toString() + ', ' + sampleUser.dateRegistered.getFullYear()} />
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
