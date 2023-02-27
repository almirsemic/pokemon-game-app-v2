import useFetchPokemon from '../../CustomHooks/useFetchPokemons'
import { initialStateType, PokemonData } from '../../Types/types'
import photo from '../../assets/pokeapi.png'
import './Home.css'
import StartGame from '../Buttons/StartGame'
import { useEffect, useMemo, useState } from 'react'
import Loading from '../Loading/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { pokemonOneState, pokemonTwoState } from '../../Redux/pokemonsSlice'
import Pokemon from '../Pokemon/Pokemon'

const Home: React.FC = () => {
  const pokemonOneNumber = useSelector(
    (state: { Pokemons: initialStateType }) =>
      state.Pokemons.pokemonOne.pokemonOneNumber,
  )
  const pokemonTwoNumber = useSelector(
    (state: { Pokemons: initialStateType }) =>
      state.Pokemons.pokemonTwo.pokemonTwoNumber,
  )

  const pokemonOne: PokemonData | null = useFetchPokemon(
    pokemonOneNumber.toString(),
  )
  const pokemonTwo: PokemonData | null = useFetchPokemon(
    pokemonTwoNumber.toString(),
  )

  const memoizedPokemonOne = useMemo(() => pokemonOne, [pokemonOne])
  const memoizedPokemonTwo = useMemo(() => pokemonTwo, [pokemonTwo])

  const [loaded, setLoaded] = useState<boolean>(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (memoizedPokemonOne && memoizedPokemonTwo) {
      setLoaded(true)
      dispatch(
        pokemonOneState({
          pokemonOneNumber: pokemonOneNumber,
          ready: true,
          data: memoizedPokemonOne,
        }),
      )
      dispatch(
        pokemonTwoState({
          pokemonTwoNumber: pokemonTwoNumber,
          ready: true,
          data: memoizedPokemonTwo,
        }),
      )
    }
  }, [
    memoizedPokemonOne,
    memoizedPokemonTwo,
    dispatch,
    pokemonOneNumber,
    pokemonTwoNumber,
  ])
  return loaded ? (
    <div className="home_wrapper">
      <div className="row w-100 text-center logo_container">
        <img className="logo" src={photo} alt="PokeAPI logo" />
      </div>
      <div className="row mt-5 w-100 d-flex justify-content-center align-items-center">
        <Pokemon
          pokemon="pokemonOne"
          type="home"
          pokemonHealth={100}
          data={memoizedPokemonOne}
        />
        <div className="col-7 col-lg-2 start_game">
          <StartGame />
        </div>
        <Pokemon
          pokemon="pokemonTwo"
          type="home"
          pokemonHealth={100}
          data={memoizedPokemonTwo}
        />
      </div>
    </div>
  ) : (
    <Loading ready={true} />
  )
}

export default Home
