import { useNavigate } from "react-router-dom"
import Styles from "./StartGame.module.css"

const StartGame = () => {
  const navigate = useNavigate()
  return (
    <div className="my-5">
      <div className={Styles.buttons}>
        <button className={Styles.btn} onClick={() => navigate("/game")}>
          <span></span>
          <p
            data-start="good luck!"
            data-text="start!"
            data-title="new game"
          ></p>
        </button>
      </div>
    </div>
  )
}

export default StartGame
