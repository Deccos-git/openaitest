import KPIDataType from "../../components/kpis/KPIDataType";
import { useFirestoreGeneral } from "../../firebase/useFirestore";

const KpiData = ({kpi}) => {

    const datasets = useFirestoreGeneral('KpiData', 'KpiID', kpi.ID)

  return (
    <>
        {datasets && datasets.map(item => (
            <KPIDataType key={item.ID} dataset={item} parent={'kpi'}/>
        ))}
    </>
  )
}

export default KpiData