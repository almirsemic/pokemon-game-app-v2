import { useDispatch } from 'react-redux'
import { pokemonOneState, pokemonTwoState } from '../../Redux/pokemonsSlice'
import Styles from './NewFighter.module.css'

interface typeProps {
  pokemon: string
}
const NewFighter = (props: typeProps) => {
  const dispatch = useDispatch()
  function handlePokemons() {
    if (props.pokemon === 'pokemonOne') {
      dispatch(
        pokemonOneState({
          pokemonOneNumber: Math.floor(Math.random() * 100) + 1,
          ready: true,
        }),
      )
    } else if (props.pokemon === 'pokemonTwo') {
      dispatch(
        pokemonTwoState({
          pokemonTwoNumber: Math.floor(Math.random() * 100) + 1,
          ready: true,
        }),
      )
    }
  }
  return (
    <div className="my-5">
      <div className={Styles.box}>
        <div className={Styles.btn}>
          <button className="fw-bold" onClick={() => handlePokemons()}>
            NEW
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewFighter
