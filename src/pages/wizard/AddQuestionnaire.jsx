import LeftSideBar from "../../components/LeftSideBar"
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import Location from "../../hooks/Location"
import MenuStatus from "../../hooks/MenuStatus";
import { useFirestoreID, useFirestoreQuestionnaireFields, useFirestore } from "../../firebase/useFirestore"
import { useState, useEffect, useContext } from 'react';
import { db, timestamp } from "../../firebase/config";
import { client } from "../../hooks/Client";
import uuid from 'react-uuid';
import ButtonClicked from "../../hooks/ButtonClicked";
import arrowLeft from '../../images/icons/arrow-left-icon.png'
import capIcon from '../../images/icons/cap-icon.png'
import rocketIcon from '../../images/icons/rocket-icon.png'
import bulbIcon from '../../images/icons/bulb-icon.png'
import feetIcon from '../../images/icons/feet-icon.png'
import {ReactComponent as QuestionIcon}  from '../../images/icons/question-icon.svg'
import { NavLink, Link } from "react-router-dom";
import deleteIcon from '../../images/icons/delete-icon.png'
import ScrollToTop from "../../hooks/ScrollToTop";
import { SavedIcon } from "../../StateManagment/SavedIcon";

const AddQuestionnaire = () => {
    const [saved, setSaved] = useContext(SavedIcon)

    const [title, setTitle ] = useState('')
    const [docid, setDocid ] = useState('')
    const [showParagraph, setShowParagraph] = useState('block')
    const [showScale, setShowScale] = useState('none')
    const [showMultipleMultiple, setShowMultipleMultiple] = useState('none')
    const [showMultipleOne, setShowMultipleOne] = useState('none')
    const [type, setType ] = useState('paragraph')
    const [question, setQuestion] = useState(null)
    const [reachStart, setReachStart] = useState(0)
    const [reachEnd, setReachEnd] = useState(0)
    const [reachStartLabel, setReachStartlabel] = useState(null)
    const [reachEndLabel, setReachEndLabel] = useState(null)
    const [explainer, setExplainer] = useState('')
    const [multiple, setMultiple] = useState('')
    const [multipleArray, setMultipleArray] = useState([])

    const menuState = MenuStatus()
    const route = Location()[3]
    ScrollToTop()

    const questionnares = useFirestoreID('Questionnaires', route)
    const questionnaireFields = useFirestoreQuestionnaireFields(route)

    useEffect(() => {
        questionnares && questionnares.forEach(questionnare => {
            setTitle(questionnare.Title)
            setDocid(questionnare.docid)
        })
    }, [questionnares])

    const titleHandler = (e) => {

        const title = e.target.value 

        setTitle(title)

        db.collection('Questionnaires')
        .doc(docid)
        .update({
            Title: title
        })
        .then(() => {
            setSaved('flex')
         })
    }

    const typeHandler = (e) => {

        const type = e.target.options[e.target.selectedIndex].value

        setType(type)

        if(type === 'paragraph'){
            setShowParagraph('block')
            setShowScale('none')
            setShowMultipleMultiple('none')
            setShowMultipleOne('none')
        } else if(type === 'scale'){
            setShowScale('block')
            setShowParagraph('none')
            setShowMultipleMultiple('none')
            setShowMultipleOne('none')
        } else if(type === 'multiple-multiple'){
            setShowMultipleMultiple('block')
            setShowParagraph('none')
            setShowScale('none')
            setShowMultipleOne('none')
        } else if(type === 'multiple-one'){
            setShowMultipleOne('block')
            setShowMultipleMultiple('none')
            setShowParagraph('none')
            setShowScale('none')
        }
    }

    const questionHandler = (e) => {

        const question = e.target.value 

        setQuestion(question)

    }

    const questionExplainer = (e) => {
        const value = e.target.value 

        setExplainer(value)
    }

    const reachStartHandler = (e) => {

        const reachStart = e.target.options[e.target.selectedIndex].value 

        setReachStart(reachStart)

    }

    const reachStartLabelHandler = (e) => {

        const reachStartLabel = e.target.value 

        setReachStartlabel(reachStartLabel)

    }

    const reachEndHandler = (e) => {

        const reachEnd = e.target.options[e.target.selectedIndex].value 

        setReachEnd(reachEnd)

    }

    const reachEndLabelHandler = (e) => {

        const reachEndLabel = e.target.value 

        setReachEndLabel(reachEndLabel)

    }

    const multipleHandler = (e) => {
        const value = e.target.value 

        setMultiple(value)
    }

    const saveMultiple = () => {
        setMultipleArray([...multipleArray, multiple])
    }

    const addField = (e) => {

        ButtonClicked(e, 'Toegevoegd')

        const position = questionnaireFields.length + 1

        setTimeout(() => {
            e.target.innerText = 'Nog een toevoegen' 
            e.target.style.color = 'green'
        }, 2000)

        db.collection('QuestionnaireFields')
        .doc()
        .set({
            Compagny: client,
            ID: uuid(),
            Timestamp: timestamp,
            QuestionnaireID: route,
            Type: type,
            Question: question,
            Explainer: explainer,
            ReachStart: parseInt(reachStart),
            ReachStartLable: reachStartLabel,
            ReachEnd: parseInt(reachEnd),
            ReachEndLabel: reachEndLabel,
            Key: uuid(),
            Position: position,
            Multiple: multipleArray
        }).then(() => {
            setMultipleArray([])
        })
    }

    const deleteMulitple = (e) => {

        const index = e.target.dataset.index 

        if (index > -1) {
            multipleArray.splice(index, 1); // 2nd parameter means remove one item only
          }

        setMultipleArray(multipleArray)

    }

    const QuestionnaireField = ({field}) => {

        const [range, setRange] = useState(null)
        const [title, setTitle] = useState('')        

        const deleteField = (e) => {
            const docid = e.target.dataset.docid 

            console.log(docid)

            db.collection('QuestionnaireFields')
            .doc(docid)
            .delete()
        }

        const start = field.ReachStart
        const end = field.ReachEnd

        useEffect(() => {

        if(field.Type === 'scale'){
            const range = (start, end) => {
                return Array(end - start + 1).fill().map((_, idx) => start + idx)
            }
    
            const result = range(start, end)
              
            setRange(result)
        }

        }, [field])

        const questionTitleHandler = (e) => {
            const title = e.target.value 
            
            setTitle(title)
            
        }

        const explainerHandler = (e) => {
            const value = e.target.value 
            const docid = e.target.dataset.docid 

            db.collection('QuestionnaireFields')
            .doc(docid)
            .update({
                Explainer: value
            })
            .then(() => {
                setSaved('flex')
             })
        }

        const saveQuestionTitle = (e) => {

            const docid = e.target.dataset.docid 

            db.collection('QuestionnaireFields')
            .doc(docid)
            .update({
                Question: title
            })
            .then(() => {
                setSaved('flex')
             })
        }

        const positionHandler = (e) => {

            const value = e.target.value
            const docid = e.target.dataset.docid 
    
            db.collection('QuestionnaireFields')
            .doc(docid)
            .update({
                Position: value
            })
            .then(() => {
                setSaved('flex')
             })
        }

        if(field.Type === 'paragraph'){
            return(
                <div className='question-type-display-container'>
                    <div className='moment-position-container'>
                        <input type="number" defaultValue={field.Position} data-docid={field.docid} onChange={positionHandler}/>
                    </div>
                    <div>
                        <input className='question-title-input' type='text' defaultValue={field.Question} onChange={questionTitleHandler} />
                        <p className='save-button-questionnaires' onClick={saveQuestionTitle} data-docid={field.docid} style={{display: title === '' ? 'none' : 'block'}}>Opslaan</p>
                    </div>
                    <div>
                        <textarea className='question-subtitle-textarea' name="" id="" cols="10" rows="5" data-docid={field.docid} defaultValue={field.Explainer} onChange={explainerHandler}></textarea>
                    </div>
                    <p id='questionnaire-field-text'>Text antwoord</p>
                    <div className='questionnaire-field-delete-icon-container'>
                        <img className='questionnaire-field-delete-icon' data-docid={field.docid} onClick={deleteField} src={deleteIcon} alt="" />
                   </div>
                </div>
            )
        } else if(field.Type === 'scale'){
            return(
                <div className='question-type-display-container'>
                    <div className='moment-position-container'>
                        <input type="number" defaultValue={field.Position} data-docid={field.docid} onChange={positionHandler}/>
                    </div>
                    <div className='questionnaire-title-container'>
                        <input className='question-title-input' type='text' defaultValue={field.Question} onChange={questionTitleHandler} />
                        <p onClick={saveQuestionTitle} data-docid={field.docid} style={{display: title === '' ? 'none' : 'block'}}>Opslaan</p>
                    </div>
                    <div>
                        <textarea className='question-subtitle-textarea' name="" id="" cols="10" rows="5" data-docid={field.docid} defaultValue={field.Explainer} onChange={explainerHandler}></textarea>
                    </div>
                   <div id='scale-container'>
                       {field.ReachStartLable}
                       {range && range.map(btn => (
                           <div id='question-type-label-container'>
                                <input type="radio" value={btn} />
                                <label htmlFor={btn}>{btn}</label>
                           </div>
                       ))}
                       {field.ReachEndLabel}
                   </div>
                   <div className='questionnaire-field-delete-icon-container'>
                        <img className='questionnaire-field-delete-icon' data-docid={field.docid} onClick={deleteField} src={deleteIcon} alt="" />
                   </div>
                </div>
            )
        } else if(field.Type === 'multiple-multiple'){
            return(
                <div className='question-type-display-container'>
                    <p>{field.Position}</p>
                    <div className='questionnaire-title-container'>
                        <input className='question-title-input' type='text' defaultValue={field.Question} onChange={questionTitleHandler} />
                        <p onClick={saveQuestionTitle} data-docid={field.docid} style={{display: title === '' ? 'none' : 'block'}}>Opslaan</p>
                    </div>
                    <div>
                        <textarea className='question-subtitle-textarea' name="" id="" cols="10" rows="5" data-docid={field.docid} defaultValue={field.Explainer} onChange={explainerHandler}></textarea>
                    </div>
                   <div id='options-container'>
                       {field.Multiple && field.Multiple.map(item => (
                           <span>
                                <input className='question-checkbox-input' name={item} type="checkbox" value={item}/>
                                <label for={item}>{item}</label>
                            </span> 
                       ))}
                   </div>
                   <div className='questionnaire-field-delete-icon-container'>
                        <img className='questionnaire-field-delete-icon' data-docid={field.docid} onClick={deleteField} src={deleteIcon} alt="" />
                   </div>
                </div>
            )
        } else if(field.Type === 'multiple-one'){
            return(
                <div className='question-type-display-container'>
                    <p>{field.Position}</p>
                    <div className='questionnaire-title-container'>
                        <input className='question-title-input' type='text' defaultValue={field.Question} onChange={questionTitleHandler} />
                        <p onClick={saveQuestionTitle} data-docid={field.docid} style={{display: title === '' ? 'none' : 'block'}}>Opslaan</p>
                    </div>
                    <div>
                        <textarea className='question-subtitle-textarea' name="" id="" cols="10" rows="5" data-docid={field.docid} defaultValue={field.Explainer} onChange={explainerHandler}></textarea>
                    </div>
                   <div id='options-container'>
                       {field.Multiple && field.Multiple.map(item => (
                           <span>
                                <input className='question-checkbox-input' type="radio" id={item} name='multiple-one' value={item}/>
                                <label for={item}>{item}</label>
                            </span> 
                       ))}
                   </div>
                   <div className='questionnaire-field-delete-icon-container'>
                        <img className='questionnaire-field-delete-icon' data-docid={field.docid} onClick={deleteField} src={deleteIcon} alt="" />
                   </div>
                </div>
            )
        }


    }

    return (
        <div className="main">
        <LeftSideBar />
        <LeftSideBarFullScreen/>
        <div className="main-container" style={{display: menuState}}>
            <div className="page-header">
                <h1>Vragenlijst creëeren</h1>
                <div className='wizard-sub-nav-introduction'>
                    <NavLink to={`/${client}/Questionnaires`} >
                        <div className='step-container'>
                            <p>Vragenlijsten</p>
                            <img src={arrowLeft} alt="" />
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
                    <div className='text-section' >
                        <p><b>Een vragenlijst kan waardevol instrument om inzicht te krijgen 
                            in de impact te maakt bij je doelgroep.
                        </b></p>

                        <p>In dit onderdeel van de Impact Guide ga je aan de slag met het maken van een vragenlijst. 
                            Er zijn drie type vragen die je kunt gebruiken:
                        </p>

                        <ul>
                            <li>Tekstvraag</li>
                            <li>Schaalvraag</li>
                            <li>Meerkeuze vraag (meerdere antwoorden mogelijk)</li>
                            <li>Meerkeuze vraag (één antwoord mogelijk)</li>
                        </ul>

                        <p>
                            Een <b>tekstvraag</b> geeft de respondent van de vragenlijst de mogelijkheid om uitgebreider op een vraag
                            in te gaan. Uit een dergelijke kwalitatieve vraag kan een dieper inzicht worden opgedaan dan uit het antwoord op een schaalvraag.
                        </p>

                        <p>Een <b>schaalvraag</b> geeft de mogelijkheid om de respondenten de kans te bieden om een kwantatief antwoord
                            te geven (uitgedrukt in een cijfer). Het voordeel van een schaalvraag is dat deze eenvoudiger zijn om te analyseren.
                            Wanneer je er bijvoorbeeld voor kiest om een voor- en naonderzoek te doen aan de hand van een vragenlijst kunnen je de verschillende
                            antwoorden eenvoudig vergelijken en analyseren. Het nadeel van een schaalvraag is dat je weinig nuance en diepgang krijgt uit de respons.
                        </p>
                        
                    </div>
                </div>
                <div>
                    <div className='activity-meta-title-container'>
                        <img src={rocketIcon} alt="" />
                        <h3>Aan de slag</h3>
                    </div> 
                    <div className='text-section'>
                        <p><b>Titel</b></p>
                        <input type="text" placeholder='Titel' defaultValue={title} onChange={titleHandler} />
                        <p><b>Vraag toevoegen</b></p>
                        <select name="" id="" onChange={typeHandler}>
                            <option value="paragraph">Tekstvraag</option>
                            <option value="scale">Schaalvraag</option>
                            <option value="multiple-multiple">Meerkeuzevraag (meerdere antwoorden mogelijk)</option>
                            <option value="multiple-one">Meerkeuzevraag (één antwoord mogelijk)</option>
                        </select>
                        <div className='question-type-display-container'>
                            <input type="text" id='questionnaire-question' placeholder='Noteer hier de vraag' onChange={questionHandler} />
                            <textarea name="" id="" cols="20" rows="5" placeholder='Uitleg bij vraag (niet verplicht)' onChange={questionExplainer}></textarea>

                            {/* Textvraag */}
                            <div className='questionnaire-field-text-container' style={{display: showParagraph}}>
                                <p id='questionnaire-field-text'>Text antwoord</p>
                            </div>

                            {/* Schaalvraag */}
                            <div className='questionnaire-field-scale-container' style={{display: showScale}}>
                                <div className='select-scale-container'>
                                    <select name="" id="" onChange={reachStartHandler}>
                                        <option value="">-- Selecteer onderwaarde ---</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                    </select>
                                    <input type="text" placeholder='Voeg label toe' onChange={reachStartLabelHandler} />
                                </div>
                                <p id='scale-reach-symbol'>t/m</p>
                                <div className='select-scale-container'>
                                    <select name="" id="" onChange={reachEndHandler}>
                                        <option value="">-- Selecteer bovenwaarde --</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                    <input type="text" placeholder='Voeg label toe' onChange={reachEndLabelHandler} />
                                </div>
                            </div>

                            {/* Meerkeuzevraag - meedere keuzes */}
                            <div style={{display: showMultipleMultiple}}>
                                <p>Voeg een optie toe</p>
                                <input type="text"  onChange={multipleHandler}/>
                                <button className='button-simple' onClick={saveMultiple}>Optie toevoegen</button>
                                <div id='options-container'>
                                    {multipleArray && multipleArray.map((item, index) => (
                                        <span>
                                            <input className='question-checkbox-input' name={item} type="checkbox" value={item}/>
                                            <label for={item}>{item}</label>
                                            <img className='question-multiple-delete-icon' src={deleteIcon} data-index={index} alt="" onClick={deleteMulitple} />
                                        </span> 
                                    ))}
                                </div>
                            </div> 

                            {/* Meerkeuzevraag - meedere keuzes */}
                            <div style={{display: showMultipleOne}}>
                                <p>Voeg een optie toe</p>
                                <input type="text"  onChange={multipleHandler}/>
                                <button className='button-simple' onClick={saveMultiple}>Optie toevoegen</button>
                                <div id='options-container'>
                                    {multipleArray && multipleArray.map((item, index) => (
                                        <span>
                                            <input className='question-checkbox-input' name={item} type="checkbox" value={item}/>
                                            <label for={item}>{item}</label>
                                            <img className='question-multiple-delete-icon' src={deleteIcon} data-index={index} alt="" onClick={deleteMulitple} />
                                        </span> 
                                    ))}
                                </div>
                            </div> 
                        </div>
                        <div>
                            <button className='button-simple add-question-button' onClick={addField}>Vraag toevoegen</button>
                        </div>
                        <div>
                            <p><b>Vragenlijst</b></p>
                            {questionnaireFields && questionnaireFields.map(field => (
                                <div key={field.ID}>
                                    <QuestionnaireField field={field}/>
                                </div>
                            ))}

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
                            <p>Terug naar vragenlijsten:</p>
                            <NavLink to={`/${client}/Questionnaires`} ><button>Naar vragenlijsten</button></NavLink>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default AddQuestionnaire