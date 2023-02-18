import { useFirestoreAnalysisMultipleChoiseMoment} from "../../../firebase/useFirestore"

const MultipleResultsCount = ({moment, input, field}) => {

    const results = useFirestoreAnalysisMultipleChoiseMoment(moment.ID, field.ID, input)

  return (
    <div className='multiple-results-count-container'>
      <h2>{results.length}</h2>
    </div>
    
  )
}

export default MultipleResultsCount