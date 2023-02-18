import { useFirestoreQuestionnairesResponsesResearch } from "../../../firebase/useFirestore";
import GroupBy from "../../../hooks/GroupBy";

const ScaleQuestionResults = (researchID, field) => {

    const results = useFirestoreQuestionnairesResponsesResearch(researchID, field.ID)

    const resultsArray = []

    results && results.forEach(result => {
        const resultsObject = {
            Input: parseInt(result.Input),
            Position: result.Position,
        }

        resultsArray.push(resultsObject)
    })

    const array = Object.entries(GroupBy(resultsArray, 'Position')) 

    const totalArray = []

    array && array.forEach(arr => {

        const sumArray = []

        arr[1] && arr[1].forEach(a => {
            sumArray.push(Math.round(a.Input * 10) / 10)
        })

        const sum = array.length > 0 ? sumArray.reduce((partialSum, a) => partialSum + a, 0) : 0

        const total = sum/arr[1].length

        const totalObject = {
            Title: arr[0],
            AvgScore: total
        }

        totalArray.push(totalObject)

    })
  return totalArray
}

export default ScaleQuestionResults