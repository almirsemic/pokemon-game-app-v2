import { useSelector } from 'react-redux'
import { initialStateType } from '../../Types/types'
import Styles from './ButtonAttack.module.css'

interface typeProps {
  type: string
  isActive?: boolean
  pokemonHealth: number
  setIsActive?: (arg: boolean) => void
  setPokemonHealth?: (arg: number | ((prev: number) => number)) => void
}
const ButtonAttack = (props: typeProps) => {
  const attack = useSelector((state: { Pokemons: initialStateType }) => {
    const pokemonOneAttack = state.Pokemons.pokemonOne.data?.attack
    const pokemonTwoDefense = state.Pokemons.pokemonTwo.data?.defenese
    const pokemonTwoAttack = state.Pokemons.pokemonTwo.data?.attack
    const pokemonOneDefense = state.Pokemons.pokemonOne.data?.defenese

    if (
      pokemonOneAttack &&
      pokemonTwoDefense &&
      pokemonTwoAttack &&
      pokemonOneDefense
    ) {
      const pokemonOneAttackValue =
        pokemonOneAttack / 2 -
        (pokemonOneAttack / 2) * (pokemonTwoDefense / 100)
      const pokemonTwoAttackValue =
        pokemonTwoAttack / 2 -
        (pokemonTwoAttack / 2) * (pokemonOneDefense / 100)
      return [
        pokemonOneAttackValue.toFixed(2),
        pokemonTwoAttackValue.toFixed(2),
      ]
    }
    return [undefined, undefined]
  })

  const pokemonOneAttack = Number(attack[0])
  const pokemonTwoAttack = Number(attack[1])

  const random = Math.random()

  function handleClick() {
    if (props.setIsActive) {
      props.setIsActive(!props.isActive)
    }
    if (props.type === 'pokemonOne' && props.setPokemonHealth) {
      if (random > 0.2) {
        props.setPokemonHealth((prevHealth) =>
          prevHealth - pokemonOneAttack < 0 ? 0 : prevHealth - pokemonOneAttack,
        )
      }
    } else if (props.type === 'pokemonTwo' && props.setPokemonHealth) {
      if (random > 0.2) {
        props.setPokemonHealth((prevHealth) =>
          prevHealth - pokemonTwoAttack < 0 ? 0 : prevHealth - pokemonTwoAttack,
        )
      }
    }
  }
  return (
    <button
      disabled={
        (!props.isActive && props.type === 'pokemonOne') ||
        (props.isActive && props.type === 'pokemonTwo') ||
        props.pokemonHealth <= 0
      }
      className={`${Styles.button_attack} ${
        (props.isActive && props.type === 'pokemonOne') ||
        (!props.isActive && props.type === 'pokemonTwo')
          ? Styles.active
          : ''
      }`}
      onClick={() => handleClick()}
    >
      <span>Attack</span>
    </button>
  )
}

export default ButtonAttack
