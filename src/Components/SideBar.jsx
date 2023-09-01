import { FaDashcube, FaUserFriends, FaInfoCircle } from 'react-icons/fa';
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
const SideBar = () => {
    return (

        <div className="sidebar">

            <div className="sidebar-header">
                <div className="sidebar-log">
                    <img src={logo} alt="logo" />
                </div>
            </div>
            <div className="sidebar-links">

                <Link to={"/realisations"} className='link'>
                    <FaDashcube size={18} className='link-icons' />
                    <h4>Realisations</h4>
                </Link>

                <Link to={"/services"} className='link'>
                    <FaUserFriends size={18} className='link-icons' />
                    <h4>Services</h4>
                </Link>
                <Link to={"/orders"} className='link'>
                    <FaUserFriends size={18} className='link-icons' />
                    <h4>Orders</h4>
                </Link>
            
            </div>

        </div>
    );
}

export default SideBar;