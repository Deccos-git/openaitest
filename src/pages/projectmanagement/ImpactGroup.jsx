import ChatScreen from "../../components/common/ChatScreen"
import LeftSideBar from "../../components/LeftSideBar";
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import MenuStatus from "../../hooks/MenuStatus";
import { useFirestore } from "../../firebase/useFirestore"
import Premium from "../../hooks/Premium";
import PremiumNotice from "../../components/common/PremiumNotice";
import ScrollToTop from "../../hooks/ScrollToTop";

const ImpactGroup = () => {

    const menuState = MenuStatus()
    const premium = Premium() 
    ScrollToTop()

    const groups = useFirestore('Groups')

  return (
    <div className="main">
        <LeftSideBar />
        <LeftSideBarFullScreen/>
        <div className="main-container" style={{display: menuState}}>
            <div className='page-header'>
                <h1>Impact HQ</h1>
                <p>Chat je met je impact collega's en volg de laatste ontwikkelingen</p>
            </div>
            <div className='project-group-container' style={{display: premium ? 'flex' : 'none'}}>
                {groups && groups.map(group => (
                    <ChatScreen group={group}/>
                ))}
            </div>
            <div style={{display: premium ? 'none' : 'flex'}}>
                <PremiumNotice/>
            </div>
        </div>  
    </div>
  )
}

export default ImpactGroup