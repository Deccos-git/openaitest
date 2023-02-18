import MultipleResultsCount from './MultipleResultsCount'
import { useState } from "react"
import SaveDatapoint from '../../datapoints/SaveDatapoint'

const MultipleResults = ({moment, field, researchID}) => {
    const [menu, setMenu] = useState('none')

  return (
    <>
        {field.Multiple && field.Multiple.map(item => (
            <div className='multiple-moment-item-container'>
                <p>{item}</p>
                <MultipleResultsCount input={item} field={field} moment={moment}/>
                <SaveDatapoint field={field} type={'research-multiple-moment'} title={item} input={item} moment={moment.ID} researchID={researchID}/>
            </div>
        ))}
    </>
  )
}

export default MultipleResults