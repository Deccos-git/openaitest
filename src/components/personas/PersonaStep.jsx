import { db } from "../../firebase/config"
import { useFirestorePersonaSteps } from "../../firebase/useFirestore"
import Step from "./Step"
import { SavedIcon } from "../../StateManagment/SavedIcon";
import EditIcon from "../../images/icons/edit-icon.png";
import { useState, useEffect, useContext } from 'react'

const PersonaStep = ({persona}) => {
    const [saved, setSaved] = useContext(SavedIcon)

    const [editType, setEditType] = useState('none')

    const steps = useFirestorePersonaSteps(persona.ID)

    const typeHandler = (e) => {
        const value = e.target.options[e.target.selectedIndex].value
        const docid = e.target.dataset.docid 

        db.collection('PersonaSteps')
        .doc(docid)
        .update({
            Type: value
        })
        .then(() => {
            setSaved('flex')
         })
    }

    const positionHandler = (e) => {

        const value = e.target.value
        const docid = e.target.dataset.docid 

        db.collection('PersonaSteps')
        .doc(docid)
        .update({
            Position: value
        })
        .then(() => {
            setSaved('flex')
         })
    }

  return (
    <div>
        {steps && steps.map((item) => (
            <div className='persona-step-container'>
                <div className='moment-position-container'>
                    <input type="number" defaultValue={item.Position} data-docid={item.docid} onChange={positionHandler}/>
                </div>
                <h2>Type</h2>
                <div className='edit-type-container'>
                    <p><b>{item.Type}</b></p>
                    <img src={EditIcon} alt="" onClick={() => editType === 'none' ? setEditType('block') : setEditType('none')}/>
                </div>
                <select name="" id="" defaultValue={item.Type} data-docid={item.docid} onChange={typeHandler} style={{display:editType}}>
                    <option value="">-- Selecteer een type --</option>
                    <option value="text">Tekst</option>
                    <option value="research">Onderzoek</option>
                    <option value="activity">Activiteit</option>
                </select>
                <Step step={item} persona={persona}/>
            </div>
        ))}
    </div>
  )
}

export default PersonaStep