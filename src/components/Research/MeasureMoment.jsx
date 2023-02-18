import { useState, useContext } from "react"
import { useFirestoreMeasureMoments } from "../../firebase/useFirestore";
import ResponsesCount from "../../components/Research/ResponsesCount";
import { db } from "../../firebase/config.js"
import deleteIcon from '../../images/icons/delete-icon.png'
import eyeIcon from '../../images/icons/eye-icon.png'
import { SavedIcon } from "../../StateManagment/SavedIcon";

const MeasureMoment = ({research}) => {
    const [saved, setSaved] = useContext(SavedIcon)

    const [title, setTitle] = useState('')

    const moments = useFirestoreMeasureMoments(research.ID)

    const changeMomentTitleHandler = (e) => {
        const title = e.target.value

        setTitle(title)

    }

    const saveMomentTitle = (e) => {

        const docid = e.target.dataset.docid

        db.collection('MeasureMoments')
        .doc(docid)
        .update({
            Title: title
        })
        .then(() => {
            setSaved('flex')
         })

    }

    const changeMomentDateHandler = (e) => {
        const date = e.target.value
        const docid = e.target.dataset.docid

        db.collection('MeasureMoments')
        .doc(docid)
        .update({
            Moment: date
        })
        .then(() => {
            setSaved('flex')
         })

    }

    const deleteMoment = (e) => {
        const docid = e.target.dataset.docid

        db.collection('MeasureMoments')
        .doc(docid)
        .delete()

    }

    const positionHandler = (e) => {

        const value = e.target.value
        const docid = e.target.dataset.docid 

        db.collection('MeasureMoments')
        .doc(docid)
        .update({
            Position: value
        })
        .then(() => {
            setSaved('flex')
         })
    }

    return(
        <div>
            {moments && moments.map(moment => (
                <div key={moment.ID} className='measure-moments-inner-container'>
                    <div className='moment-position-container'>
                        <input type="number" defaultValue={moment.Position} data-docid={moment.docid} onChange={positionHandler}/>
                    </div>
                    <div className='measure-moment-sub-container'>
                        <p><b>Titel</b></p>
                        <div>
                            <input type="text" defaultValue={moment.Title}  onChange={changeMomentTitleHandler} />
                            <p onClick={saveMomentTitle} data-docid={moment.docid} style={{display: title === '' ? 'none' : 'block'}}>Opslaan</p>
                        </div>
                        
                    </div>
                    <div className='measure-moment-sub-container'>
                        <p><b>Meetmoment</b></p>
                        <input type="date" defaultValue={moment.Moment} data-docid={moment.docid} onChange={changeMomentDateHandler} />
                    </div>
                    <div className='measure-moment-sub-container' style={{display: research.QuestionnaireID ? 'block' : 'none'}}>
                        <p><b>Aantal reacties</b></p>
                        <ResponsesCount moment={moment.ID}/>
                    </div>
                    <div className='measure-moment-sub-container' style={{display: research.QuestionnaireID ? 'block' : 'none'}}>
                        <p><b>Link naar vragenlijst</b></p>
                        <a href={`https://deccos.nl/Questionnaires/${research.QuestionnaireID}/${moment.ID}/${research.ID}`} target='_blank'>
                            <img className='table-delete-icon' src={eyeIcon} alt="Eye icon" />
                        </a>
                    </div>
                    <div className='measure-moment-sub-container' style={{display: research.QuestionnaireID ? 'block' : 'none'}}>
                        <p><b>Verwijder meetmoment</b></p>
                        <img className='table-delete-icon' data-docid={moment.docid} onClick={deleteMoment} src={deleteIcon} alt="delete icon" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MeasureMoment