import {useFirestoreAnalysisMultipleChoise} from '../../../firebase/useFirestore'
import GroupBy from "../../../hooks/GroupBy";

const MultiItemDifference = ({input, field}) => {

    const inputs = useFirestoreAnalysisMultipleChoise(input, field ? field.ID : '')

    const inputArray = []

    inputs && inputs.forEach(item => {
        const object = {
        input: item.Input,
        moment: item.MomentID
        }

        inputArray.push(object)
    })

    const array = Object.entries(GroupBy(inputArray, 'moment')) 

    // Structure grouped array for graph

    const graphArray = []

    array && array.forEach(item => {
        const object =  {
            moment: '',
            count: item[1].length
        }

        graphArray.push(object)

    })

    console.log(graphArray)

    const firstNumber = graphArray.length === 0 ? 0 : graphArray[0]?.count
    const lastNumber = graphArray.length === 0 || graphArray[graphArray.length-1] === 0 ? 0 : graphArray[graphArray.length-1]?.count

    const difference = lastNumber - firstNumber

    // console.log(firstNumber)
    // console.log(lastNumber)
    // console.log(difference)

  return (
    <div>{difference}</div>
  )
}

export default MultiItemDifference