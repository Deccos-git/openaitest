import { NavLink } from "react-router-dom";
import { client } from '../hooks/Client';
import ArrowLeftIcon from '../images/icons/arrow-left-icon.png'
import { useContext, useEffect } from 'react';
import { Auth } from '../StateManagment/Auth';
import { useState } from 'react';
import { db } from '../firebase/config';
import { useFirestoreAdmins } from "../firebase/useFirestore"
import HomeIcon from '../images/icons/home-icon.png'
import SettingsIcon from '../images/icons/settings-icon.png'
import GroupIcon from '../images/icons/group-icon.png'
import UserIcon from '../images/icons/user-icon.png'
import RoleIcon from '../images/icons/rol-icon.png'
import shareIcon from '../images/icons/share-icon.png'

const LeftSideBarAuthProfile = () => {
    const [authO] = useContext(Auth)
    const [notificationsUsers, setNotificationsUsers] = useState(0)
    const [notificationsGroups, setNotificationsGroups] = useState(0)

    const admins = useFirestoreAdmins(authO && authO.ID)
    
    const Admin = () => {
        if(admins.length > 0){
            return <div>
                        <h3>Admin</h3>
                        <div className="channel-inner-div">
                            <div className='activity-meta-title-container'>
                                <img src={SettingsIcon} alt="" />
                                <NavLink activeClassName='active' to={`/${client}/Settings`}>Algemeen</NavLink>
                            </div>
                            <div className='activity-meta-title-container'>
                                <img src={GroupIcon} alt="" />
                                <NavLink activeClassName='active' to={`/${client}/Members`}>Team</NavLink>
                            </div>
                            <div className='activity-meta-title-container'>
                                <img src={RoleIcon} alt="" />
                                <NavLink activeClassName='active' to={`/${client}/UserRoles`}>Gebruikersrollen</NavLink>
                            </div>
                            <div className='activity-meta-title-container'>
                                <img src={shareIcon} alt="" />
                                <NavLink activeClassName='active' to={`/${client}/Share`}>Delen</NavLink>
                            </div>
                        </div>
                    </div>
        } else {
            return null
        }
    }

    return (
        <div className="left-side-bar-container">
            <div className="left-side-bar">
                <div className="channel-div">
                    <div className="channel-inner-div">
                        <h3>Home</h3>
                        <div className='activity-meta-title-container'>
                            <img src={HomeIcon} alt="" />
                            <NavLink activeClassName='active' to={`/${client}/Home`}>Home</NavLink>
                        </div>
                    </div>
                    <Admin/>
                    <h3>Mijn account</h3>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={UserIcon} alt="" />
                            <NavLink activeClassName='active' to={`/${client}/Profile`}>Instellingen</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSideBarAuthProfile
