import { configureStore } from '@reduxjs/toolkit'
import pokemonsSlice from './pokemonsSlice'

export const store = configureStore({
  reducer: {
    Pokemons: pokemonsSlice,
  }
})