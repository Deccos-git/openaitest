import React from 'react'
import { db } from '../../firebase/config'
import { SavedIcon } from "../../StateManagment/SavedIcon";
import { useState, useEffect, useContext } from 'react'
import { useFirestore, useFirestoreID} from '../../firebase/useFirestore';
import EditIcon from "../../images/icons/edit-icon.png";
import DeleteIcon from "../../images/icons/delete-icon.png";
import ResearchMeta from './ResearchMeta';
import ActivityMeta from './ActivityMeta';
import { useHistory } from "react-router-dom";
import TinyMCE from '../common/TinyMCE'

const Step = ({step, persona}) => {
    const [saved, setSaved] = useContext(SavedIcon)

    const [body, setBody] = useState('')

    const [editType, setEditType] = useState('none')

    const history = useHistory()

    const researches = useFirestore('Research')
    const activities = useFirestore('Activities')

    useEffect(() => {
        setBody(step?.Description)
    },{step})

    const titleHandler = (e) => {
        const value = e.target.value 
        const docid = step.docid 
        
        db.collection('PersonaSteps')
        .doc(docid)
        .update({
            Title: value
        })
        .then(() => {
            setSaved('flex')
         })
    }

    const saveDescription = (e) => {
        const docid = step.docid 

        console.log(body)
        
        db.collection('PersonaSteps')
        .doc(docid)
        .update({
            Description: body
        })
        .then(() => {
            setSaved('flex')
         })
    }

    const researchHandler = (e) => {

        const value = e.target.options[e.target.selectedIndex].value

        db.collection('PersonaSteps')
        .doc(step.docid)
        .update({
            Research: value
        })
        .then(() => {
            setSaved('flex')
         })
    }

    const activityHandler = (e) => {

        const value = e.target.options[e.target.selectedIndex].value

        db.collection('PersonaSteps')
        .doc(step.docid)
        .update({
            Activity: value
        })
        .then(() => {
            setSaved('flex')
            setEditType('none')
         })
    }

    const deleteStep = (e) => {
        db.collection('PersonaSteps')
        .doc(step.docid)
        .delete()

    }


    if(step.Type === 'text'){
        return (
            <div>
                <h2>Titel</h2>
                <input type="text" defaultValue={step.Title} onChange={titleHandler} />
                <h2>Beschrijving</h2>
                <TinyMCE setBody={setBody} body={step.Description}/>
                <button className='button-simple' data-docid={step.docid} onClick={saveDescription}>Opslaan</button>
                <div className='person-step-delete-container'>
                    <img className='persona-step-delete-icon' src={DeleteIcon} alt="" onClick={deleteStep} />
                </div>
            </div>
          )
    } else if(step.Type === 'activity'){
        return (
            <div>
                <h2>Titel</h2>
                <div className='edit-type-container'>
                    <p>{persona.Name} heeft meegedaan aan de activiteit</p>
                    <ActivityMeta step={step}/>
                    <img src={EditIcon} alt="" onClick={() => editType === 'none' ? setEditType('block') : setEditType('none')}/>
                </div>
                <select name="" id="" onChange={activityHandler} style={{display:editType}}>
                    <option value="">-- Selecteer activiteit --</option>
                    {activities && activities.map(item => (
                        <option key={item.ID} value={item.ID}>{item.Activity}</option>
                    ))}
                </select>
                <h2>Beschrijving</h2>
                <TinyMCE setBody={setBody} body={step.Description}/>
                <button className='button-simple' data-docid={step.docid} onClick={saveDescription}>Opslaan</button>
                <div className='person-step-delete-container'>
                    <img className='persona-step-delete-icon' src={DeleteIcon} alt="" onClick={deleteStep} />
                </div>
            </div>
          )
    } else if(step.Type === 'research'){
        return (
            <div>
                <h2>Titel</h2>
                <div className='edit-type-container'>
                    <p>{persona.Name} heeft deelgenomen aan het onderzoek</p> 
                    <ResearchMeta step={step}/>
                    <img src={EditIcon} alt="" onClick={() => editType === 'none' ? setEditType('block') : setEditType('none')}/>
                </div>
                <select name="" id="" onChange={researchHandler} style={{display:editType}}>
                    <option value="">-- Selecteer onderzoek --</option>
                    {researches && researches.map(item => (
                        <option key={item.ID} value={item.ID}>{item.Title}</option>
                    ))}
                </select>
                <div className='person-step-delete-container'>
                    <img className='persona-step-delete-icon' src={DeleteIcon} alt="" onClick={deleteStep} />
                </div>
            </div>
          )
    } else{
        return(
            <div></div>
        )
    }
  
}

export default Step