import { useFirestoreID } from "../../firebase/useFirestore"

const ConnectedMkba = ({persona}) => {

    const mkbas = useFirestoreID('SROISets', persona.Mkba ? persona.Mkba : '')

    console.log(mkbas)

  return (
    <>
        {mkbas && mkbas.map(item => (
            <p key={item.ID}>{item.Title}</p>
        ))}
    </>
  )
}

export default ConnectedMkba