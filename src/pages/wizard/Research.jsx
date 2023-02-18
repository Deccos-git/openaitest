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
import { useFirestore, useFirestoreMeasureMoments, useFirestoreID, useFirestoreGeneral } from "../../firebase/useFirestore";
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
import EditIcon from "../../images/icons/edit-icon.png";
import ScrollToTop from "../../hooks/ScrollToTop";
import { SavedIcon } from "../../StateManagment/SavedIcon";
import Location from "../../hooks/Location"
import MeasureMoment from "../../components/Research/MeasureMoment";

const Research = () => {
    const [saved, setSaved] = useContext(SavedIcon)

    const [momentModalOpen, setMomentModalOpen] = useState(false);
    const [momentTitle, setMomentTitle] = useState('')
    const [momentDeadline, setMomentDeadline] = useState('')
    const [researchTitle, setResearchTitle] = useState('')
    const [researchID, setResearchID] = useState('')
    const [questionnaireID, setQuestionnaireID] = useState('')
    const [editQuestionnaire, setEditQuestionnaire] = useState('none')

    const menuState = MenuStatus() 
    const history = useHistory()
    const premium = Premium() 
    const route = Location()[3]
    ScrollToTop()
    Modal.setAppElement('#root');

    const modalStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

    const researches = useFirestoreID('Research', route)
    const questionnaires = useFirestore('Questionnaires')
    const measureMoments = useFirestoreMeasureMoments(researchID && researchID)

    const deleteResearch = (e) => {
        const docid = e.target.dataset.docid

        db.collection('Research')
        .doc(docid)
        .delete()

    }

    const closeMomentModal = () => {

    setMomentModalOpen(false);
    }

    const openMomentModal = (e) => {

        const researchTitle = e.target.dataset.researchtitle 
        const researchid = e.target.dataset.researchid 

        setResearchID(researchid)
        setResearchTitle(researchTitle)

       setMomentModalOpen(true)
    }

    const addMoment = (e) => {

        const position = measureMoments.length + 1

        db.collection('MeasureMoments')
        .doc()
        .set({
            ResearchID: researchID,
            ResearchTitle: researchTitle,
            Moment: momentDeadline,
            Title: momentTitle,
            ID: uuid(),
            Compagny: client,
            CompagnyID: client,
            Timestamp: timestamp,
            QuestionnaireID: questionnaireID,
            Responses: 0,
            Position: position
        })
        .then(() => {
            db.collection('Tasks')
            .doc()
            .set({
                ID: uuid(),
                Compagny: client,
                CompagnyID: client,
                Timestamp: timestamp,
                Title: momentTitle,
                AppointedID: '',
                AppointedName: '',
                AppointedPhoto: '',
                AppointedEmail: '',
                Completed: false,
                Icon: completeIcon,
                ResearchID: researchID,
                Type: 'Research',
                Deadline: momentDeadline,
                Priority: '',
            })
        })
        .then(() => {
            closeMomentModal()
        })
    }

    const momentTitleHandler = (e) => {

        const title = e.target.value 

        setMomentTitle(title)

    }

    const momentDeadlineHandler = (e) => {

        const deadline = e.target.value 

        setMomentDeadline(deadline)

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
                <h1>Onderzoek aanpassen</h1>
                <div className='wizard-sub-nav-introduction'>
                    <NavLink to={`/${client}/ResearchOverview`} >
                        <div className='step-container'>
                            <img src={arrowLeft} alt="" />
                            <p>Onderzoeken</p>
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
                            <div>
                                {researches && researches.map(research => (
                                <div key={research.ID}>
                                    <p><b>Titel</b></p>
                                    <input type="text" data-docid={research.docid} defaultValue={research.Title} onChange={changeResearchTitle} />
                                    <div>
                                        <p><b>Vragenlijst</b></p>
                                        <div className='edit-type-container'>
                                            <Questionnaire research={research}/>
                                            <img src={EditIcon} alt="" onClick={() => editQuestionnaire === 'none' ? setEditQuestionnaire('block') : setEditQuestionnaire('none')}/>
                                        </div>
                                        <select name="" id="" data-docid={research.docid} defaultValue={research.QuestionnaireID} onChange={changeQuestioinnaireHandler} style={{display:editQuestionnaire}}>
                                            <option value="">-- Selecteer een vragenlijst --</option>
                                            {questionnaires && questionnaires.map(questionnaire => (
                                                <option key={questionnaire.ID} value={questionnaire.ID} data-title={questionnaire.Title} >{questionnaire.Title}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <p><b>Meetmomenten</b></p>
                                    <div className='list-top-row-container'>
                                        <img className='add-item-button' src={plusButton} alt="" data-researchid={research.ID} data-researchtitle={research.Title} onClick={openMomentModal} alt="" />
                                        <p data-researchid={research.ID} data-researchtitle={research.Title} onClick={openMomentModal}>Nieuw meetmoment</p>
                                    </div>
                                    <MeasureMoment research={research}/>
                                    <p className='table-delete-icon' data-docid={research.docid} onClick={deleteResearch} src={deleteIcon} alt="" />
                                </div>
                                ))}
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
            isOpen={momentModalOpen}
            onRequestClose={closeMomentModal}
            style={modalStyles}
            contentLabel="Upload banner"
            >
            <img src={resultsIcon} alt="" />
            <div>
                <p>Geef het meetmoment een titel</p>
                <input type="text" placeholder='Bijvoorbeeld "Vooronderzoek"' onChange={momentTitleHandler} />
            </div>
            <div>
                <p>Geef het meetmoment een deadline</p>
                <input type="date" onChange={momentDeadlineHandler} />
            </div>
            <div className='button-container-margin-top'>
                <button onClick={addMoment}>Opslaan</button>
            </div>
        </Modal>
    </div>
)
}

export default Research