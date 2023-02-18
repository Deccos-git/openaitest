import { useFirestoreID } from "../../firebase/useFirestore"

const TaskActivity = ({task}) => {
    const activities = useFirestoreID('Activities', task.ActivityID && task.ActivityID)

    return(
        <>
            {activities && activities.map(item => (
                <p key={item.ID}>{item.Activity}</p>
            ))}
        </>
        
    )
}

export default TaskActivity