import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-screen h-fit bg-white flex p-1 items-center border-b-2 shadow-lg justify-between">
      <div className="flex gap-2">
        
        <img src="images/logo.jpg" alt="logo" className="w-10 h-10 rounded-full" />
        <Link to="/" className="font-semibold text-2xl text-gray-700 hover:text-black">Realestate Club</Link>
      </div>
      <div className="flex gap-4 px-5">
        <Link to="/" className="transition-colors p-2 border rounded hover:bg-blue-100 text-gray-600 font-semibold">Home</Link>
        <Link to="/events" className="transition-colors p-2 border rounded hover:bg-blue-100 text-gray-600 font-semibold">Events</Link>
        <Link to="/accounts" className="transition-colors p-2 border rounded hover:bg-blue-100 text-gray-600 font-semibold">Account</Link>
        <Link to="/Login" className="transition-colors p-2 border rounded hover:bg-blue-200 bg-blue-300 text-gray-600 font-semibold">Login</Link>
      </div>
    </div>
  );
};

export default Navbar;
