import { useFirestoreAnalysisWords } from "../../../firebase/useFirestore";

const WordCount = ({category, moment, field}) => {

    const words = useFirestoreAnalysisWords(field.ID ? field.ID : field, moment ? moment : '', category ? category : '')

  return (
    <div>{words.length}</div>
  )
}

export default WordCount