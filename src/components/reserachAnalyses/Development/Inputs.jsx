import OpenQuestionGraph from "../graphs/OpenQuestionGraph";
import {useFirestoreAnalysisMultipleChoise} from '../../../firebase/useFirestore'
import GroupBy from "../../../hooks/GroupBy";

const Inputs = ({input, field}) => {

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

  return (
    <OpenQuestionGraph results={graphArray} />
  )
}

export default Inputs