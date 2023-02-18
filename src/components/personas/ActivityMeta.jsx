import { useFirestoreID} from '../../firebase/useFirestore';

const ActivityMeta = ({step}) => {

    const activity = useFirestoreID('Activities', step.Activity ? step.Activity : '')

    return(
        <>
        {activity && activity.map(item => (
            <p><b>&nbsp;{item.Activity}</b></p>
        ))}
        </>
    )

}

export default ActivityMeta