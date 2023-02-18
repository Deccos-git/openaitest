import LeftSideBar from "../../components/LeftSideBar"
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import MenuStatus from "../../hooks/MenuStatus";
import { client } from "../../hooks/Client"
import { useState, useEffect, useContext } from 'react'
import ButtonClicked from "../../hooks/ButtonClicked";
import { db, timestamp } from "../../firebase/config.js"
import uuid from 'react-uuid';
import { Auth } from '../../StateManagment/Auth';
import Location from "../../hooks/Location"
import { useFirestore, useFirestoreOutputEffects } from "../../firebase/useFirestore";
import {ReactComponent as QuestionIcon}  from '../../images/icons/question-icon.svg'
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
import SubEffect from "../../components/effects/SubEffect";
import { useHistory } from "react-router-dom";
import EffectDatapointsWizard from "../../components/effects/EffectDatapointsWizard";

const OutputEffects = () => {
    const [saved, setSaved] = useContext(SavedIcon)

    const [outputID, setOutputID] = useState(null)
    const [outputTitle, setOutputTitle] = useState('')

    const menuState = MenuStatus()
    const history = useHistory()
    ScrollToTop()

    const outputs = useFirestore('Outputs')
    const effects = useFirestoreOutputEffects(outputID)

    const outputHandler = (e) => {
        const outputID = e.target.options[e.target.selectedIndex].dataset.id
        const outputTitle = e.target.options[e.target.selectedIndex].dataset.title

        setOutputID(outputID)
        setOutputTitle(outputTitle)
    }

    const effectHandler = (e) => {
        const effect = e.target.value 
        const docid = e.target.dataset.docid

        db.collection('OutputEffects')
        .doc(docid)
        .update({
            Effect: effect
        })
        .then(() => {
            setSaved('flex')
         })
    }

    const addEffect = (e) => {
    
        db.collection('OutputEffects')
        .doc()
        .set({
            ID: uuid(),
            Compagny: client,
            CompagnyID: client,
            Timestamp: timestamp,
            Output: outputTitle,
            OutputID: outputID,
            Effect: '',
            Type: '',
            PosNeg: '',
            Parent: ""
        })
    }

    const positiveNegativeHandler = (e) => {

        const value = e.target.options[e.target.selectedIndex].value
        const docid = e.target.dataset.docid 

        db.collection('OutputEffects')
        .doc(docid)
        .update({
            PosNeg: value
        })
        .then(() => {
            setSaved('flex')
         })
    }

    const typeHandler = (e) => {

        const value = e.target.options[e.target.selectedIndex].value
        const docid = e.target.dataset.docid 

        db.collection('OutputEffects')
        .doc(docid)
        .update({
            Type: value
        })
        .then(() => {
            setSaved('flex')
         })
    }

    const addChildEffect = (e) => {

        const parent = e.target.dataset.id

        db.collection('OutputEffects')
        .doc()
        .set({
            ID: uuid(),
            Compagny: client,
            CompagnyID: client,
            Timestamp: timestamp,
            Output: outputTitle,
            OutputID: outputID,
            Effect: '',
            Parent: parent,
            Type: ''
        })
    }

    const deleteEffect = (e) => {

        const docid = e.target.dataset.docid

        db.collection('OutputEffects')
        .doc(docid)
        .delete()

    }


  return (
    <div className="main">
    <LeftSideBar />
    <LeftSideBarFullScreen/>
    <div className="main-container" style={{display: menuState}}>
        <div className="page-header">
            <h1>Effecten</h1>
            <div className='wizard-sub-nav'>
                <NavLink to={`/${client}/AddOutput`} >
                    <div className='step-container'>
                        <img src={arrowLeft} alt="" />
                        <p>Outputs</p>
                    </div>
                </NavLink>  
                {ImpactGuideMenu(11)}
                <NavLink to={`/${client}/AddSROI`} >
                    <div className='step-container'>
                        <p>MKBA's</p>
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
                    <p><b>Wat zijn de concrete en meetbare effecten die jullie doelgroep ervaart 
                        aan de hand van jullie activiteiten?
                    </b></p>
                    <p>Deze directe effecten werken uiteindelijk door in de impact van je activiteit. 
                        De effecten kunnen zowel positief als negatief zijn.
                    </p>
                </div>
            </div>
        <div>
        <div className='activity-meta-title-container'>
            <img src={rocketIcon} alt="" />
            <h3>Aan de slag</h3>
        </div> 
        <div className='text-section'>
            <div>
                <p><b>1. Selecteer de output waar je het effect aan wilt koppelen</b></p>
                <select name="" id="" onChange={outputHandler}>
                    <option data-id={''} data-title={''} value="">-- Selecteer een output --</option>
                {outputs && outputs.map(output => (
                    <option data-docid={output.docid} data-id={output.ID} data-title={output.Title}>{output.Title} (Activiteit: {output.Activity})</option>
                ))}
                </select>
            </div>
                <div style={{display: outputID ? 'block' : 'none'}}>
                    <p><b>2. Beheer je effecten</b></p>
                    <div className='list-container'>
                        <div className='list-top-row-container'>
                                <img src={plusButton} alt="" onClick={addEffect}/>
                        </div>
                        <div className='table-container'>
                            {effects && effects.map(effect => (
                                <div className='output-effects-container' key={effect.ID} >
                                    <div className='output-effects-inner-container'>
                                        <div>
                                            <textarea rows="2" cols="2" type="text" data-docid={effect.docid} defaultValue={effect.Effect} placeholder='Effect' onChange={effectHandler} />
                                        </div>
                                        <div className='output-effects-meta-container'>
                                            <div className='effects-meta-item-container'>
                                                <p><b>Positief/negatief</b></p>
                                                <select name="" id="" data-docid={effect.docid} onChange={positiveNegativeHandler} defaultValue={effect.PosNeg}>
                                                    <option value="">-- Selecteer positief/negatief --</option>
                                                    <option value="positive">Positief</option>
                                                    <option value="negative">Negatief</option>
                                                </select>
                                            </div>
                                            <div className='effects-meta-item-container'>
                                                <p><b>Type</b></p>
                                                <select name="" id="" data-docid={effect.docid} onChange={typeHandler} defaultValue={effect.Type}>
                                                    <option value="">-- Selecteer type --</option>
                                                    <option value="targetgroup">Effect op doelgroep</option>
                                                    <option value="society">Effect op maatschappij</option>
                                                </select>
                                            </div>
                                            <div className='effects-meta-item-outer-container'>
                                                <div className='effects-meta-item-inner-container'>
                                                <p><b>Voeg een onderbouwing toe</b></p>
                                                <img className='table-delete-icon' data-id={effect.ID} src={plusButton} alt="" onClick={() => history.push(`/${client}/selectdatapoint/${effect.ID}/OutputEffects`)}/>
                                                </div>
                                                <EffectDatapointsWizard effect={effect}/>
                                            </div> 
                                            <div className='effects-meta-item-container'>
                                                <p><b>Voeg een subeffect toe</b></p>
                                                <img className='table-delete-icon' data-id={effect.ID} src={plusButton} alt="" onClick={addChildEffect}/>
                                            </div> 
                                            <div className='effects-meta-item-container'>
                                                <p><b>Verwijder</b></p>
                                                <img className='table-delete-icon' data-docid={effect.docid} onClick={deleteEffect} src={deleteIcon} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <SubEffect id={effect.ID} outputTitle={outputTitle} outputID={outputID}/>
                                </div>
                            ))}
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
                    <p><b>Je kunt je effecten van de outputs hier terug vinden:</b></p>
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
                            Zorg ervoor dat de effecten concreet en meetbaar zijn.
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
                    <p>In de volgende stap ga je een Maatschappelijke Kosten Baten Analyse (MKBA) toevoegen.</p>
                    <NavLink to={`/${client}/AddSROI`} ><button>Volgende stap</button></NavLink> 
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default OutputEffects
