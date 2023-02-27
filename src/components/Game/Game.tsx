import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { initialStateType } from '../../Types/types'
import Loading from '../Loading/Loading'
import Pokemon from '../Pokemon/Pokemon'
import Winner from '../Winner/Winner'
import Styles from './Game.module.css'

const Game = () => {
  const pokemons = useSelector((state: { Pokemons: initialStateType }) => state)
  const memoizedPokemons = useMemo(() => pokemons, [pokemons])
  const [pokemonOneHealth, setPokemonOneHealth] = useState<number>(100)
  const [pokemonTwoHealth, setPokemonTwoHealth] = useState<number>(100)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [ready, setReady] = useState<boolean>(true)
  const [isActive, setIsActive] = useState<boolean>(true)
  const [isRolledDown, setIsRolledDown] = useState(false)

  useEffect(() => {
    if (memoizedPokemons) {
      setLoaded(true)
      if (
        !memoizedPokemons.Pokemons.pokemonOne.ready &&
        !memoizedPokemons.Pokemons.pokemonTwo.ready
      ) {
        setLoaded(false)
        setReady(false)
      }
    }
  }, [memoizedPokemons])
  useEffect(() => {
    if (pokemonOneHealth <= 0 || pokemonTwoHealth <= 0) {
      setIsRolledDown(true)
    }
  }, [pokemonOneHealth, pokemonTwoHealth])

  return loaded ? (
    <div className={Styles.container}>
      <div className="row mt-5 w-100 d-flex justify-content-center align-items-center">
        <Pokemon
          pokemon="pokemonOne"
          type="game"
          pokemonHealth={pokemonOneHealth}
          data={memoizedPokemons.Pokemons.pokemonOne.data}
          isActive={isActive}
          setIsActive={setIsActive}
          setPokemonHealth={setPokemonTwoHealth}
        />

        <div className="col-6 col-lg-2 my-5">
          <img
            className={`${Styles.pokemon_one_fight}`}
            src={memoizedPokemons.Pokemons.pokemonOne.data?.front_shiny}
            alt={memoizedPokemons.Pokemons.pokemonOne.data?.name}
          />
          <img
            className={`${Styles.pokemon_two_fight}`}
            src={memoizedPokemons.Pokemons.pokemonTwo.data?.front_shiny}
            alt={memoizedPokemons.Pokemons.pokemonTwo.data?.name}
          />
        </div>
        <Pokemon
          pokemon="pokemonTwo"
          type="game"
          pokemonHealth={pokemonTwoHealth}
          data={memoizedPokemons.Pokemons.pokemonTwo.data}
          isActive={isActive}
          setIsActive={setIsActive}
          setPokemonHealth={setPokemonOneHealth}
        />
      </div>
      <div
        className={Styles.content}
        style={{
          top: isRolledDown ? 0 : '-100%',
          transform: isRolledDown ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        {isRolledDown && (
          <Winner
            pokemonHealth={
              pokemonOneHealth === 0 ? pokemonTwoHealth : pokemonOneHealth
            }
            setIsRolledDown={setIsRolledDown}
            pokemon={
              pokemonOneHealth === 0
                ? memoizedPokemons.Pokemons.pokemonTwo.data
                : memoizedPokemons.Pokemons.pokemonOne.data
            }
          />
        )}
      </div>
    </div>
  ) : (
    <Loading ready={ready} />
  )
}

export default Game
