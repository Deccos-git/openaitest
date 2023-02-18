import Iconbar from '../topbar/Iconbar';
import ProfilePhoto from '../topbar/ProfilePhoto';
import '../../CSS/topbar.css';
import {useFirestore} from "../../firebase/useFirestore"
import menuIcon from '../../images/icons/menu-icon.png'
import menuOpenIcon from '../../images/icons/menu-open-icon.png'
import { useContext, useEffect, useState } from 'react';
import { MobileMenu } from '../../StateManagment/MobileMenu';
import { client } from '../../hooks/Client';
import { useHistory } from "react-router"
import penIcon from '../../images/icons/pen-icon.png'
import { SavedIcon } from '../../StateManagment/SavedIcon'
import Location from '../../hooks/Location';
import Hostname from '../../hooks/Hostname';

const Topbar = () => {
    const [menu, setMenu] = useContext(MobileMenu)
    const [saved, setSaved] = useContext(SavedIcon)
    
    const [icon, setIcon] = useState(menuIcon)
    const [settingsIcon, setSettingsIcon] = useState('none')
    const [logo, setLogo] = useState('')
    const [display, setDisplay] = useState('block')

    const docs  = useFirestore("CompagnyMeta")

    const history = useHistory()
    const route = Location()[2]
    const host = Hostname()

    const displayLogo = () => {

        if(client === '' || client === 'NewClient' || route === 'NotApproved' || route === 'Register'){
            setLogo(host.Logo)
            setDisplay('none')
        } else{
            docs && docs.forEach(doc => {
                setLogo(doc.Logo)
            })
        }

    }

    useEffect(() => {
        displayLogo()
    },[docs, host])

    const showLeftSideBar = () => {
        if(menu === "none"){
            setMenu("flex")
            setIcon(menuOpenIcon)
        } else if (menu === "flex"){
            setMenu("none")
            setIcon(menuIcon)
        }
    }

    const homeLink = () => {

        history.push(`/${client}/Home`)

    }

    return (
        <header id="top-bar-container">
            <div className="top-bar">
                <div className="left-side-bar-toggle">
                    <img src={icon} alt="" onClick={showLeftSideBar} />
                </div>
                <div id='logo-subscription-container' >
                    <img src={logo} className="top-bar-logo" alt="logo" onClick={homeLink}/>
                </div>
                <div style={{display: display}} className='icon-bar-big-screen'>
                    <Iconbar/>
                </div>
                <div style={{display: display}}>
                    <ProfilePhoto />
                </div>
            </div>
            <div id="saved-bar" style={{display: saved}}>
                <p>Opgeslagen</p>
            </div> 
        </header>
    )
}

export default Topbar
