import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
  } from "recharts";
import { useState, useEffect } from 'react'
import { useFirestoreResults} from '../../firebase/useFirestore'

const ManualResultsGraph = ({output}) => {

    const [data, setData] = useState('')

    const options = { month: 'numeric', year: 'numeric'};

    const dataset = useFirestoreResults(output.ID)

    const resultsArray = []

    useEffect(() => {

        const dataArray = []

        dataset && dataset.forEach(data => {

            const month = data.Timestamp.toDate().toLocaleDateString("nl-NL", options)

            resultsArray.push(data.Result)

            const dataObject = {
                Maand: month,
                Resultaat: results(resultsArray)
            }

            dataArray.push(dataObject)
        })

       setData(dataArray)

    },[dataset])

    const results = (resultsArray) => {

      const sum = resultsArray.reduce((partialSum, a) => partialSum + a, 0);

      return sum

    }

  return (
    <div className='activity-meta-title-container' style={{display: dataset.length > 0 ? 'block' : 'none'}}>
       <ResponsiveContainer width='100%' height={200}>
          <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
            >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Maand" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="Resultaat" stroke="#f48183" fill="#f48183" />
        </AreaChart>
      </ResponsiveContainer>
  </div>
  )
}

export default ManualResultsGraph