import { useState, useEffect, useContext } from 'react'
import { 
    useFirestoreSROISpecifications, 
} from "../../firebase/useFirestore";
import { db, timestamp } from "../../firebase/config.js"
import { SavedIcon } from "../../StateManagment/SavedIcon";

const TotalCostsBenefits = ({item}) => { 
    const [saved, setSaved] = useContext(SavedIcon)

    const [amount, setAmount] = useState(0)
    const [docid, setDocid] = useState('')

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


    // Set amount to state
    const amountHandler = (e) => {
        const value = e.target.value 
        const docid = e.target.dataset.docid

        setAmount(value)
        setDocid(docid)
    }

    // Save amount
    const saveAmount = () => {

     db.collection('SROIs')
     .doc(docid)
     .update({
         Amount: +amount,
     })
     .then(() => {
         setSaved('flex')
      })

    }

    // All specifications of the total benefits/costs
     const spec = useFirestoreSROISpecifications(item.ID)

     // If there are specs the amount is the total of the specs
     if(spec.length > 0){
         return(
             <td className='activity-meta-title-container sroi-title-container'>
                 <p>€</p>
                 <p className='grand-total-amount'>{item.Amount}</p>
             </td>
         )

         // If there are no specs the total amount of the benefits/costs can be updated
     } else {
         return(
             <div className='activity-meta-title-container sroi-title-container'>
                 <select name="" id="" defaultValue={item.Currency} data-docid={item.docid} onChange={currencyHandler}>
                     <option value="euro">€</option>
                     <option value="times">X</option>
                     <option value="percentage">%</option>
                     <option value="text">T</option>
                     <option value="output">Output</option>
                 </select>
                 <input type="number" defaultValue={item.Amount} data-docid={item.docid} onChange={(amountHandler)}/>
                 <p className='sroi-save-amount-button' style={{display: amount === 0 ? 'none' : 'block'}} onClick={saveAmount}>Opslaan</p>
             </div>
         )
     }
}

export default TotalCostsBenefits