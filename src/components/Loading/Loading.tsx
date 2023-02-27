import { useNavigate } from 'react-router'
import GoHome from '../Buttons/GoHome'
import Styles from './Loading.module.css'
interface typeProps {
  ready: boolean
}
const Loading = (props: typeProps) => {
  const navigate = useNavigate()
  function handleEndGame() {
    navigate('/')
  }
  return (
    <div className={Styles.loaded_wrapper}>
      {props.ready ? (
        <div className={Styles.lds_ripple}>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div className={Styles.lds_hourglass}></div>
      )}
      {!props.ready && (
        <p className="my-5 mx-3">
          Choose the fighters !!! <GoHome handleEndGame={handleEndGame} />
        </p>
      )}
    </div>
  )
}

export default Loading
