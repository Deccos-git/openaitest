import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
  } from "recharts";
import { useFirestoreID } from "../../../firebase/useFirestore";

const OpenQuestionGraph = ({results}) => {

  console.log(results)

  return (
    <div className='activity-meta-title-container' >
    <AreaChart
    width={300}
    height={100}
    data={results}
    margin={{
      top: 10,
      right: 30,
      left: 0,
      bottom: 0
    }}
      >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="moment" />
    <YAxis />
    <Tooltip />
    <Area type="monotone" dataKey="count" stroke="#f48183" fill="#f48183" />
  </AreaChart>
</div>
  )
}

export default OpenQuestionGraph