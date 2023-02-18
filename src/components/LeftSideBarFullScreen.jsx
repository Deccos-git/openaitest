import { Link } from "react-router-dom";
import { client } from '../hooks/Client';
import { useFirestore } from '../firebase/useFirestore';
import { MobileMenu } from '../StateManagment/MobileMenu';
import { motion } from "framer-motion"
import { useState , useEffect, useContext} from 'react';
import { Auth } from '../StateManagment/Auth';
import activityIcon from '../images/icons/activity-icon.png'
import dashboardIcon from '../images/icons/dashboard-icon.png'
import allActivityIcon from '../images/icons/all-activity-icon.png'
import personIcon from '../images/icons/person-icon.png'
import twoPersonIcon from '../images/icons/two-person-icon.png'
import goalIcon from '../images/icons/goal-icon.png'
import problemIcon from '../images/icons/problem-icon.png'
import outputIcon from '../images/icons/output-icon.png'
import sroiIcon from '../images/icons/sroi-icon.png'
import userIcon from '../images/icons/user-icon.png'
import groupIcon from '../images/icons/group-icon.png'
import listIcon from '../images/icons/list-icon.png'
import worldIcon from '../images/icons/world-icon.png'
import taskIcon from '../images/icons/task-icon.png'
import calendarIcon from '../images/icons/calendar-icon.png'
import homeIcon from '../images/icons/home-icon.png'
import researchIcon from '../images/icons/research-icon.png'
import meetingIcon from '../images/icons/meeting-icon.png'
import growIcon from '../images/icons/grow-icon.png'
import TerrainIcon from '@mui/icons-material/Terrain';
import RoundaboutRightIcon from '@mui/icons-material/RoundaboutRight';
import milestoneIcon from '../images/icons/milestone-icon.png'
import EuroIcon from '@mui/icons-material/Euro';
import resultsIcon from '../images/icons/results-icon.png'

const LeftSideBarFullScreen = () => {
    const [menu, setMenu] = useContext(MobileMenu)
    
    const groups = useFirestore('Groups')

    const changeMenuStatus = () => {
        setMenu("none")
    }

    return (
        <div 
        className="left-sidebar-container-mobile" 
        style={{display: menu}}>
            <div className="left-side-bar-full-screen">
            <div className="channel-div">
                    <h3>Home</h3>
                    <div className="channel-inner-div">
                        <div className="channel-inner-div">
                            <div className='activity-meta-title-container'>
                                <img src={homeIcon} alt="" />
                                <Link activeClassName='active' to={`/${client}/Home`} onClick={changeMenuStatus}>Home</Link>
                            </div>
                        </div>
                        <div className="channel-inner-div">
                            <div className='activity-meta-title-container'>
                                <img src={dashboardIcon} alt="" />
                                <Link activeClassName='active' to={`/${client}/ImpactProgress`} onClick={changeMenuStatus}>Dashboard</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="channel-div">
                    <div className="nav-title-container">
                        <h3>Projectbeheer</h3>
                    </div>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={taskIcon} alt="" />
                            <Link activeClassName='active' to={`/${client}/Tasks`} onClick={changeMenuStatus}>Taken</Link>
                        </div>
                    </div>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={calendarIcon} alt="" />
                            <Link activeClassName='active' to={`/${client}/Agenda`} onClick={changeMenuStatus}>Agenda</Link>
                        </div>
                    </div>
                    {/* <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={timelineIcon} alt="" />
                            <Link activeClassName='active' to={`/${client}/Planning`}>Planning</Link>
                        </div>
                    </div> */}
                     <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={growIcon} alt="" />
                            <Link activeClassName='active' to={`/${client}/MilestoneSettings`} onClick={changeMenuStatus}>Mijlpalen</Link>
                        </div>
                    </div>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={meetingIcon} alt="" />
                            {groups && groups.map(group => (
                                <Link key={group.ID} activeClassName='active' to={`/${client}/ImpactGroup/${group.ID}`} onClick={changeMenuStatus}>Chat</Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="channel-div">
                    <div className="nav-title-container">
                        <h3>Context</h3>
                    </div>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={problemIcon} alt="" />
                            <Link activeClassName='active' to={`/${client}/ProblemAnalysisDetail`} onClick={changeMenuStatus}>Probleemanalyse</Link>
                        </div>
                    </div>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={worldIcon} alt="" />
                            <Link activeClassName='active' to={`/${client}/SDGDetail`} onClick={changeMenuStatus}>SDG's</Link>
                        </div>
                    </div>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={userIcon} alt="" />
                            <Link activeClassName='active' to={`/${client}/personas`} onClick={changeMenuStatus}>Personas</Link>
                        </div>
                    </div>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <EuroIcon className='icon'/>
                            <Link activeClassName='active' to={`/${client}/SROI`} onClick={changeMenuStatus}>MKBA's</Link>
                        </div>
                    </div>
                </div>
                <div className="channel-div">
                    <div className="nav-title-container">
                        <h3>Theory of Change</h3>
                    </div>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <RoundaboutRightIcon className='icon'/>
                            <Link activeClassName='active' to={`/${client}/TheoryOfChange`} onClick={changeMenuStatus}>Theory of Change</Link>
                        </div>
                    </div>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={milestoneIcon} alt="" />
                            <Link activeClassName='active' to={`/${client}/Goals`} onClick={changeMenuStatus}>Impactdoelen</Link>
                        </div>
                    </div>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={activityIcon} alt="" />
                            <Link activeClassName='active' to={`/${client}/Activities`} onClick={changeMenuStatus}>Activiteiten</Link>
                        </div>
                    </div>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={outputIcon} alt="" />
                            <Link activeClassName='active' to={`/${client}/OutputSettings`} onClick={changeMenuStatus}>Outputs</Link>
                        </div>
                    </div>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={resultsIcon} alt="" />
                            <Link activeClassName='active' to={`/${client}/effectsoverview`} onClick={changeMenuStatus}>Effecten</Link>
                        </div>
                    </div>
                </div>
                <div className="channel-div">
                    <div className="nav-title-container">
                        <h3>Meten</h3>
                    </div>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <TerrainIcon className='icon'/>
                            <Link activeClassName='active' to={`/${client}/kpioverview`} onClick={changeMenuStatus}>KPIs</Link>
                        </div>
                    </div>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={listIcon} alt="" />
                            <Link activeClassName='active' to={`/${client}/QuestionnaireSettings`} onClick={changeMenuStatus}>Vragenlijsten</Link>
                        </div>
                    </div>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={researchIcon} alt="" />
                            <Link activeClassName='active' to={`/${client}/ResearchSettings`} onClick={changeMenuStatus}>Onderzoeken</Link>
                        </div>
                    </div>
                </div>
                <div className="channel-div">
                    <div className="nav-title-container">
                        <h3>Communiceren</h3>
                    </div>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={personIcon} alt="" />
                            <Link activeClassName='active' to={`/${client}/Stakeholders`} onClick={changeMenuStatus}>Stakeholders</Link>
                        </div>
                    </div>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={groupIcon} alt="" />
                            <Link activeClassName='active' to={`/${client}/Impacthub`} onClick={changeMenuStatus}>Community</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSideBarFullScreen
