import { useFirestoreID} from '../../firebase/useFirestore';

const DashboardActivityMeta = ({step}) => {

    const activity = useFirestoreID('Activities', step.Activity ? step.Activity : '')

  return (
    <>
        {activity && activity.map(item => (
            <p><b>&nbsp;{item.Activity}</b></p>
        ))}
    </>
  )
}

export default DashboardActivityMeta