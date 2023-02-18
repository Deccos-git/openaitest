import {useFirestoreQuestionnairesResponses} from "../../../firebase/useFirestore";
import SaveDatapoint from "../../datapoints/SaveDatapoint";

const ScaleAnalyse = ({field, moment, researchID}) => {

    const results = useFirestoreQuestionnairesResponses(field.ID, moment.ID)

    const total = results.length 

    const resultsArray = []

    results && results.forEach(result => {
        resultsArray.push(parseInt(result.Input))
    })

    const sum = resultsArray.length > 0 ? resultsArray.reduce((partialSum, a) => partialSum + a, 0) : 0

  return (
    <div>
        <p>Responses: {total}</p>
        <p>Gemiddelde: { sum ? Math.round(sum/total * 10) / 10 : 0}</p>
        <SaveDatapoint field={field} moment={moment} title={field.Question} type={"research-scale-measure-moment"} researchID={researchID}/>
    </div>   
  )
}

export default ScaleAnalyse