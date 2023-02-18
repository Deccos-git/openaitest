import KPIDataType from "../../components/kpis/KPIDataType";
import { useFirestoreGeneral } from "../../firebase/useFirestore";

const EffectData = ({effect}) => {

    const datasets = useFirestoreGeneral('EffectData', 'EffectID', effect.ID)

  return (
    <>
        {datasets && datasets.map(item => (
            <KPIDataType key={item.ID} dataset={item} parent={'effect'}/>
        ))}
    </>
  )
}

export default EffectData