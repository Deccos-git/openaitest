import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const Celebrate= ({display}) => {

    const { width, height } = useWindowSize()

  return (
    <Confetti
    width={width}
    height={height}
    style={{display: display}}
    />
  )
}

export default Celebrate