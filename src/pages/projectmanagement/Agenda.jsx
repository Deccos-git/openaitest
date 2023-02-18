import Calendar from "../../components/common/Calender"
import LeftSideBar from "../../components/LeftSideBar"
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import MenuStatus from "../../hooks/MenuStatus";
import { useFirestoreTimestamp } from "../../firebase/useFirestore"
import Premium from "../../hooks/Premium";
import PremiumNotice from "../../components/common/PremiumNotice";
import ScrollToTop from "../../hooks/ScrollToTop";

const Agenda = () => {

    const menuState = MenuStatus()
    const premium = Premium() 
    ScrollToTop()

    const tasks = useFirestoreTimestamp('Tasks', 'desc')
    
  return (
    <div className="main">
        <LeftSideBar />
        <LeftSideBarFullScreen/>
        <div className="main-container" style={{display: menuState}}>
            <div className="page-header">
                <h1>Agenda</h1>
            </div>
            <div id='agenda-calender-container' style={{display: premium ? 'flex' : 'none'}}>
              <Calendar events={tasks}/>
            </div>
            <div style={{display: premium ? 'none' : 'flex'}}>
                <PremiumNotice/>
            </div>
        </div>
    </div>
  )
}

export default Agenda