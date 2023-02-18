import { useState, useContext } from "react"
import Location from "../../hooks/Location"
import { SavedIcon } from "../../StateManagment/SavedIcon";
import { db, timestamp } from "../../firebase/config.js"
import { client } from "../../hooks/Client.js";
import ButtonClicked from '../../hooks/ButtonClicked'

const SaveDatapoint = ({field, type, researchID, title, moment, categorie, output, input}) => {
    const [saved, setSaved] = useContext(SavedIcon)

    const route = Location()[4] ? Location()[4] : ''
    const id = Location()[3]

    const saveHandler = (e) => {

        ButtonClicked(e,'Opgeslagen')

        if(route === 'KPIs'){
            console.log(title)
            console.log(field)
            console.log(type)
            console.log(researchID)
            console.log(id)
            console.log(moment)
            console.log(categorie)
            console.log(output)
            console.log(input)
            saveKpi()
        } else if(route === 'OutputEffects'){
            console.log(title)
            console.log(field)
            console.log(type)
            console.log(researchID)
            console.log(id)
            console.log(moment)
            console.log(categorie)
            console.log(output)
            console.log(input)
            saveEffect()
        }
    }

    const saveKpi = () => {

        db.collection("KpiData")
        .doc()
        .set({
            Title: title,
            Field: field ? field : '',
            Type: type,
            ResearchID: researchID ? researchID : '',
            KpiID: id,
            Timestamp: timestamp,
            CompagnyID: client, 
            MomentID: moment ? moment : '',
            CategorieID: categorie ? categorie : '',
            Output: output ? output : '',
            Input: input ? input : ''
        })
        .then(() => {
            setSaved('flex')
        })
    }

    const saveEffect = () => {

        db.collection("EffectData")
        .doc()
        .set({
            Title: title,
            Field: field ? field : '',
            Type: type,
            ResearchID: researchID ? researchID : '',
            EffectID: id,
            Timestamp: timestamp,
            CompagnyID: client, 
            MomentID: moment ? moment : '',
            CategorieID: categorie ? categorie : '',
            Output: output ? output : '',
            Input: input ? input : ''
        })
        .then(() => {
            setSaved('flex')
        })
    }

  return (
    <div style={{display: route === '' ? 'none' : 'flex'}}>
        <button className='button-simple' onClick={saveHandler}>Selecteer</button>
    </div>
  )
}

export default SaveDatapoint