import React from 'react'
import { useFirestoreID } from '../../firebase/useFirestore'

const ResearchMeta = ({research, dataset}) => {

    const researches = useFirestoreID('Research', research) 

    const answer = () => {
      if(dataset.Input === undefined){
        return null
      } else if(dataset.Input === ''){
        return null
      } else {
        return <p><b>Antwoord</b> {dataset.Input}</p>
      }
    }

  return (
    <>
        {researches && researches.map(item => (
            <div key={item.ID} className='kpi-research-meta-item-container'>
                <p><b>Onderzoek</b> {item.Title}</p>
                <p><b>Vraag</b> {dataset.Field.Question}</p>
                {answer()}
            </div>
        ))}
    </>
  )
}

export default ResearchMeta