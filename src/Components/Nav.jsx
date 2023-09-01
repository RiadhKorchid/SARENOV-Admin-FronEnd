import { useEffect, useState } from "react";
import avatar from "../assets/avatar.png"
import { Menu, MenuItem } from "@mui/material"
import { FaUserEdit, FaPowerOff } from 'react-icons/fa';
import { useStateContext } from "../contexts/authContext";
import axiosClient from "../axios-client";

const Nav = () => {
    const { user, token, setUser, setToken } = useStateContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleOpenDropDown = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = ev => {
        ev.preventDefault()
        setUser({})
        setToken(null)
        setAnchorEl(null);
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
    }, [])

    return (
        <>
            <nav className="navbar">
                <div className="user-info" >
                    <h3>Super Admin</h3>
                    <h5>{user.name}</h5>
                </div>
                <div className="user-avatar" onClick={handleOpenDropDown}>
                    <img src={avatar} alt="user-avatar" style={{ borderRadius: "50%" }} height={40} />
                </div>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    style={{ padding: '10px' }} // Custom styles for Menu
                >
                    <MenuItem onClick={handleClose} > <FaUserEdit size={15} style={{ marginRight: "10px" }} /> Profil</MenuItem>
                    <MenuItem onClick={onLogout}> <FaPowerOff size={15} style={{ marginRight: "10px" }} />Logout</MenuItem>
                </Menu>
            </nav>
        </>
    );
}

export default Nav;