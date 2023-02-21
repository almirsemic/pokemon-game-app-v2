import useFetchPokemon from '../../CustomHooks/useFetchPokemons'
import { initialStateType, PokemonData } from '../../Types/types'
import photo from '../../assets/pokeapi.png'
import './Home.css'
import NewFighter from '../Buttons/NewFighter'
import StartGame from '../Buttons/StartGame'
import { useEffect, useMemo, useState } from 'react'
import Loading from '../Loading/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { pokemonOneState, pokemonTwoState } from '../../Redux/pokemonsSlice'

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

  const memoizedPokemonOne = useMemo(() => pokemonOne, [pokemonOne]);
  const memoizedPokemonTwo = useMemo(() => pokemonTwo, [pokemonTwo]);
  
  const [loaded, setLoaded] = useState<boolean>(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (memoizedPokemonOne && memoizedPokemonTwo) {
      setLoaded(true)
      dispatch(
        pokemonOneState({
          pokemonOneNumber: pokemonOneNumber,
          data: memoizedPokemonOne,
        }),
      )
      dispatch(
        pokemonTwoState({
          pokemonTwoNumber: pokemonTwoNumber,
          data: memoizedPokemonTwo,
        }),
      )
    }
  }, [memoizedPokemonOne, memoizedPokemonTwo, dispatch, pokemonOneNumber, pokemonTwoNumber])
  return loaded ? (
    <div className="home_wrapper">
      <div className="row w-100 text-center logo_container">
        <img className="logo" src={photo} alt="PokeAPI logo" />
      </div>
      <div className="row mt-5 w-100 d-flex justify-content-center align-items-center">
        <div className="col-12 col-lg-5 d-flex justify-content-center justify-content-lg-end left_pokemon">
          <div className="w-50 text-center">
            <div className="rounded-pill progress_wrapper">
              <div className="rounded-pill progress justify-content-center align-items-center text-white fw-bold">
                100%
              </div>
            </div>
            <div className="text-white fw-bold my-3">
              {memoizedPokemonOne?.name.toUpperCase()}
            </div>
            <img
              className="rocket opacity-50"
              src={memoizedPokemonOne?.front_shiny}
              alt={memoizedPokemonOne?.name}
            />
            <NewFighter pokemon="pokemonOne" />
          </div>
        </div>
        <div className="col-7 col-lg-2 start_game">
          <StartGame />
        </div>
        <div className="col-12 col-lg-5 d-flex justify-content-center justify-content-lg-start right_pokemon">
          <div className="w-50 text-center">
            <div className="rounded-pill progress_wrapper">
              <div className="rounded-pill progress justify-content-center align-items-center text-white fw-bold">
                100%
              </div>
            </div>
            <div className="text-white fw-bold my-3">
              {memoizedPokemonTwo?.name.toUpperCase()}
            </div>
            <img
              className="rocket opacity-50"
              src={memoizedPokemonTwo?.front_shiny}
              alt={memoizedPokemonTwo?.name}
            />
            <NewFighter pokemon="pokemonTwo" />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default Home
