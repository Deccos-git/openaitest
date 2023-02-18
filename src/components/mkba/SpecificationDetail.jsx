import { useState, useContext, useEffect } from 'react'
import { 
    useFirestoreID, 
    useFirestoreResults, 
    useFirestore 
} from "../../firebase/useFirestore";
import { db, timestamp } from "../../firebase/config.js"
import { SavedIcon } from "../../StateManagment/SavedIcon";
import plusButton from '../../images/icons/plus-icon.png'
import deleteIcon from '../../images/icons/delete-icon.png'
import uuid from 'react-uuid';
import Location from "../../hooks/Location"
import { useHistory } from "react-router-dom";
import { client } from "../../hooks/Client"

const SpecificationDetail = ({i, costBenefit}) => {
    const [saved, setSaved] = useContext(SavedIcon)

    const [outputTitle, setOutputTitle] = useState('')

    const route = Location()[3]
    const compagny = Location()[1]
    const history = useHistory()

    // Update currency
    const currencyHandler = (e) => {
        const value = e.target.options[e.target.selectedIndex].value
        const docid = e.target.dataset.docid 
 
        db.collection('SROIs')
         .doc(docid)
         .update({
             Currency: value,
         })
         .then(() => {
             setSaved('flex')
          })
    }

    // Update amount of specification
    const amountHandler = (e) => {
        const value = e.target.value 
        const docid = e.target.dataset.docid 

        console.log(docid)
        console.log(Number(value))
   
        db.collection('SROIs')
        .doc(docid)
        .update({
            Amount: Number(value)
        })
        .then(() => {
            setSaved('flex')
        })
    }

    // Set specification title to state
    const specTitleHandler = (e) => {
        const value = e.target.value 
        const docid = e.target.dataset.docid 
    
        db.collection('SROIs')
        .doc(docid)
        .update({
            Title: value,
        })
        .then(() => {
            setSaved('flex')
        })
    }

    // Add a specification
   const addSpecification = (e) => {
       
    const parentID = e.target.dataset.id

        db.collection('SROIs')
        .doc()
        .set({
            Title: '',
            Currency: 'euro',
            Amount: Number(0),
            ParentID: parentID,
            Type: '',
            SROISet: route,
            ID: uuid(),
            CompagnyID: compagny,
            Timestamp: timestamp
        })

    }

    // Delete specification
    const deleteCostBenefit = (e) => {

        const docid = e.target.dataset.docid 

        db.collection('SROIs')
        .doc(docid)
        .delete()

    }

    // All outputs to select as multiplier
    const outputs = useFirestore('Outputs')
 
    // Select an output
    const selectedOutputHandler = (e) => {

        const value = e.target.options[e.target.selectedIndex].value 

        db.collection('SROIs')
        .doc(i.docid)
        .update({
            Output: value,
        })
        .then(() => {
            setSaved('flex')
        })
        .then(() => {

        })
    }

    // Find title of selected output
    const output = useFirestoreID('Outputs', i.Output ? i.Output : '')

    const findOutputTitle = () => {
        output && output.forEach(o => {
            setOutputTitle(o.Title)
        })
    }
    
    useEffect(() => {
        findOutputTitle()
      }, [output])

    // Get all results of selected output
    const results = useFirestoreResults(i.Output ? i.Output : '')  

    // Calculate and save output multiplier
    const outputsResults = () => {
        
        let total = 0

        results && results.forEach(result => {
            total += result.Result
        }) 

        db.collection('SROIs')
        .doc(i.docid)
        .update({
        Amount: total,
        })
    }

    if(results.length > 0){
        outputsResults()
     }

    if(i.Currency === 'output'){

        return(
            <div className='specification-title-container'> 
                {outputTitle ? 
                    <p id='output-title' onClick={() => history.push(`/${client}/OutputSettings`) }> <u>{outputTitle}</u> </p>
                :
                    <select name="" id="" onChange={selectedOutputHandler} defaultValue={i.Output}>
                        <option value="">-- Selecteer een output --</option>
                        {outputs && outputs.map(output => (
                            <option key={output.ID} value={output.ID} data-docid={i.docid}>{output.Title}</option>
                        ))}
                    </select>
                }
                <div className='activity-meta-title-container sroi-title-container'>
                    <select name="" id="" defaultValue={i.Currency} data-docid={i.docid} onChange={currencyHandler}>
                        <option value="euro">€</option>
                        <option value="times">X</option>
                        <option value="percentage">%</option>
                        <option value="text">T</option>
                        <option value="output">Output</option>
                    </select>
                    <div id='output-amount-container'>
                        <p>{i.Amount}</p>
                    </div>
                </div>
                <img src={deleteIcon} alt="delete icon" className='table-delete-icon' data-docid={i.docid} onClick={deleteCostBenefit}/>
            </div>
        )
    } else if(i.Total === true){
        return(
            <div className='specification-title-container'> 
                <input type="text" defaultValue={i.Title} data-docid={i.docid} placeholder='Schrijf hier de titel'  onChange={specTitleHandler} />
                {/* <p className='sroi-save-amount-button' data-docid={i.docid} style={{display: title === '' ? 'none' : 'block'}} onClick={saveSpecTitle}>Opslaan</p> */}
                <div className='activity-meta-title-container sroi-title-container'>
                    <p>€</p>
                    <p><b>{costBenefit.Amount}</b></p>
                </div>
                <img src={plusButton} alt="plus icon" className='table-delete-icon' data-id={i.ID} onClick={addSpecification}/>
                <img src={deleteIcon} alt="delete icon" className='table-delete-icon' data-docid={i.docid} onClick={deleteCostBenefit}/>
            </div>
        )
    }
    else {
        return(
            <div className='specification-title-container'> 
                <input type="text" defaultValue={i.Title} data-docid={i.docid} placeholder='Schrijf hier de titel'  onChange={specTitleHandler} />
                {/* <p className='sroi-save-amount-button' data-docid={i.docid} style={{display: title === '' ? 'none' : 'block'}} onClick={saveSpecTitle}>Opslaan</p> */}
                <div className='activity-meta-title-container sroi-title-container'>
                    <select name="" id="" defaultValue={i.Currency} data-docid={i.docid} onChange={currencyHandler}>
                        <option value="euro">€</option>
                        <option value="times">X</option>
                        <option value="percentage">%</option>
                        <option value="text">T</option>
                        <option value="output">Output</option>
                    </select>
                    <input type="number" defaultValue={i.Amount} data-docid={i.docid}  onChange={amountHandler}/>
                    {/* <p className='sroi-save-amount-button' data-docid={i.docid} style={{display: amount === 0 ? 'none' : 'block'}} onClick={saveSpecAmount}>Opslaan</p> */}
                </div>
                <img src={plusButton} alt="plus icon" className='table-delete-icon' data-id={i.ID} onClick={addSpecification}/>
                <img src={deleteIcon} alt="delete icon" className='table-delete-icon' data-docid={i.docid} onClick={deleteCostBenefit}/>
            </div>
        )
    }
}

export default SpecificationDetail