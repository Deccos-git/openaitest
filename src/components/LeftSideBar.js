import { NavLink, Link } from "react-router-dom";
import { client } from '../hooks/Client';
import { useFirestore } from '../firebase/useFirestore';
import activityIcon from '../images/icons/activity-icon.png'
import dashboardIcon from '../images/icons/dashboard-icon.png'
import allActivityIcon from '../images/icons/all-activity-icon.png'
import personIcon from '../images/icons/person-icon.png'
import userIcon from '../images/icons/user-icon.png'
import goalIcon from '../images/icons/goal-icon.png'
import problemIcon from '../images/icons/problem-icon.png'
import outputIcon from '../images/icons/output-icon.png'
import sroiIcon from '../images/icons/sroi-icon.png'
import worldIcon from '../images/icons/world-icon.png'
import groupIcon from '../images/icons/group-icon.png'
import listIcon from '../images/icons/list-icon.png'
import milestoneIcon from '../images/icons/milestone-icon.png'
import taskIcon from '../images/icons/task-icon.png'
import calendarIcon from '../images/icons/calendar-icon.png'
import homeIcon from '../images/icons/home-icon.png'
import researchIcon from '../images/icons/research-icon.png'
import meetingIcon from '../images/icons/meeting-icon.png'
import growIcon from '../images/icons/grow-icon.png'
import TerrainIcon from '@mui/icons-material/Terrain';
import RoundaboutRightIcon from '@mui/icons-material/RoundaboutRight';
import EuroIcon from '@mui/icons-material/Euro';
import resultsIcon from '../images/icons/results-icon.png'

const LeftSideBar = () => {

    const groups = useFirestore('Groups')


    return (
        <div className="left-sidebar-container">
            <div className="left-side-bar">
                <div className="channel-div">
                    <h3>Home</h3>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={homeIcon} alt="" />
                            <NavLink activeClassName='active' to={`/${client}/Home`}>Test organisaties</NavLink>
                        </div>
                    </div>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={homeIcon} alt="" />
                            <NavLink activeClassName='active' to={`/${client}/organisationInfo`}>Organisatie omschrijving</NavLink>
                        </div>
                    </div>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={homeIcon} alt="" />
                            <NavLink activeClassName='active' to={`/${client}/Introduction`}>Impact guide</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSideBar
