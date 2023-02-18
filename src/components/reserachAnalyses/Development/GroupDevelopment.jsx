import GroupBy from "../../../hooks/GroupBy";
import uuid from "react-uuid";
import Inputs from "./Inputs";
import SaveDatapoint from "../../datapoints/SaveDatapoint";

const GroupDevelopment = ({results, field, researchID}) => {

  const resultsArray = []

  results && results.forEach(item => {
    const object = {
      input: item.Input
    }

    resultsArray.push(object)
  })

  const array = Object.entries(GroupBy(resultsArray, 'input')) 

  return (
    <div>
      {field.Multiple && field.Multiple.map(item => (
        <div key={uuid()} className='development-item-container'>
          <p>{item}</p>
          <Inputs input={item} field={field}/>
          <SaveDatapoint field={field} type={'research-multiple'} researchID={researchID} title={item} input={item}/>
        </div>
      ))}
    </div>
  )
}

export default GroupDevelopment