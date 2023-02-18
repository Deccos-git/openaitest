import {useFirestoreQuestionnairesResponsesResearch} from "../../../firebase/useFirestore";
import SaveDatapoint from "../../datapoints/SaveDatapoint";

const differenceArray = []

const DifferenceScale = ({field, researchID}) => {

    // Group function

    const groupBy = (array, property) => {
        return array.reduce((acc, obj) => {
          let key = obj[property]
          if (!acc[key]) {
            acc[key] = []
          }
          acc[key].push(obj)
          return acc
        }, {})
      }  
      
    // Get results from DB

    const results = useFirestoreQuestionnairesResponsesResearch(researchID, field.ID)

    // Get an object with momentID and score of the results in an array

    const resultsArray = []

    results && results.forEach(result => {
        const resultsObject = {
            Input: parseInt(result.Input),
            Position: result.Position,
        }

        resultsArray.push(resultsObject)
    })

    // Group the results array by momentID

    const array = Object.entries(groupBy(resultsArray, 'Position')) 

    // Get the average score in an array

    const totalArray = []

    array && array.forEach(arr => {

        const sumArray = []

        arr[1] && arr[1].forEach(a => {
            sumArray.push(Math.round(a.Input * 10) / 10)
        })

        const sum = array.length > 0 ? sumArray.reduce((partialSum, a) => partialSum + a, 0) : 0

        const total = sum/arr[1].length

        totalArray.push(total)

    })

    // Get the difference between the first and last average score

    const firstNumber = totalArray[totalArray.indexOf(totalArray[0])]
    const lastNumber = totalArray[totalArray.length-1]

    const difference = lastNumber - firstNumber

    //Get the total difference for this research

    if(!isNaN(difference)){
        differenceArray.push(difference)
    }

    const totalDifference = differenceArray.length > 0 ? differenceArray.reduce((partialSum, a) => partialSum + a, 0) : 0

    const totalDifferenceAverage = totalDifference > 0 ? totalDifference/differenceArray.length : 0

    return(
        <div>
            {difference ? Math.round(difference * 10) / 10 : ''}
            <SaveDatapoint/>
        </div>
    )
}

export default DifferenceScale