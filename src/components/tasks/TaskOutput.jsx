import { useFirestoreID } from "../../firebase/useFirestore"

const TaskOutput = ({task}) => {
    const outputs = useFirestoreID('Outputs', task.OutputID && task.OutputID)

    return(
        <>
            {outputs && outputs.map(output => (
                <p key={output.ID}>{output.Title}</p>
            ))}
        </>
        
    )
}

export default TaskOutput