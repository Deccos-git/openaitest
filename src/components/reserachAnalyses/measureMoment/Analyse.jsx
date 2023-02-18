import plusButton from '../../../images/icons/plus-icon.png'
import { useContext, useState } from 'react'
import { useFirestoreAnalysisCategories, useFirestoreQuestionnairesResponses } from '../../../firebase/useFirestore'
import { client } from "../../../hooks/Client"
import { db, timestamp } from "../../../firebase/config.js"
import uuid from 'react-uuid';
import { SavedIcon } from "../../../StateManagment/SavedIcon";
import deleteIcon from '../../../images/icons/delete-icon.png'
import penIcon from '../../../images/icons/pen-icon-white.png'
import { useHistory } from "react-router-dom";
import WordCount from './WordCount'

const Analyse = ({field, moment, researchID}) => {
    const [saved, setSaved] = useContext(SavedIcon)

    const [menu, setMenu] = useState('none')

    const history = useHistory();

    const results = useFirestoreQuestionnairesResponses(field.ID, moment.ID)
    const categories = useFirestoreAnalysisCategories(field.ID && field.ID)

    const menuHandler = () => {

        menu === 'none' ? setMenu('flex') : setMenu('none')
      }

    const addCategory = () => {

        db.collection('AnalysisCategories')
        .doc()
        .set({
            ID: uuid(),
            Compagny: client,
            CompagnyID: client,
            Timestamp: timestamp,
            FieldID: field.ID,
            Categorie: '',
            Words: []
        })
    }

    const categorieHandler = (e) => {
        const docid = e.target.dataset.docid 
        const value = e.target.value

        db.collection('AnalysisCategories')
        .doc(docid)
        .update({
            Categorie: value
        })
        .then(() => {
            setSaved('flex')
         })

    }

    const deleteCategorie = (e) => {
        const docid = e.target.dataset.docid 

        db.collection('AnalysisCategories')
        .doc(docid)
        .delete()
    }

  return (
    <div>
        <div className='category-container'>
            <div className='add-category-container'>
                <p>Aantal responses</p>
                <p>{results.length}</p>
            </div>
            <div className='add-category-container'>
                <img src={plusButton} alt="" />
                <p onClick={addCategory}>Voeg een categorie toe</p>
            </div>
            <ul>
                {categories && categories.map(item => (
                    <div key={item.ID} className='category-container'>
                        <div className='add-category-container'>
                            <div>
                                <p><b>Categorie</b></p>
                                <input type="text" defaultValue={item.Categorie} data-docid={item.docid} onChange={categorieHandler} />
                            </div>
                            <div>
                                <p><b>Totaal</b></p>
                                <div className='add-category-container'>
                                    <WordCount category={item.ID} moment={moment.ID} field={field.ID}/>
                                    <img src={penIcon} alt="" onClick={() => history.push(`analysecategory/${item.ID}/${moment.ID}/${field.ID}`)} />
                                </div>
                            </div>
                            <div>
                                <p>Verwijder</p>
                                <img src={deleteIcon} alt="" data-docid={item.docid} onClick={deleteCategorie} />
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
       
    </div>
  )
}

export default Analyse