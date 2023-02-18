import { useFirestoreOutputSubEffects } from "../../firebase/useFirestore";
import ArrowDownRight from "../../images/icons/arrow-down-right.png"
import EffectData from "../../components/effects/EffectData";

const SubEffectDashboard = ({id}) => {

    const effects = useFirestoreOutputSubEffects(id)

    const positiveNegative = (effect) => {

        if(effect === 'positive'){
            return 'Positief'
        } else {
            return 'Negatief'
        }
    }

    const type = (type) => {

        if(type === 'targetgroup'){
            return 'Impact op doelgroep'
        } else {
            return 'Impact op maatschappij'
        }
    }

  return (
      <>
        {effects && effects.map(effect => (
            <div key={effect.ID} className='output-effects-outer-container'>
                <img src={ArrowDownRight} alt="" />
                <div className='output-effects-container sub-effects-container' >
                    <div className='output-effects-inner-container'>
                        <div className='output-detail-container'>
                            <p><b>Effect</b></p>
                            <p><i>{effect.Effect}</i></p>
                        </div>
                        <div className='output-effects-meta-container'>
                            <div className='effects-meta-item-container'>
                                <p><b>Positief/negatief</b></p>
                                <p>{positiveNegative(effect.PosNeg)}</p> 
                            </div>
                            <div className='effects-meta-item-container'>
                                <p><b> Type</b></p>
                                <p>{type(effect.Type)}</p>
                            </div>
                            <div className='effects-meta-datapoints-container'>
                                <p><b> Onderbouwing</b></p>
                                <div>
                                    <EffectData effect={effect}/>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <SubEffectDashboard id={effect.ID}/>
                </div>
            </div>
        ))}
    </>
  )
}

export default SubEffectDashboard