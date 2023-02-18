import LeftSideBar from "../../components/LeftSideBar"
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import MenuStatus from "../../hooks/MenuStatus";
import arrowLeft from '../../images/icons/arrow-left-icon.png'
import arrowRight from '../../images/icons/arrow-right-icon.png'
import capIcon from '../../images/icons/cap-icon.png'
import rocketIcon from '../../images/icons/rocket-icon.png'
import bulbIcon from '../../images/icons/bulb-icon.png'
import feetIcon from '../../images/icons/feet-icon.png'
import { useFirestore } from "../../firebase/useFirestore";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import uuid from 'react-uuid';
import {ReactComponent as QuestionIcon}  from '../../images/icons/question-icon.svg'
import { client } from '../../hooks/Client';
import { NavLink, Link } from "react-router-dom";
import { db, timestamp } from "../../firebase/config.js"
import firebase from 'firebase'
import deleteIcon from '../../images/icons/delete-icon.png'
import plusButton from '../../images/icons/plus-icon.png'
import ImpactGuideMenu from "../../hooks/ImpactGuideMenu";
import eyeIcon from '../../images/icons/eye-icon.png'
import personIcon from '../../images/icons/person-icon.png'
import ScrollToTop from "../../hooks/ScrollToTop";
import { SavedIcon } from "../../StateManagment/SavedIcon";

const StakeholderAnalysis = () => {
    const [saved, setSaved] = useContext(SavedIcon)

    const history = useHistory()
    const menuState = MenuStatus() 
    const id = uuid()
    ScrollToTop()
    
    const stakeholders = useFirestore('Stakeholders')

    const categorieHandler = (e) => {
        const categorie = e.target.options[e.target.selectedIndex].innerText
        const docid = e.target.dataset.docid

        db.collection('Stakeholders')
        .doc(docid)
        .update({
            Categorie: categorie
        })
        .then(() => {
            setSaved('flex')
         })
    }

    const activityHandler = (e) => {
        const activity = e.target.options[e.target.selectedIndex].innerText
        const docid = e.target.dataset.docid

        db.collection('Stakeholders')
        .doc(docid)
        .update({
            Activity: activity
        })
    }

    const deleteStakeholder = (e) => {
        const docid = e.target.dataset.docid

        db.collection('Stakeholders')
        .doc(docid)
        .delete()

    }

    const addStakeholder = (e) => {

        db.collection('Stakeholders')
        .doc()
        .set({
            Name: '',
            ID: uuid(),
            Compagny: client,
            CompagnyID: client,
            Timestamp: timestamp,
        })
    }

    const organisationHandler = (e) => {

        const organisation = e.target.value
        const docid = e.target.dataset.docid

        db.collection('Stakeholders')
        .doc(docid)
        .update({
            Organisation: organisation
        })
        .then(() => {
            setSaved('flex')
         })
    }

    const dialogHandler = (e) => {

        const dialog = e.target.value
        const docid = e.target.dataset.docid

        db.collection('Stakeholders')
        .doc(docid)
        .update({
            Dialog: dialog
        })
        .then(() => {
            setSaved('flex')
         })
    }

    const frequentionHandler = (e) => {

        const frequention = e.target.value
        const docid = e.target.dataset.docid

        db.collection('Stakeholders')
        .doc(docid)
        .update({
            Frequention: frequention
        })
        .then(() => {
            setSaved('flex')
         })
    }

    const subjectHandler = (e) => {

        const subject = e.target.value
        const docid = e.target.dataset.docid

        db.collection('Stakeholders')
        .doc(docid)
        .update({
            Subject: subject
        })
        .then(() => {
            setSaved('flex')
         })
    }



  return (
    <div className="main">
        <LeftSideBar />
        <LeftSideBarFullScreen/>
        <div className="main-container" style={{display: menuState}}>
            <div className="page-header">
                <h1>Stakeholders</h1>
                <div className='wizard-sub-nav'>
                    <NavLink to={`/${client}/ProblemAnalysis`} >
                        <div className='step-container'>
                            <img src={arrowLeft} alt="" />
                            <p>Probleemanalyse</p>
                        </div>
                    </NavLink>  
                    {ImpactGuideMenu(3)}
                    <NavLink to={`/${client}/GoalTitle`} >
                        <div className='step-container'>
                            <p>Impactdoelen</p>
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
                        <p>Impact management is niet iets dat je in isolatie kunt doen. Om echt een helder beeld te krijgen 
                            van je probleemanalyse, je doelstellingen en vrijwel alle andere aspecten van het impact management 
                            proces is het belangrijk om je stakeholders te betrekken.</p>
                        <p>Stakeholders zijn de mensen en organisaties die direct beïnvloed worden door de activiteiten van 
                            jouw sociale organisatie. Die invloed kan zowel positief als negatief zijn.</p>
                        <p>Voorbeelden van stakeholders zijn:</p>
                        <ul>
                            <li>Jouw doelgroep</li>
                            <li>Financiers en investeerders</li>
                            <li>Gemeenten en andere overheden</li>
                            <li>Klanten</li>
                        </ul>
                        <p>Wanneer je een helder beeld hebt van je stakeholders weet je wie door jouw organisatie 
                            beïnvloed worden (positief en negatief) en welke mensen en organisaties relevant 
                            zijn om op de hoogte te houden van jullie impact voortgang.</p>
                    </div>
                </div>
                <div>
                    <div className='activity-meta-title-container'>
                        <img src={rocketIcon} alt="" />
                        <h3>Aan de slag</h3>
                    </div> 
                    <div className='text-section'>
                        <div>
                            <p><b>2. Voeg stakeholders toe</b></p>
                            <div className='list-container'>
                                <div className='list-top-row-container'>
                                      <img src={plusButton} onClick={addStakeholder} alt="" />
                                </div>
                                <div className='table-container'>
                                    <table>
                                        <tr>
                                            <th>CATEGORIE</th>
                                            <th>ORGANISATIE</th>
                                            <th>WIJZE VAN DIALOOG</th>
                                            <th>FREQUENTIE</th>
                                            <th>GESPREKSONDERWERP</th>
                                            <th>DELETE</th>
                                        </tr>
                                        {stakeholders && stakeholders.map(stakeholder => (
                                            <tr key={stakeholder.ID}>
                                                <td>
                                                    <select name="" id="" data-docid={stakeholder.docid} defaultValue={stakeholder.Categorie} onChange={categorieHandler}>
                                                        <option value="" style={{color: '#d3d3d3'}}> -- Categorie --</option>
                                                        <option value="Doelgroep">Doelgroep</option>
                                                        <option value="Financier">Financier</option>
                                                        <option value="Investeerder">Investeerder</option>
                                                        <option value="Gemeente">Gemeente</option>
                                                        <option value="Provincie">Provincie</option>
                                                        <option value="Rijk">Rijk</option>
                                                        <option value="Klant">Klant</option>
                                                        <option value="Gebruiker">Gebruiker</option>
                                                        <option value="Netwerk">Netwerk</option>
                                                        <option value="Medewerkers">Medewerkers</option>
                                                        <option value="Samenwerkingspartners">Samenwerkingspartners</option>
                                                        <option value="Media">Media</option>
                                                        
                                                    </select>
                                                </td>
                                                <td>
                                                    <input type="text" data-docid={stakeholder.docid} defaultValue={stakeholder.Organisation} placeholder='Organisatie' onChange={organisationHandler} />
                                                </td>
                                                <td>
                                                    <input type="text" data-docid={stakeholder.docid} defaultValue={stakeholder.Dialog} placeholder='Wijze van dialoog' onChange={dialogHandler} />
                                                </td>
                                                <td>
                                                    <input type="text" data-docid={stakeholder.docid} defaultValue={stakeholder.Frequention} placeholder='Frequentie' onChange={frequentionHandler} />
                                                </td>
                                                <td>
                                                    <input type="text" data-docid={stakeholder.docid} defaultValue={stakeholder.Subject} placeholder='Gespreksonderwerp' onChange={subjectHandler} />
                                                </td>
                                                <td>
                                                    <img className='table-delete-icon' data-docid={stakeholder.docid} onClick={deleteStakeholder} src={deleteIcon} alt="" />
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
                <div className='text-section' >
                    <p><b>Je kunt je stakeholders hier terug vinden:</b></p>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={personIcon} alt="" />
                            <NavLink activeClassName='active' to={`/${client}/Stakeholders`}>Stakeholders</NavLink>
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
                            <li>Betrek je stakeholders bij je impact strategie</li>
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
                        <p>In de volgende stap ga je impact doelen stellen.</p>
                        <NavLink to={`/${client}/GoalTitle`} ><button>Volgende stap</button></NavLink>
                    </div>
                </div>
            </div> 
        </div>
    </div>
  )
}

export default StakeholderAnalysis