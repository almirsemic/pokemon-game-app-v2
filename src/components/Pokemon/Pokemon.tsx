import { PokemonData } from '../../Types/types'
import ButtonAttack from '../Buttons/ButtonAttack'
import GoHome from '../Buttons/GoHome'
import NewFighter from '../Buttons/NewFighter'
import Styles from './Pokemon.module.css'

interface typeProps {
  pokemon: string
  type: string
  pokemonHealth: number
  isActive?: boolean
  data: PokemonData | null | undefined
  setIsActive?: (arg: boolean) => void
  handleEndGame?: () => void
  setPokemonHealth?: (arg: number | ((prev: number) => number)) => void
}
const PokemonOne = (props: typeProps) => {
  return (
    <div
      className={`col-12 col-sm-8 col-lg-5 col-xl-4 my-5 my-lg-0 d-flex justify-content-center ${
        props.pokemon === 'pokemonOne'
          ? Styles.left_pokemon
          : Styles.right_pokemon
      }`}
    >
      <div className="w-75 text-center">
        <small className="text-white fw-bold">
          {props.pokemonHealth.toFixed(2)}%
        </small>
        <div
          className="rounded-pill w-100"
          style={{
            boxShadow:
              props.pokemonHealth >= 50
                ? '0 0 5px rgb(175, 236, 83)'
                : props.pokemonHealth >= 30
                ? '0 0 5px rgb(253, 176, 34)'
                : '0 0 5px rgb(239, 46, 46)',
          }}
        >
          <div
            className="rounded-pill"
            style={{
              backgroundColor:
                props.pokemonHealth >= 50
                  ? 'rgb(175, 236, 83)'
                  : props.pokemonHealth >= 30
                  ? 'rgb(253, 176, 34)'
                  : 'rgb(239, 46, 46)',
              width: props.pokemonHealth + '%',
              height: '13px',
            }}
          ></div>
        </div>
        <div className="text-white fw-bold my-3">
          {props.data?.name?.toUpperCase()}
        </div>
        <img
          className={`${
            props.pokemon === 'pokemonOne' &&
            props.isActive &&
            props.type === 'game'
              ? 'opacity-100'
              : props.pokemon === 'pokemonTwo' &&
                !props.isActive &&
                props.type === 'game'
              ? 'opacity-100'
              : 'opacity-25'
          } h-auto w-75`}
          src={props.data?.front_shiny}
          alt={props.data?.name}
        />
        {props.type === 'game' ? (
          <>
            <div className="text-light">
              <p className="my-0">
                HP: <small className="text-warning">{props.data?.hp}</small>
              </p>
              <p className="my-0">
                Attack:{' '}
                <small className="text-warning">{props.data?.attack}</small>
              </p>
              <p className="my-0">
                Defense:{' '}
                <small className="text-warning">{props.data?.defenese}</small>
              </p>
              <p className="my-0">
                Speed:{' '}
                <small className="text-warning">{props.data?.speed}</small>
              </p>
            </div>
            <ButtonAttack
              pokemonHealth={props.pokemonHealth}
              type={props.pokemon}
              isActive={props.isActive}
              setIsActive={props.setIsActive}
              setPokemonHealth={props.setPokemonHealth}
            />
          </>
        ) : props.type === 'home' ? (
          <NewFighter pokemon={props.pokemon} />
        ) : props.type === 'winner' ? (
          <div>
            <p className="text-light fw-bold">
              Pokemon:{' '}
              <small className="text-warning">
                {props.data?.name.toUpperCase()}
              </small>{' '}
              is win !!!
            </p>
            <GoHome handleEndGame={props.handleEndGame} />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default PokemonOne
