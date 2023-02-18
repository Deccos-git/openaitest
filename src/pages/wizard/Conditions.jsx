import LeftSideBar from "../../components/LeftSideBar"
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import MenuStatus from "../../hooks/MenuStatus";
import arrowLeft from '../../images/icons/arrow-left-icon.png'
import arrowRight from '../../images/icons/arrow-right-icon.png'
import capIcon from '../../images/icons/cap-icon.png'
import rocketIcon from '../../images/icons/rocket-icon.png'
import bulbIcon from '../../images/icons/bulb-icon.png'
import feetIcon from '../../images/icons/feet-icon.png'
import { useFirestore, useFirestoreSDGs, useFirestoreConditions } from "../../firebase/useFirestore";
import { useState, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { client } from '../../hooks/Client';
import { db, timestamp } from "../../firebase/config.js"
import ButtonClicked from "../../hooks/ButtonClicked";
import deleteIcon from '../../images/icons/delete-icon.png'
import plusButton from '../../images/icons/plus-icon.png'
import {ReactComponent as QuestionIcon}  from '../../images/icons/question-icon.svg'
import uuid from "react-uuid";
import ImpactGuideMenu from "../../hooks/ImpactGuideMenu";
import dashboardIcon from '../../images/icons/dashboard-icon.png'
import eyeIcon from '../../images/icons/eye-icon.png'
import ScrollToTop from "../../hooks/ScrollToTop";
import { SavedIcon } from "../../StateManagment/SavedIcon";

const Conditions = () => {
    const [saved, setSaved] = useContext(SavedIcon)

    const [goalID, setGoalID] = useState('')

    const menuState = MenuStatus()
    ScrollToTop()

    const goals = useFirestore('Goals') 
    const conditions = useFirestoreConditions(goalID)

    const goalHandler = (e) => {
        const ID = e.target.options[e.target.selectedIndex].dataset.id

        setGoalID(ID)

    }

    const conditionHandler = (e) => {

        const condition = e.target.value
        const docid = e.target.dataset.docid

        db.collection('Conditions')
        .doc(docid)
        .update({
            Condition: condition
        })
        .then(() => {
            setSaved('flex')
         })

    }

    const addCondition = (e) => {

        ButtonClicked(e, 'Opgeslagen')

        db.collection('Conditions')
        .doc()
        .set({
            Condition: '',
            ID: uuid(),
            Timestamp: timestamp,
            Compagny: client,
            CompagnyID: client,
            GoalID: goalID
        })

    }

    const deleteCondition = (e) => {

        const docid = e.target.dataset.docid

        db.collection('Conditions')
        .doc(docid)
        .delete()

    }

    const displayList = () => {
        if(goalID === ''){
            return 'none'
        } else {
            return 'flex'
        }
    }

  return (
    <div className="main">
    <LeftSideBar />
    <LeftSideBarFullScreen/>
    <div className="main-container" style={{display: menuState}}>
        <div className="page-header">
            <h1>Externe factoren</h1>
            <div className='wizard-sub-nav'>
                <NavLink to={`/${client}/Assumptions`} >
                    <div className='step-container'>
                        <img src={arrowLeft} alt="" />
                        <p>Aannames</p>
                    </div>
                </NavLink>  
                {ImpactGuideMenu(8)}
                <NavLink to={`/${client}/AddActivity`} >
                    <div className='step-container'>
                        <p>Activiteiten</p>
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
                    <p><b>De meeste sociale organisaties bevinden zich in een dynamische omgeving die constant in beweging is.</b></p>
                    <p>Naast de activiteiten van jouw sociale organisatie zijn er vaak nog andere factoren die 
                        invloed hebben op een positieve of negatieve impact op je doelgroep.</p>
                    <p>
                    Het geeft inzicht om deze externe factoren in beeld te hebben. Dan kun je beter inschatten welke positieve 
                    impact je op je eigen conto bij kunt schrijven en welke stromingen je tegenwerken om je 
                    impact doel(en) te bereiken.
                    </p>
                </div>
            </div>
            <div>
                <div className='activity-meta-title-container'>
                    <img src={rocketIcon} alt="" />
                    <h3>Aan de slag</h3>
                </div> 
                <div className='text-section'>
                    <p><b>1. Selecteer het doel waar je de externe factoren aan wilt koppelen</b></p>
                    <select name="" id="" onChange={goalHandler}>
                        <option value="">-- Selecteer een doel --</option>
                    {goals && goals.map(goal => (
                        <option data-docid={goal.docid} data-sdgs={goal.SDG} data-id={goal.ID} value={goal.Title}>{goal.Title}</option>
                    ))}
                    </select>
                    <div style={{display: goalID === '' ? 'none' : 'block'}}>
                        <p><b>2. Beheer je externe factoren</b></p>
                        <div>
                            <div className='list-container' style={{display: displayList()}}>
                                <div className='list-top-row-container'>
                                    <img src={plusButton} onClick={addCondition} alt="" />
                                </div>
                                <div className='table-container'>
                                    <table>
                                        <tr>
                                            <th>EXTERNE FACTOR</th>
                                            <th>VERWIJDER</th>
                                        </tr>
                                        {conditions && conditions.map(condition => (
                                            <tr key={condition.ID}>
                                                <td>
                                                    <input type="text" defaultValue={condition.Condition} data-docid={condition.docid} placeholder='Noteer hier de externe factor' onChange={conditionHandler}/>
                                                </td>
                                                <td>
                                                    <img className='table-delete-icon' data-docid={condition.docid} onClick={deleteCondition} src={deleteIcon} alt="" />
                                                </td>
                                            </tr>
                                    ))}
                                    </table>
                                </div>
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
                    <p><b>Je kunt je aexterne factoren hier terug vinden:</b></p>
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
                    <p>In de volgende stap ga je de activiteiten omschrijven die jullie organisatie uitvoert om tot meetbare impact te komen.</p>
                    <NavLink to={`/${client}/AddActivity`} ><button>Volgende stap</button></NavLink>
                </div>
            </div>
        </div> 
    </div>
</div>
  )
}

export default Conditions