import { useEffect, useState } from 'react'
import axios from 'axios'
import { Pokemon, PokemonData } from '../Types/types'

const useFetchPokemon = (pokemonUrl: string) => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null)

  useEffect(() => {
    const source = axios.CancelToken.source()

    const fetchData = async () => {
      try {
        const response = await axios.get<Pokemon>(pokemonUrl, {
          cancelToken: source.token,
        })
        setPokemonData({
          name: response.data.name,
          front_shiny: response.data.sprites.front_shiny,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defenese:
            response.data.stats[2].base_stat > 90
              ? 90
              : response.data.stats[2].base_stat,
          speed: response.data.stats[5].base_stat,
        })
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message)
        } else {
          console.log(error)
        }
      }
    }

    fetchData()

    return () => {
      source.cancel('Request canceled due to component unmount')
    }
  }, [pokemonUrl])

  return pokemonData
}

export default useFetchPokemon
