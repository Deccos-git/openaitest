import LeftSideBar from "../../components/LeftSideBar";
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen";
import MenuStatus from "../../hooks/MenuStatus";
import { client } from "../../hooks/Client"
import { useState, useEffect, useContext } from 'react'
import ButtonClicked from "../../hooks/ButtonClicked";
import { db, timestamp } from "../../firebase/config.js"
import uuid from 'react-uuid';
import { Auth } from '../../StateManagment/Auth';
import Location from "../../hooks/Location"
import { useFirestore, useFirestoreOutputs } from "../../firebase/useFirestore";
import {ReactComponent as QuestionIcon}  from '../../images/icons/question-icon.svg'
import { useHistory } from "react-router-dom";
import arrowLeft from '../../images/icons/arrow-left-icon.png'
import arrowRight from '../../images/icons/arrow-right-icon.png'
import capIcon from '../../images/icons/cap-icon.png'
import rocketIcon from '../../images/icons/rocket-icon.png'
import bulbIcon from '../../images/icons/bulb-icon.png'
import feetIcon from '../../images/icons/feet-icon.png'
import { NavLink, Link } from "react-router-dom";
import plusButton from '../../images/icons/plus-icon.png'
import deleteIcon from '../../images/icons/delete-icon.png'
import ImpactGuideMenu from "../../hooks/ImpactGuideMenu";
import eyeIcon from '../../images/icons/eye-icon.png'
import dashboardIcon from '../../images/icons/dashboard-icon.png'
import outputIcon from '../../images/icons/output-icon.png'
import ScrollToTop from "../../hooks/ScrollToTop";
import { SavedIcon } from "../../StateManagment/SavedIcon";

const AddOutput = () => {
    const [saved, setSaved] = useContext(SavedIcon)

    const [activityID, setActivityID] = useState(null)
    const [activityTitle, setActivityTitle] = useState('')

    const menuState = MenuStatus()
    ScrollToTop()

    const activities = useFirestore('Activities')
    const outputs = useFirestoreOutputs(activityID && activityID)

    const activityHandler = (e) => {
        const activityID = e.target.options[e.target.selectedIndex].dataset.id
        const activityTitle = e.target.options[e.target.selectedIndex].dataset.title

        setActivityID(activityID)
        setActivityTitle(activityTitle)
    }

    const outputHandler = (e) => {
        const title = e.target.value 
        const docid = e.target.dataset.docid

        db.collection('Outputs')
        .doc(docid)
        .update({
            Title: title
        })
        .then(() => {
            setSaved('flex')
         })
    }

    const singularHandler = (e) => {
        const singular = e.target.value 
        const docid = e.target.dataset.docid

        db.collection('Outputs')
        .doc(docid)
        .update({
            Singular: singular
        })
        .then(() => {
            setSaved('flex')
         })
    }

    const addOutput = (e) => {

        db.collection('Outputs')
        .doc()
        .set({
            ID: uuid(),
            Compagny: client,
            CompagnyID: client,
            Timestamp: timestamp,
            Activity: activityTitle,
            ActivityID: activityID,
            Title: '',
            Singular: ''
        })
    }

    const deleteOutput = (e) => {

        const docid = e.target.dataset.docid

        db.collection('Outputs')
        .doc(docid)
        .delete()

    }


  return (
    <div className="main">
    <LeftSideBar />
    <LeftSideBarFullScreen/>
    <div className="main-container" style={{display: menuState}}>
        <div className="page-header">
            <h1>Outputs</h1>
            <div className='wizard-sub-nav'>
                <NavLink to={`/${client}/AddActivity`} >
                    <div className='step-container'>
                        <img src={arrowLeft} alt="" />
                        <p>Activiteiten</p>
                    </div>
                </NavLink>  
                {ImpactGuideMenu(10)}
                <NavLink to={`/${client}/OutputEffects`} >
                    <div className='step-container'>
                        <p>Effecten van output</p>
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
                    <p><b>Je output zijn de meetbare eenheden die door de activiteiten worden voortgebracht.</b></p>

                    <p>Denk aan:</p>
                    <ul>
                        <li>Aantal klanten</li>
                        <li>Aantal deelnemers aan workshops</li>
                        <li>Aantal verkochte producten</li>
                        <li>Aantal geplante bomen</li>
                        <li>Opgeruimd aantal kilo’s plastic</li>
                    </ul>

                    <p>Een output is tastbaar en concreet. Ze zijn zo concreet dat je er mee kunt rekenen.</p>

                    <p>Wanneer je een output toevoegd aan een activiteit kun je een enkelvoud invullen. Dit is het enkelvoud van 
                        de output die je hebt toegevoegd. Bijvoorbeeld: 
                    </p>

                    <ul>
                        <li>Output: 'Klanten', Enkelvoud: 'Klant'</li>
                        <li>Output: 'Deelnemers', Enkelvoud: 'Deelnemer'</li>
                        <li>Output: 'Bomen', Enkelvoud: 'Boom'</li>
                    </ul>

                    <p>De enkelvoud van de output wordt gebruikt bij het aanmaken van de projecttaken. Daar kun je bij <a href={`Projectmanagement`}>stap 20: 'Projectbeheer'</a>  meer over lezen.</p>
                </div>
            </div>
        <div>
        <div className='activity-meta-title-container'>
            <img src={rocketIcon} alt="" />
            <h3>Aan de slag</h3>
        </div> 
        <div className='text-section'>
            <div>
                <p><b>1. Selecteer de activiteit waar je de output aan wilt koppelen</b></p>
                <select name="" id="" onChange={activityHandler}>
                    <option data-id={''} data-title={''} value="">-- Selecteer een activiteit --</option>
                {activities && activities.map(activity => (
                    <option key={activity.ID} data-docid={activity.docid} data-id={activity.ID} data-title={activity.Activity}>{activity.Activity}</option>
                ))}
                </select>
            </div >
                <div style={{display: activityID ? 'block' : 'none'}}>
                    <p><b>2. Beheer je outputs</b></p>
                    <div className='list-container'>
                        <div className='list-top-row-container'>
                                <img src={plusButton} alt="" onClick={addOutput}/>
                        </div>
                        <div className='table-container'>
                            <table>
                                <tr>
                                    <th>OUTPUT</th>
                                    <th>ENKELVOUD</th>
                                    <th>VERWIJDER</th>
                                </tr>
                                {outputs && outputs.map(output => (
                                    <tr key={output.ID}>
                                        <td>
                                            <input type="text" data-docid={output.docid} defaultValue={output.Title} placeholder='Output' onChange={outputHandler} />
                                        </td>
                                        <td>
                                            <input type="text" data-docid={output.docid} defaultValue={output.Singular} placeholder='Enkelvoud' onChange={singularHandler} />   
                                        </td>
                                        <td>
                                            <img className='table-delete-icon' data-docid={output.docid} onClick={deleteOutput} src={deleteIcon} alt="" />
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
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
                    <p><b>Je kunt je de outputs hier terug vinden:</b></p>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={outputIcon} alt="" />
                            <NavLink activeClassName='active' to={`/${client}/OutputSettings`}>Outputs</NavLink>
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
                            Zorg ervoor dat de outputs zo concreet zijn dat je ermee kunt rekenen.
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
                    <p>In de volgende stap ga je de effecten van de outputs omschrijven.</p>
                    <NavLink to={`/${client}/OutputEffects`} ><button>Volgende stap</button></NavLink>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default AddOutput
