import LeftSideBar from "../../components/LeftSideBar"
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import MenuStatus from "../../hooks/MenuStatus";
import arrowLeft from '../../images/icons/arrow-left-icon.png'
import arrowRight from '../../images/icons/arrow-right-icon.png'
import capIcon from '../../images/icons/cap-icon.png'
import rocketIcon from '../../images/icons/rocket-icon.png'
import bulbIcon from '../../images/icons/bulb-icon.png'
import feetIcon from '../../images/icons/feet-icon.png'
import { useFirestore, useFirestoreTargetgroup } from "../../firebase/useFirestore";
import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { client } from '../../hooks/Client';
import { db, timestamp } from "../../firebase/config.js"
import {ReactComponent as QuestionIcon}  from '../../images/icons/question-icon.svg'
import ImpactGuideMenu from "../../hooks/ImpactGuideMenu";
import eyeIcon from '../../images/icons/eye-icon.png'
import dashboardIcon from '../../images/icons/dashboard-icon.png'
import ScrollToTop from "../../hooks/ScrollToTop";
import { SavedIcon } from "../../StateManagment/SavedIcon";
import deleteIcon from '../../images/icons/delete-icon.png'
import plusButton from '../../images/icons/plus-icon.png'
import uuid from 'react-uuid';

const Targetgroup = () => {
    const [saved, setSaved] = useContext(SavedIcon)

    const [goalId, setGoalId] = useState(null)

    const menuState = MenuStatus()
    ScrollToTop()
    
    const goals = useFirestore('Goals') 
    const targetgroups = useFirestoreTargetgroup(goalId && goalId)

    const goalHandler = (e) => {

        const id = e.target.options[e.target.selectedIndex].dataset.id

        setGoalId(id)
    }

    const addTargetgroup = (e) => {

        db.collection('Targetgroups')
        .doc()
        .set({
            ID: uuid(),
            CompagnyID: client,
            GoalID: goalId,
            Timestamp: timestamp,
            Name: ''
        })
    }

    const nameHandler = (e) => {

        const docid = e.target.dataset.docid 
        const name = e.target.value

        db.collection('Targetgroups')
        .doc(docid)
        .update({
            Name: name
        })
        .then(() => {
            setSaved('flex')
         })
    }

    const deleteTargetgroup = (e) => {

        const docid = e.target.dataset.docid 

        console.log(docid)

        db.collection('Targetgroups')
        .doc(docid)
        .delete()

    }

  return (
    <div className="main">
    <LeftSideBar />
    <LeftSideBarFullScreen/>
    <div className="main-container" style={{display: menuState}}>
        <div className="page-header">
            <h1>Doelgroep bepalen</h1>
            <div className='wizard-sub-nav'>
                <NavLink to={`/${client}/GoalTitle`} >
                    <div className='step-container'>
                        <img src={arrowLeft} alt="" />
                        <p>Impactdoelen</p>
                    </div>
                </NavLink>  
                {ImpactGuideMenu(5)}
                <NavLink to={`/${client}/SDGs`} >
                    <div className='step-container'>
                        <p>Bijdragen aan SDG's</p>
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
                    <p><b>Je doelgroep is de stakeholder op wie je het meest directe invloed hebt.</b></p>
                    <p>
                    De doelgroep is in een later stadium van het impact management proces het onderwerp van je impact 
                    onderzoek. Het is dus belangrijk om helder te hebben wie je doelgroep is. Soms is dat rechttoe rechtaan, 
                    zoals bij een organisatie die nieuwkomers helpt. Soms is dat echter minder voor de hand liggend, zoals 
                    wanneer je bijvoorbeeld ondersteunende diensten levert aan bedrijven die mensen met een afstand 
                    tot de arbeidsmarkt ondersteunen. Je doelgroep is dan de bedrijven en niet de mensen met een afstand 
                    tot de arbeidsmarkt.
                    </p>
                    <p>
                    Als je gaat onderzoeken wat je impact is ga je de effecten bijhouden die je activiteiten hebben op je doelgroep. 
                    Je doelgroep is de groep mensen of bedrijven waar je je activiteiten (diensten en/of producten) aan aanbiedt. 
                    </p>
                </div>
            </div>
            <div>
                <div className='activity-meta-title-container'>
                    <img src={rocketIcon} alt="" />
                    <h3>Aan de slag</h3>
                </div> 
                <div className='text-section'>
                    <p><b>1. Selecteer het doel waar je de doelgroep aan wilt koppelen</b></p>
                    <select name="" id="" onChange={goalHandler}>
                        <option value="">-- Selecteer een doel --</option>
                    {goals && goals.map(goal => (
                        <option data-docid={goal.docid} data-id={goal.ID} data-targetgroup={goal.Targetgroup} value={goal.Title}>{goal.Title}</option>
                    ))}
                    </select>
                    <p><b>2. Formuleer de doelgroep</b></p>
                    <div className='list-container' style={{display: goalId ? 'block': 'none'}} >
                        <div className='list-top-row-container'>
                                <img src={plusButton} onClick={addTargetgroup} alt="" />
                        </div>
                        <div className='table-container'>
                            <table>
                                <tr>
                                    <th>DOELGROEP</th>
                                    <th>DELETE</th>
                                </tr>
                                {targetgroups && targetgroups.map(item => (
                                    <tr key={item.ID}>
                                        <td>
                                            <input type="text" data-docid={item.docid} defaultValue={item.Name} placeholder='Naam van doelgroep' onChange={nameHandler} />
                                        </td>
                                        <td>
                                            <img className='table-delete-icon' data-docid={item.docid} onClick={deleteTargetgroup} src={deleteIcon} alt="" />
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
                    <p><b>Je kunt je doelengroep(en) hier terug vinden:</b></p>
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
                    <p>In de volgende stap ga je de impact die jullie organisatie maakt op de doelgroep omschrijven.</p>
                    <NavLink to={`/${client}/ImpactTargetgroup`} ><button>Volgende stap</button></NavLink>
                </div>
            </div>
        </div> 
    </div>
</div>
  )
}

export default Targetgroup