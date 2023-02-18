import LeftSideBar from "../../components/LeftSideBar";
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import Location from "../../hooks/Location"
import MenuStatus from "../../hooks/MenuStatus";
import { useHistory } from "react-router-dom";
import { client } from "../../hooks/Client"
import { useFirestoreSROISpecifications, useFirestoreSROIs, useFirestore} from "../../firebase/useFirestore";
import penIcon from '../../images/icons/pen-icon-white.png'
import { NavLink } from "react-router-dom";
import Premium from "../../hooks/Premium";
import PremiumNotice from "../../components/common/PremiumNotice";
import NoContentNotice from "../../hooks/NoContentNotice";
import ScrollToTop from "../../hooks/ScrollToTop";
import { useState, useEffect, useContext } from 'react'
import sroiDefault from '../../images/Design/SROI-default.png'

const Personas = () => {

    const menuState = MenuStatus()
    const history = useHistory()
    const premium = Premium() 
    ScrollToTop()

    const personas = useFirestore('Personas')

  return (
    <div className="main">
    <LeftSideBar />
    <LeftSideBarFullScreen/>
    <div className="main-container" style={{display: menuState}}>
        <div className='page-header'>
            <h1>Personas</h1>
                <div className='edit-icon-header-container'>
                    <NavLink activeClassName='active' to={`/${client}/addpersonas`}>
                        <img src={penIcon} alt="" />
                    </NavLink>
                </div>
        </div>
        <div className='card-container milestone-card-container' style={{display: premium ? 'flex' : 'none'}}>
            {personas && personas.map(item => (
                <div key={item.ID} className='card'>
                    <img className="goal-card-banner" src={item.Photo} alt="" />
                    <div className="goalcard-body-div">
                        <h2>{item.Name}</h2>
                    </div>
                    <div className="button-container">
                        <button className="goal-card-button" onClick={() => history.push(`/${client}/personadetail/${item.ID}`)} >Bekijk</button>
                    </div>
                </div>
            ))}
            
        </div>
        <div style={{display: premium ? 'none' : 'flex'}}>
            <PremiumNotice/>
        </div>
        {NoContentNotice(personas, 'addpersonas')}
    </div>
</div>
  )
}

export default Personas