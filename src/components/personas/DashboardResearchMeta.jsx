import { useFirestoreID} from '../../firebase/useFirestore';

const DashboardResearchMeta = ({step}) => {

    const research = useFirestoreID('Research', step.Research ? step.Research : "")

  return (
    <>
        {research && research.map(item => (
            <p><b>&nbsp;{item.Title}</b></p>
        ))}
    </>
  )
}

export default DashboardResearchMeta