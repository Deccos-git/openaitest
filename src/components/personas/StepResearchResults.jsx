import { useFirestoreID} from '../../firebase/useFirestore';
import { useHistory } from "react-router-dom"
import { client } from "../../hooks/Client"

const StepResearchResults = ({step}) => {

    const history = useHistory()

    const research = useFirestoreID('Research', step.Research ? step.Research : "")

  return (
    <div>
        {research && research.map(item => (
            <p className='dashboard-step-description show-research' onClick={() =>  history.push(`/${client}/ResearchDetail${step.Research}`)}>Bekijk onderzoeksresultaten</p>
        ))}
    </div>
  )
}

export default StepResearchResults