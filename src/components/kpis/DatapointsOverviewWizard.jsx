import { useFirestoreGeneral } from "../../firebase/useFirestore";
import deleteIcon from '../../images/icons/delete-icon.png'
import { db } from "../../firebase/config.js"

const DatapointsOverviewWizard = ({kpi}) => {

    const datasets = useFirestoreGeneral('KpiData', 'KpiID', kpi.ID)

    const deleteDatapoint = (e) => {
      const docid = e.target.dataset.docid 

      db.collection("KpiData")
      .doc(docid)
      .delete()

    }
    
  return (
    <>
        {datasets && datasets.map(item => (
            <ul className='kpi-datapoint-item-container'>
                <li>{item.Title}</li>
                <img className='table-delete-icon' data-docid={item.docid} onClick={deleteDatapoint} src={deleteIcon} alt="" />
            </ul>
        ))}
    </>
  )
}

export default DatapointsOverviewWizard