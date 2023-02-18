import { useFirestoreGeneral } from "../../firebase/useFirestore";
import deleteIcon from '../../images/icons/delete-icon.png'
import { db } from "../../firebase/config.js"

const EffectDatapointsWizard = ({effect}) => {

    const datasets = useFirestoreGeneral('EffectData', 'EffectID', effect.ID)

    const deleteDatapoint = (e) => {
        const docid = e.target.dataset.docid 
  
        db.collection("EffectData")
        .doc(docid)
        .delete()
  
      }

  return (
    <>
        {datasets && datasets.map(item => (
            <ul className='kpi-datapoint-item-container effect-datapoint-item-container'>
                <li>{item.Title}</li>
                <img className='table-delete-icon' data-docid={item.docid} onClick={deleteDatapoint} src={deleteIcon} alt="" />
            </ul>
        ))}
    </>
  )
}

export default EffectDatapointsWizard