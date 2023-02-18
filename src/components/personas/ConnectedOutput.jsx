import { useFirestoreID } from "../../firebase/useFirestore"

const ConnectedOutput = ({persona}) => {

    const outputs = useFirestoreID('Outputs', persona.Output ? persona.Output : '')

  return (
    <>
        {outputs && outputs.map(item => (
            <p key={item.ID}>{item.Activity}</p>
        ))}
    </>
  )
}

export default ConnectedOutput