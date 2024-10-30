import { Link } from "react-router-dom"


const Navbar = () => {

    return (
        <div className="w-screen h-fit flex p-3 items-center border-b-2 shadow-lg justify-between">
            <img src="/images/logo.webp"/>
            <div className="flex gap-4">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/accounts">Accounts</Link>
                <Link to="/events">Events</Link>
            </div>
        </div>
    )
}

export default Navbar