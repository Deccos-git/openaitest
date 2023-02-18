import LeftSideBar from "../../components/LeftSideBar"
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import MenuStatus from "../../hooks/MenuStatus";
import arrowLeft from '../../images/icons/arrow-left-icon.png'
import arrowRight from '../../images/icons/arrow-right-icon.png'
import capIcon from '../../images/icons/cap-icon.png'
import rocketIcon from '../../images/icons/rocket-icon.png'
import bulbIcon from '../../images/icons/bulb-icon.png'
import feetIcon from '../../images/icons/feet-icon.png'
import { useFirestore, useFirestoreImpactActivity } from "../../firebase/useFirestore";
import { useState, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { client } from '../../hooks/Client';
import { db, timestamp } from "../../firebase/config.js"
import ButtonClicked from "../../hooks/ButtonClicked";
import {ReactComponent as QuestionIcon}  from '../../images/icons/question-icon.svg'
import ImpactGuideMenu from "../../hooks/ImpactGuideMenu";
import eyeIcon from '../../images/icons/eye-icon.png'
import dashboardIcon from '../../images/icons/dashboard-icon.png'
import activityIcon from '../../images/icons/activity-icon.png'
import ScrollToTop from "../../hooks/ScrollToTop";
import { SavedIcon } from "../../StateManagment/SavedIcon";
import plusButton from '../../images/icons/plus-icon.png'
import deleteIcon from '../../images/icons/delete-icon.png'
import uuid from 'react-uuid';

const ImpactActivity = () => {
    const [saved, setSaved] = useContext(SavedIcon)

    const [activityId, setActivityId] = useState('')

    const menuState = MenuStatus()
    ScrollToTop()
    
    const activities = useFirestore('Activities')
    const impacts = useFirestoreImpactActivity(activityId && activityId)

    const activityHandler = (e) => {

        const id = e.target.options[e.target.selectedIndex].dataset.id 

        setActivityId(id)

    }

    const addImpact = (e) => {
    
        db.collection('ImpactActivity')
        .doc()
        .set({
            ID: uuid(),
            Compagny: client,
            CompagnyID: client,
            Timestamp: timestamp,
            ActivityID: activityId,
            Impact: '',
            PosNeg: ''
        })
    }

    const impactHandler = (e) => {

        const impact = e.target.value 
        const docid = e.target.dataset.docid 

        db.collection('ImpactActivity')
        .doc(docid)
        .update({
            Impact: impact
        })
        .then(() => {
            setSaved('flex')
         })

    }

    const positiveNegativeHandler = (e) => {

        const value = e.target.options[e.target.selectedIndex].value
        const docid = e.target.dataset.docid 

        db.collection('ImpactActivity')
        .doc(docid)
        .update({
            PosNeg: value
        })
        .then(() => {
            setSaved('flex')
         })
    }

    const deleteImpact = (e) => {

        const docid = e.target.dataset.docid

        db.collection('ImpactActivity')
        .doc(docid)
        .delete()

    }


  return (
    <div className="main">
    <LeftSideBar />
    <LeftSideBarFullScreen/>
    <div className="main-container" style={{display: menuState}}>
        <div className="page-header">
            <h1>Impact van activiteit</h1>
            <div className='wizard-sub-nav'>
                <NavLink to={`/${client}/AddActivity`} >
                    <div className='step-container'>
                        <img src={arrowLeft} alt="" />
                        <p>Activiteiten</p>
                    </div>
                </NavLink>  
                {ImpactGuideMenu(12)}
                <NavLink to={`/${client}/AddOutput`} >
                    <div className='step-container'>
                        <p>Outputs</p>
                        <img src={arrowRight} alt="" />
                    </div>
                </NavLink>
            </div>
        </div>
        <div className='profile profile-auth-profile'>
            <div>
                <div className='activity-meta-title-container'>
                    <img src={capIcon} alt="" />
                    <h3>Uitleg</h3>
                </div> 
                <div className='text-section'>
                    <p><b>Wat is de concrete en meetbare impact die de activiteiten hebben op jouw doelgroep?</b></p>
                    <p>
                    Bekijk de impact door de ogen van je doelgroep. Welke positieve bijdrage heeft een specifieke 
                    activiteit die niet zou zijn ontstaan als jouw activiteit niet had plaatsgevonden?
                    </p>
                </div>
            </div>
            <div>
                <div className='activity-meta-title-container'>
                    <img src={rocketIcon} alt="" />
                    <h3>Aan de slag</h3>
                </div> 
                <div className='text-section'>
                    <p><b>1. Selecteer de activiteit waar je de impact aan wilt koppelen</b></p>
                    <select name="" id="" onChange={activityHandler}>
                        <option value="">-- Selecteer een activiteit --</option>
                    {activities && activities.map(activity => (
                        <option key={activity.ID} data-id={activity.ID} value={activity.Activity}>{activity.Activity}</option>
                    ))}
                    </select>
                    <p><b>2. Formuleer de impact</b></p>
                    <div className='list-container'>
                        <div className='list-top-row-container'>
                                <img src={plusButton} alt="" onClick={addImpact}/>
                        </div>
                        <div className='table-container'>
                            <table>
                                <tr>
                                    <th>IMPACT</th>
                                    <th>POSITIEF/NEGATIEF</th>
                                    <th>VERWIJDER</th>
                                </tr>
                                {impacts && impacts.map(impact => (
                                    <tr key={impact.ID}>
                                        <td>
                                            <input type="text" data-docid={impact.docid} defaultValue={impact.Impact} placeholder='Impact' onChange={impactHandler} />
                                        </td>
                                        <td>
                                            <select name="" id="" data-docid={impact.docid} onChange={positiveNegativeHandler} defaultValue={impact.PosNeg}>
                                                <option value="">-- Selecteer positief/negatief --</option>
                                                <option value="positive">Positief</option>
                                                <option value="negative">Negatief</option>
                                            </select>
                                        </td>
                                        <td>
                                            <img className='table-delete-icon' data-docid={impact.docid} onClick={deleteImpact} src={deleteIcon} alt="" />
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='activity-meta-title-container'>
                    <img src={eyeIcon} alt="" />
                    <h3>Bekijk</h3>
                </div> 
                <div className='text-section'>
                    <p><b>Je kunt je impact op de activiteiten hier terug vinden:</b></p>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={activityIcon} alt="" />
                            <NavLink activeClassName='active' to={`/${client}/Activities`}>Activiteiten</NavLink>
                        </div>
                    </div>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={dashboardIcon} alt="" />
                            <NavLink activeClassName='active' to={`/${client}/ImpactProgress`}>Dashboard</NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='activity-meta-title-container'>
                    <img src={bulbIcon} alt="" />
                    <h3>Tips</h3>
                </div> 
                <div className='text-section'>
                    <ol>
                        <li>
                            Zorg ervoor dat de impact op de doelgroep concreet en meetbaar is.
                        </li>
                        <li>
                            Kom je er niet uit of heb je behoefte aan ondersteuning van een impactexpert? 
                            Klik op het 
                            <NavLink to={`/${client}/Support`} >
                                <QuestionIcon style={{width: '19px', height: '19px'}}/> 
                            </NavLink>
                            icon in de 
                            bovenbalk (onderbalk op mobiel) voor alle ondersteuningsmogelijkheden.
                        </li>
                        <li>Benieuwd naar de impact van andere sociale MKB'ers? Neem eens een kijkje in de <a href="https://deccos.nl/Milestones">Deccos Impactclub</a>.</li>
                    </ol>
                </div>
            </div>
            <div>
                <div className='activity-meta-title-container'>
                    <img src={feetIcon} alt="" />
                    <h3>Volgende stap</h3>
                </div> 
                <div className='text-section'>
                    <p>In de volgende stap ga je de outputs van de activiteiten omschrijven.</p>
                    <NavLink to={`/${client}/AddOutput`} ><button>Volgende stap</button></NavLink>
                </div>
            </div>
        </div> 
    </div>
</div>
  )
}

export default ImpactActivity