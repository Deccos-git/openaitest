import { db, timestamp } from '../../firebase/config'
import { useFirestoreResultsTasks } from '../../firebase/useFirestore'
import firebase from 'firebase'

const ResultDate = ({task}) => {

    const results = useFirestoreResultsTasks(task) 

    const dateHandler = (e) => {
        const value = e.target.value 
        const docid = e.target.dataset.docid

        const date = new Date(value)

        db.collection('Results')
        .doc(docid)
        .update({
            Timestamp: firebase.firestore.Timestamp.fromDate(date)
        })
    }

    const timestamp = (item) => {

        const year = item.Timestamp.toDate().getFullYear()
        const month = item.Timestamp.toDate().getMonth() + 1
        const day = item.Timestamp.toDate().getDate() + 1

        const date = new Date(`${year}-${month}-${day}`).toISOString().substring(0, 10)

        console.log(date)

        return date
    }

  return (
    <>
        {results && results.map(item => (
            <input key={item.ID} type="date" data-docid={item.docid} defaultValue={timestamp(item)}  onChange={dateHandler}/>
        ))}
    </>
  )
}

export default ResultDate