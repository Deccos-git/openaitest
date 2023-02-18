import {useFirestoreQuestionnairesResponses} from "../../firebase/useFirestore";

const ScaleMeasureMomentKPI = ({field, moment}) => {

    console.log(field, moment)

    const results = useFirestoreQuestionnairesResponses(field, moment.ID)

    const total = results.length 

    const resultsArray = []

    results && results.forEach(result => {
        resultsArray.push(parseInt(result.Input))
    })

    const sum = resultsArray.length > 0 ? resultsArray.reduce((partialSum, a) => partialSum + a, 0) : 0

  return (
    <div>
        <h1>{ sum ? Math.round(sum/total * 10) / 10 : 0}</h1>
    </div>
  )
}

export default ScaleMeasureMomentKPI