import { useFirestoreAnalysisMultipleChoiseMoment } from "../../firebase/useFirestore"

const MultipleResultsKpi = ({moment, field, input}) => {

    const results = useFirestoreAnalysisMultipleChoiseMoment(moment.ID ? moment.ID : moment, field.ID ? field.ID : field, input ? input : '')

  return (
    <h1>{results.length}</h1>
  )
}

export default MultipleResultsKpi