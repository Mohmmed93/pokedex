import { applySnapshot, types } from "mobx-state-tree"
import { DEFAULT_API_CONFIG } from "../../../services/api/api-config";
import { getPokemonDetailsApi, getPokemonListApi, PokemonDetails, PokemonList } from "../services/pokedex.services"
import { PokemonModel } from "./pokemon"

export const PokenmonStoreModel = types
  .model({
    count: types.optional(types.number, 0),
    next: types.optional(types.string, ""),
    previous: types.maybeNull(types.string),
    results: types.optional(types.array(PokemonModel), []),
    id: types.optional(types.number, 0),
    name: types.maybeNull(types.string),
    base_experience: types.optional(types.number, 0),
    height: types.optional(types.number, 0),
    weight: types.optional(types.number, 0)
  })
  .actions((self) => ({
      getPokemonListAction: async (nextPage: string) => {
        try {
          const response: PokemonList = await getPokemonListApi(nextPage);
          applySnapshot(self, 
            {...self, 
              results: self.results ? [...self.results, ...response.results] : response.results,
              next: response.next,
              count: response.count,
              previous: response.previous
            });
        } catch (error) {
          console.log('error', error)
          // handle error
        }
      },
      getPokemonDetailsAction: async (pokemonId: string) => {
        try {
          const response: PokemonDetails = await getPokemonDetailsApi(pokemonId);
          applySnapshot(self,
            {...self,
              id: response.id,
              name: response.name,
              height: response.height,
              base_experience: response.base_experience,
              weight: response.weight
            }
          )
        } catch (error) {
          console.log('error', error.message)
          // handle error
        }
      },
  }))
  .views((self) => ({
    get getPokemonList() {
      return self.results;
    },
    get getNext() {
      const next = self.next.split('?');
      return next[1];
    },
    get getName() {
      return self.name;
    },
    get getHeight() {
      return self.height;
    },
    get getBaseExperience() {
      return self.base_experience
    },
    get getWeight() {
      return self.weight
    },
    get getImageUrl() {
      const configImageUrl = DEFAULT_API_CONFIG.imageUrl
      const imageUrl = `${configImageUrl}/${self.id}.png`
      return imageUrl;
    }
  }))
