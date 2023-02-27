import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { initialStateType } from '../Types/types'

const initialState: initialStateType = {
  pokemonOne: {
    pokemonOneNumber: 1,
    ready: false,
    data: {
      name: '',
      front_shiny: '',
      hp: 0,
      attack: 0,
      defenese: 0,
      speed: 0,
    },
  },
  pokemonTwo: {
    pokemonTwoNumber: 2,
    ready: false,
    data: {
      name: '',
      front_shiny: '',
      hp: 0,
      attack: 0,
      defenese: 0,
      speed: 0,
    },
  },
}

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    pokemonOneState: (
      state,
      action: PayloadAction<initialStateType['pokemonOne']>,
    ) => {
      state.pokemonOne.pokemonOneNumber = action.payload.pokemonOneNumber
      state.pokemonOne.ready = action.payload.ready
      if (action.payload.data) {
        state.pokemonOne.data = action.payload.data
      }
    },
    pokemonTwoState: (
      state,
      action: PayloadAction<initialStateType['pokemonTwo']>,
    ) => {
      state.pokemonTwo.pokemonTwoNumber = action.payload.pokemonTwoNumber
      state.pokemonTwo.ready = action.payload.ready
      if (action.payload.data) {
        state.pokemonTwo.data = action.payload.data
      }
    },
  },
})

export const { pokemonOneState, pokemonTwoState } = pokemonsSlice.actions

export default pokemonsSlice.reducer
