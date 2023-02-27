import { useNavigate } from 'react-router'
import { PokemonData } from '../../Types/types'
import Pokemon from '../Pokemon/Pokemon'

interface typeProps {
  pokemonHealth: number
  setIsRolledDown: (arg: boolean) => void
  pokemon: PokemonData | undefined
}
const Winner = (props: typeProps) => {
  const navigate = useNavigate()
  const handleEndGame = () => {
    props.setIsRolledDown(false)
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }
  return (
    <div className="row d-flex justify-content-center align-items-center w-100 h-100">
      <Pokemon
        pokemon=""
        type="winner"
        pokemonHealth={props.pokemonHealth}
        data={props.pokemon}
        handleEndGame={handleEndGame}
      />
    </div>
  )
}

export default Winner
