import React from 'react'
import { useFirestoreGeneral } from '../../firebase/useFirestore'

const Visualisation = ({field}) => {

    const fieldResult = useFirestoreGeneral('FieldResults', 'FieldID', field.ID)
    
  return (
    <div>Visualisatie</div>
  )
}

export default Visualisation