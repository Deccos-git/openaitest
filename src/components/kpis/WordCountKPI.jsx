import { useFirestoreAnalysisWords } from "../../firebase/useFirestore";

const WordCountKPI = ({category, moment, field}) => {

    const words = useFirestoreAnalysisWords(field.ID ? field.ID : '', moment ? moment : '', category ? category : '')

  return (
    <h1>{words.length}</h1>
  )
}

export default WordCountKPI