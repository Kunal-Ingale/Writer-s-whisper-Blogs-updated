import React, { useContext } from 'react';
import './topbar.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
import { Context } from '../../Context/Context';

function Topbar() {
    const { user, dispatch } = useContext(Context);
    const publicFolder = `${apiBaseUrl}/images/`;

    const handleLogout = async () => {
        try {
           
            const response = await axios.post(`${apiBaseUrl}/api/auth/logout`);

            if (response.status === 200) {
                
                localStorage.removeItem('token');
                dispatch({ type: "LOGOUT" })
                window.location.href = '/login';
            }
        } catch (error) {
            console.error("Logout error:", error);
            alert("Failed to log out. Please try again.");
        }
    };

    return (
        <div className='top'>
            <div className="topLeft">Writer's Whisper</div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className='link' to='/'>HOME</Link>
                    </li>
                    <li className="topListItem">
                        <Link className='link' to='/about'>ABOUT</Link>
                    </li>
                    <li className="topListItem">
                        <Link className='link' to='/write'>WRITE</Link>
                    </li>
                    {user && (
                        <li className="topListItem" onClick={handleLogout}>
                            LOGOUT
                        </li>
                    )}
                </ul>
            </div>
            <div className="topRight">
                {user ? (
                    <Link to='/setting'>
                        <img className='img' src={publicFolder + user.profilePic} alt="DP" />
                    </Link>
                ) : (
                    <ul className='topList'>
                        <li className='topListItem b1'>
                            <Link to='/login' className='link'>LOGIN</Link>
                        </li>
                        <li className='topListItem b2'>
                            <Link to='/register' className='link'>REGISTER</Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Topbar;
