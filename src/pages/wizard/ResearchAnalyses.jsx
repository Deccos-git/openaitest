import LeftSideBar from "../../components/LeftSideBar"
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import MenuStatus from "../../hooks/MenuStatus";
import arrowRight from '../../images/icons/arrow-right-icon.png'
import arrowLeft from '../../images/icons/arrow-left-icon.png'
import capIcon from '../../images/icons/cap-icon.png'
import rocketIcon from '../../images/icons/rocket-icon.png'
import bulbIcon from '../../images/icons/bulb-icon.png'
import feetIcon from '../../images/icons/feet-icon.png'
import { useFirestore, useFirestoreID, useFirestoreMeasureMoments, useFirestoreQuestionnaireFields, useFirestoreConclusions } from "../../firebase/useFirestore";
import { useState, useEffect, useContext } from "react";
import {ReactComponent as MagicIcon}  from '../../images/icons/magic-icon.svg'
import {ReactComponent as QuestionIcon}  from '../../images/icons/question-icon.svg'
import { client } from '../../hooks/Client';
import uuid from 'react-uuid';
import { useHistory } from "react-router-dom"
import { NavLink, Link } from "react-router-dom";
import Premium from "../../hooks/Premium";
import PremiumNotice from "../../components/common/PremiumNotice";
import ImpactGuideMenu from "../../hooks/ImpactGuideMenu";
import ScrollToTop from "../../hooks/ScrollToTop";
import deleteIcon from '../../images/icons/delete-icon.png'
import plusButton from '../../images/icons/plus-icon.png'
import { db, timestamp } from "../../firebase/config";
import Difference from '../../components/reserachAnalyses/difference/Difference'
import Development from '../../components/reserachAnalyses/Development/Development'
import Field from '../../components/reserachAnalyses/Field'
import Avarage from "../../components/reserachAnalyses/Average";
import Visualisation from "../../components/reserachAnalyses/Visualisation";

const ResearchAnalysis = () => {
    const [researchID, setResearchID] = useState(null) 
    const [questionnaireID, setQuestionnaireID] = useState('')
    const [totalAvarage, setTotalAverage] = useState(5)

    const menuState = MenuStatus() 
    const premium = Premium() 
    ScrollToTop()

    const researches = useFirestore('Research')
    const selectedResearch = useFirestoreID('Research', researchID && researchID)
    const measureMoments = useFirestoreMeasureMoments(researchID && researchID)
    const fields = useFirestoreQuestionnaireFields(questionnaireID && questionnaireID)
    const researchConclusions = useFirestoreConclusions(researchID && researchID)

    const researchHandler = (e) => {
        const id = e.target.options[e.target.selectedIndex].dataset.id 

        setResearchID(id)
    }

    useEffect(() => {
        selectedResearch && selectedResearch.forEach(research => {
            setQuestionnaireID(research.QuestionnaireID)
        })

    },[selectedResearch])


    const deleteConclusion = (e) => {
        const docid = e.target.dataset.docid

        db.collection('Conclusions')
        .doc(docid)
        .delete()
    }

    const conclusionHandler = (e) => {
        const title = e.target.value
        const docid = e.target.dataset.docid

        db.collection('Conclusions')
        .doc(docid)
        .update({
            Conclusion: title,
        })
    }

    const addConclusion = () => {

        db.collection('Conclusions')
        .doc()
        .set({
            CompagnyID: client,
            Conclusion: '',
            Timestamp: timestamp,
            ResearchID: researchID,
            ID: uuid()
        })
        .then(() => {
            db.collection("Wall")
            .doc()
            .set({
                Compagny: client,
                CompagnyID: client,
                Timestamp: timestamp,
                ID: uuid(),
                ResearchID: researchID,
                Type: 'research-finished'
            })
        })

        
    }

    const typehandler = (e) => {
        const type = e.target.options[e.target.selectedIndex].value
        const docid = e.target.dataset.docid

        db.collection('Conclusions')
        .doc(docid)
        .update({
            Type: type,
        })
    }

    

  return (
    <div className="main">
        <LeftSideBar />
        <LeftSideBarFullScreen/>
        <div className="main-container" style={{display: menuState}}>
            <div className="page-header">
                <h1>Onderzoeksanalyse</h1>
                <div className='wizard-sub-nav'>
                    <NavLink to={`/${client}/ResearchOverview`} >
                        <div className='step-container'>
                            <img src={arrowLeft} alt="" />
                            <p>Onderzoeken</p>
                        </div>
                    </NavLink>
                    {ImpactGuideMenu(17)}
                    <NavLink to={`/${client}/Projectmanagement`} >
                        <div className='step-container'>
                            <p>Projectbeheer</p>
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
                        <p><b>Nadat er onderzoek is afgerond kun je het gaan analyseren.</b></p>
                    </div>
                </div>
                <div>
                    <div className='activity-meta-title-container'>
                        <img src={rocketIcon} alt="" />
                        <h3>Aan de slag</h3>
                    </div> 
                    <div className='text-section'>
                        <div style={{display: premium ? 'block' : 'none'}}>
                            <p><b>1. Selecteer een onderzoek</b></p>
                            <select onChange={researchHandler}>
                                <option value="">-- Selecteer een onderzoek --</option>
                                {researches && researches.map(research => (
                                    <option key={research.ID} value={research.Title} data-id={research.ID}>{research.Title}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <p><b>2. Analyse</b></p>
                            <div id='questionnaire-title-container'>
                                <p id='questionnaire-title-container-key'> <i>Vragenlijst:</i> </p>
                                {selectedResearch && selectedResearch.map(research => (
                                    <p key={research.ID}>{research.QuestionnaireTitle}</p>
                                ))}
                            </div>
                            <div className='table-container'>
                                    <table>
                                        <tr>
                                            <th>VRAAG</th>
                                            {measureMoments && measureMoments.map(moment => (
                                                <th>{moment.Title.toUpperCase()}</th>
                                            ))}
                                            <th>ONTWIKKELING</th>
                                            <th>VERSCHIL</th>
                                            {/* <th>VISUALISATIE</th> */}
                                        </tr>
                                        {fields && fields.map(field => (
                                            <tr key={field.ID}>
                                                <td>
                                                    <p>{field.Question}</p>
                                                </td>
                                                {measureMoments && measureMoments.map(moment => (
                                                    <Field field={field} moment={moment} researchID={researchID}/>
                                                ))}
                                                <td>
                                                    <Development field={field} researchID={researchID}/>
                                                </td>
                                                <td>
                                                    <Difference field={field} researchID={researchID}/>
                                                </td>
                                                {/* <td><Visualisation field={field} /></td> */}
                                            </tr>
                                        ))}
                                    </table>
                                </div>
                            </div>
                        <div style={{display: researchID ? 'block' : 'none'}}>
                            <p><b>3. Gemiddelde ontwikkeling</b></p>
                            {researches && researches.map(research => (
                                <Avarage key={research.ID} research={research}/>
                            ))}
                        </div>
                        <div style={{display: researchID ? 'block' : 'none'}}>
                            <p><b>3. Conclusies</b></p>
                            <div className='table-container'>
                                <div className='list-top-row-container'>
                                    <img src={plusButton} onClick={addConclusion} alt="" />
                                </div>
                                <table>
                                    <tr>
                                        <th>CONCLUSIE</th>
                                        <th>TYPE</th>
                                        <th>VERWIJDER</th>
                                    </tr>
                                    {researchConclusions && researchConclusions.map(conclusion => (
                                        <tr key={conclusion.ID}>
                                        <td>
                                            <input type="text" data-docid={conclusion.docid} defaultValue={conclusion.Conclusion} placeholder='Conclusie' onChange={conclusionHandler} />
                                        </td>
                                        <td>
                                            <select name="" id="" data-docid={conclusion.docid} defaultValue={conclusion.Type} onChange={typehandler}>
                                                <option value="">-- Selecteer een type --</option>
                                                <option value="Learningpoint">Verbeterpunt</option>
                                                <option value="Plus">Pluspunt</option>
                                            </select>
                                        </td>
                                        <td>
                                            <img className='table-delete-icon' data-docid={conclusion.docid} onClick={deleteConclusion} src={deleteIcon} alt="" />
                                        </td>
                                    </tr>
                                    ))}
                                </table>
                            </div>
                        </div>
                        <div style={{display: premium ? 'none' : 'flex'}}>
                            <PremiumNotice/>
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
                        <p>In de volgende stap lees je meer over wat het projectbeheer van Deccos inhoudt.</p>
                        <NavLink to={`/${client}/Projectmanagement`} ><button>Volgende stap</button></NavLink>
                    </div>
                </div>
            </div> 
        </div>
    </div>
)
}

export default ResearchAnalysis