import LeftSideBar from "../../components/LeftSideBar"
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import MenuStatus from "../../hooks/MenuStatus";
import arrowRight from '../../images/icons/arrow-right-icon.png'
import arrowLeft from '../../images/icons/arrow-left-icon.png'
import capIcon from '../../images/icons/cap-icon.png'
import rocketIcon from '../../images/icons/rocket-icon.png'
import bulbIcon from '../../images/icons/bulb-icon.png'
import feetIcon from '../../images/icons/feet-icon.png'
import plusButton from '../../images/icons/plus-icon.png'
import { useFirestore, useFirestoreID, useFirestoreMeasureMoments } from "../../firebase/useFirestore";
import { useState, useEffect, useContext } from "react";
import {ReactComponent as MagicIcon}  from '../../images/icons/magic-icon.svg'
import {ReactComponent as QuestionIcon}  from '../../images/icons/question-icon.svg'
import { client } from '../../hooks/Client';
import { useHistory } from "react-router-dom"
import { NavLink, Link } from "react-router-dom";
import Modal from 'react-modal';
import uuid from "react-uuid";
import ButtonClicked from "../../hooks/ButtonClicked";
import researchIcon from '../../images/icons/research-icon.png'
import deleteIcon from '../../images/icons/delete-icon.png'
import { db, timestamp } from "../../firebase/config.js"
import completeIcon from '../../images/icons/complete-icon.png'
import resultsIcon from '../../images/icons/results-icon.png'
import Premium from "../../hooks/Premium";
import PremiumNotice from "../../components/common/PremiumNotice";
import ImpactGuideMenu from "../../hooks/ImpactGuideMenu";
import eyeIcon from '../../images/icons/eye-icon.png'
import dashboardIcon from '../../images/icons/dashboard-icon.png'
import sendIcon from '../../images/icons/send-icon.png'
import ScrollToTop from "../../hooks/ScrollToTop";
import { SavedIcon } from "../../StateManagment/SavedIcon";

const Research = () => {
    const [saved, setSaved] = useContext(SavedIcon)

    const [outputID, setOutputID] = useState('')
    const [outputTitle, setOutputTitle] = useState('')
    const [activityID, setActivityID] = useState('')
    const [activityTitle, setActivityTitle] = useState('')
    const [modalOpen, setModalOpen] = useState(false);
    const [momentModalOpen, setMomentModalOpen] = useState(false);
    const [title, setTitle] = useState('')

    const menuState = MenuStatus() 
    const history = useHistory()
    const premium = Premium() 
    ScrollToTop()
    Modal.setAppElement('#root');

    const modalStyles = {
        content: {
          top: '20%',
          left: '20%',
          right: '20%',
          bottom: '25%',
        },
      };

    const outputs = useFirestore('Outputs')
    const researches = useFirestore('Research')
    const questionnaires = useFirestore('Questionnaires')

    const outputHandler = (e) => {
        const outputID = e.target.options[e.target.selectedIndex].value
        const outputTitle = e.target.options[e.target.selectedIndex].dataset.title
        const activity = e.target.options[e.target.selectedIndex].dataset.activity
        const activityID = e.target.options[e.target.selectedIndex].dataset.activityid

        setOutputID(outputID)
        setOutputTitle(outputTitle)
        setActivityID(activityID)
        setActivityTitle(activity)
    }

    const titleHandler = (e) => {

        const title = e.target.value 
        
        setTitle(title)

    }

    const deleteResearch = (e) => {
        const docid = e.target.dataset.docid

        db.collection('Research')
        .doc(docid)
        .delete()

    }

    const addResearch = (e) => {

        ButtonClicked(e, 'Opgeslagen')

        const id = uuid()

        db.collection('Research')
        .doc()
        .set({
            OutputID: outputID,
            OutputTitle: outputTitle,
            ID: id,
            Compagny: client,
            CompagnyID: client,
            Timestamp: timestamp,
            Title: title,
            ActivityID: activityID,
            Activity: activityTitle,
            QuestionnaireID: '',
            QuestionnaireTitle: ''
        })
        .then(() => {
            db.collection("Wall")
            .doc()
            .set({
                Compagny: client,
                CompagnyID: client,
                Timestamp: timestamp,
                ID: uuid(),
                ResearchID: id,
                Type: 'research-set'
            })
        })

        .then(() => {
            closeModal()
        })
    }

    const closeModal = () => {
        setModalOpen(false);
      }

      const closeMomentModal = () => {

        setMomentModalOpen(false);
      }

    const MeasureMoments = ({research}) => {

        const moments = useFirestoreMeasureMoments(research.ID)

        return(
            <ol>
                {moments && moments.map(moment => (
                    <li key={moment.ID}>{moment.Title}</li>
                ))}
            </ol>
        )
    }

    const changeQuestioinnaireHandler = (e) => {

        const questionnaireID = e.target.options[e.target.selectedIndex].value
        const questionnaireTitle = e.target.options[e.target.selectedIndex].dataset.title
        const docid = e.target.dataset.docid

        db.collection('Research')
        .doc(docid)
        .update({
            QuestionnaireID: questionnaireID,
            QuestionnaireTitle: questionnaireTitle

        })
        .then(() => {
            setSaved('flex')
         })
    }

    const changeResearchTitle = (e) => {
        const docid = e.target.dataset.docid
        const title = e.target.value

        db.collection('Research')
        .doc(docid)
        .update({
            Title: title
        })
        .then(() => {
            setSaved('flex')
         })
    }

    const Questionnaire = ({research}) => {

        const questionnaires = useFirestoreID('Questionnaires', research.QuestionnaireID)

        return(
            <div>
                {questionnaires && questionnaires.map(questionnaire => (
                    <p>{questionnaire.Title}</p>
                ))}
            </div>
        )
    }


  return (
    <div className="main">
        <LeftSideBar />
        <LeftSideBarFullScreen/>
        <div className="main-container" style={{display: menuState}}>
            <div className="page-header">
                <h1>Onderzoek opzetten</h1>
                <div className='wizard-sub-nav'>
                    <NavLink to={`/${client}/Questionnaires`} >
                        <div className='step-container'>
                            <img src={arrowLeft} alt="" />
                            <p>Vragenlijsten</p>
                        </div>
                    </NavLink>
                    {ImpactGuideMenu(16)}
                    <NavLink to={`/${client}/ResearchAnalyses`} >
                        <div className='step-container'>
                            <p>Onderzoeksanalyse</p>
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
                        <p><b>
                        Aan de hand van onderzoek kun je meetmomenten aan elkaar koppelen en de 
                        resultaten met elkaar vergelijken.
                        </b></p>
                        <p>
                        Zo krijg je een beeld over de ontwikkeling van je impact over een bepaalde periode.
                        </p>
                    </div>
                </div>
                <div>
                    <div className='activity-meta-title-container'>
                        <img src={rocketIcon} alt="" />
                        <h3>Aan de slag</h3>
                    </div> 
                    <div className='text-section'>
                        <div style={{display: premium ? 'block' : 'none'}}>
                            <div className='list-container'>
                                <div className='list-top-row-container'>
                                    <img  src={plusButton} alt="" onClick={() => setModalOpen(true)} alt="" />
                                    <p onClick={() => setModalOpen(true)}>Nieuw onderzoek</p>
                                </div>
                                <div className='table-container'>
                                    <table>
                                        <tr>
                                            <th>ONDERZOEK</th>
                                            <th>BEKIJK</th>
                                            <th>MEETINSTRUMENT</th>
                                            <th>MEETMOMENTEN</th>
                                            <th>VERWIJDER</th>
                                        </tr>
                                        {researches && researches.map(research => (
                                        <tr key={research.ID}>
                                            <td>
                                                <input type="text" data-docid={research.docid} defaultValue={research.Title} onChange={changeResearchTitle} />
                                            </td>
                                            <td>
                                                <img className='table-delete-icon' src={eyeIcon} alt="eye icon" onClick={() => {history.push(`/${client}/Research/${research.ID}`)}} />
                                            </td>    
                                            <td>
                                                <Questionnaire research={research}/>
                                            </td>
                                            <td>
                                                <MeasureMoments research={research}/>
                                            </td>
                                            <td>
                                                <img className='table-delete-icon' data-docid={research.docid} onClick={deleteResearch} src={deleteIcon} alt="" />
                                            </td>
                                        </tr>
                                        ))}
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div style={{display: premium ? 'none' : 'flex'}}>
                            <PremiumNotice/>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='activity-meta-title-container'>
                        <img src={eyeIcon} alt="" />
                        <h3>Bekijk</h3>
                    </div> 
                    <div className='text-section'>
                        <p><b>Je kunt je de onderzoeken hier terug vinden:</b></p>
                        <div className="channel-inner-div">
                            <div className='activity-meta-title-container'>
                                <img src={researchIcon} alt="" />
                                <NavLink activeClassName='active' to={`/${client}/ResearchSettings`}>Onderzoeken</NavLink>
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
                        <p>In de volgende stap ga je een onderzoeksanalyse uitvoeren:</p>
                        <NavLink to={`/${client}/ResearchAnalyses`} > <button>Volgende stap</button></NavLink>
                    </div>
                </div>
            </div> 
        </div>
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={modalStyles}
            contentLabel="Upload banner"
            >
            <img src={researchIcon} alt="" />
            <p><b>1. Selecteer een output waaraan je het onderzoek wilt koppelen</b></p>
            <select name="" id="" onChange={outputHandler}>
                <option value="">-- Selecteer een output --</option>
                {outputs && outputs.map(output => (
                    <option value={output.ID} data-title={output.Title} data-docid={output.docid} data-activity={output.Activity} data-activityid={output.ActivityID}>{output.Title} (Activiteit: {output.Activity})</option>
                ))}
            </select>
            <p><b>Geef het onderzoek een titel</b></p>
            <input type="text" onChange={titleHandler} />
            <div className='button-container-margin-top'>
                <button onClick={addResearch}>Opslaan</button>
            </div>
        </Modal>
    </div>
)
}

export default Research