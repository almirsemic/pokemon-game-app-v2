import { useNavigate } from 'react-router-dom'
import Styles from './StartGame.module.css'

interface typeProps {
  pokemonOne: string | undefined
  pokemonTwo: string | undefined
}
const StartGame = (props: typeProps) => {
  const navigate = useNavigate()
  return (
    <div className="my-5">
      <div className={Styles.buttons}>
        <button
          className={Styles.btn}
          onClick={() =>
            navigate({
              pathname: '/game',
              search: `?fighterOne=${props.pokemonOne}&fighterTwo=${props.pokemonTwo}`
            })
          }
        >
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
