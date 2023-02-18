import { useFirestoreOutputSubEffects } from "../../firebase/useFirestore";
import plusButton from '../../images/icons/plus-icon.png'
import deleteIcon from '../../images/icons/delete-icon.png'
import { db, timestamp } from "../../firebase/config.js"
import uuid from 'react-uuid';
import { client } from "../../hooks/Client"
import { SavedIcon } from "../../StateManagment/SavedIcon";
import { useContext } from 'react'
import ArrowDownRight from "../../images/icons/arrow-down-right.png"
import { useHistory } from "react-router-dom";
import EffectDatapointsWizard from "../../components/effects/EffectDatapointsWizard";

const SubEffect = ({id, outputTitle, outputID}) => {
    const [saved, setSaved] = useContext(SavedIcon)

    const history = useHistory()

    const effects = useFirestoreOutputSubEffects(id)

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

    const deleteEffect = (e) => {

        const docid = e.target.dataset.docid

        db.collection('OutputEffects')
        .doc(docid)
        .delete()

    }

  return (
      <>
        {effects && effects.map(effect => (
            <div key={effect.ID} className='output-effects-outer-container'>
                <img src={ArrowDownRight} alt="" />
                <div className='output-effects-container sub-effects-container' >
                    <div className='output-effects-inner-container'>
                        <div>
                            <textarea type="text" data-docid={effect.docid} defaultValue={effect.Effect} placeholder='Effect' onChange={effectHandler} />
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
                    <SubEffect id={effect.ID}/>
                </div>
            </div>
        ))}
    </>
  )
}

export default SubEffect