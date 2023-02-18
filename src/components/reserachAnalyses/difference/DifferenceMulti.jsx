import SaveDatapoint from "../../datapoints/SaveDatapoint"
import { useFirestoreQuestionnairesResponsesResearch } from "../../../firebase/useFirestore";
import GroupBy from "../../../hooks/GroupBy";
import MultiItemDifference from "./MultiItemDifference";

const DifferenceMulti = ({field, researchID}) => {

  const results = useFirestoreQuestionnairesResponsesResearch(researchID, field.ID)

  const resultsArray = []

  results && results.forEach(item => {
    const object = {
      input: item.Input
    }

    resultsArray.push(object)
  })

  const array = Object.entries(GroupBy(resultsArray, 'input')) 

  console.log(array)
   

  return (
    <>
        {field.Multiple && field.Multiple.map(item => (
            <div className='multiple-moment-item-container'>
                <p>{item}</p>
                <MultiItemDifference input={item} field={field}/>
                <SaveDatapoint field={field} title={item} type={"research-multi-difference"} researchID={researchID}/>
            </div>
        ))}
    </>
  )
}

export default DifferenceMulti