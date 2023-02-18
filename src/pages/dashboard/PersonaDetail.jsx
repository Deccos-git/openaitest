import LeftSideBar from "../../components/LeftSideBar";
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import MenuStatus from "../../hooks/MenuStatus";
import { useFirestoreID, useFirestoreOutputs } from "../../firebase/useFirestore"
import Location from "../../hooks/Location"
import { client } from "../../hooks/Client"
import { motion } from "framer-motion"
import arrowLeftIcon from '../../images/icons/arrow-left-icon.png'
import { NavLink } from "react-router-dom";
import ScrollToTop from "../../hooks/ScrollToTop";
import DashboardSteps from "../../components/personas/DashboardSteps";

const PersonaDetail = () => {

    const menuState = MenuStatus()
    const route = Location()[3]
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    ScrollToTop()

    const personas = useFirestoreID('Personas', route)

  return (
    <div className="main">
        <LeftSideBar />
        <LeftSideBarFullScreen/>
        <div className="main-container" style={{display: menuState}}>
            <NavLink to={`/${client}/personas`} >
                <div className='back-container'>
                    <img src={arrowLeftIcon} alt="pijl naar links" />
                    <p>Alle personas</p>
                </div>
            </NavLink>
            {personas && personas.map(item => (
                <motion.div className="article" key={item.ID}>
                    <div className="persona-inner-container">
                        <img className='persona-detail-banner' src={item.Photo} alt="banner image of persona" />
                        <div className='activity-meta-title-container'>
                            <h2>{item.Name}</h2>
                        </div>
                        <DashboardSteps persona={item}/>
                    </div>
                </motion.div>
                ))
            }
            </div>
    </div>
  )
}

export default PersonaDetail