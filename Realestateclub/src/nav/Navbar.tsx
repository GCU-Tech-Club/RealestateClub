import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="z-50 w-screen fixed top-0 backdrop-blur-sm h-fit bg-white/50 flex p-1 items-center border-b-2 shadow-lg justify-between">
      <div className="flex gap-2">
        
        <img src="images/logo.jpg" alt="logo" className="w-10 h-10 rounded-full" />
        <Link to="/home" className="font-semibold text-2xl text-gray-700 hover:text-black">Realestate Club</Link>
      </div>
      <div className="flex gap-4 px-5">
        <NavLink to="home" className="">Home</NavLink>
        <NavLink to="event" className="">Events</NavLink>
        <NavLink to="accounts" className="">Account</NavLink>
        <NavLink to="Login" className="transition-colors p-2 border rounded hover:bg-blue-200 bg-blue-300 text-gray-600 font-semibold">Login</NavLink>
      </div>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  className?: string;
  children: ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, className }) => {
  const route = useLocation()
 
  return (
    <Link to={to} className={`${route.pathname.includes(to) ? 'bg-blue-100 hover:bg-blue-200' : 'hover:bg-blue-100'} transition-colors p-2 border rounded  text-gray-600 font-semibold ${className}`}>{children}</Link>
  )
}

export default Navbar;
