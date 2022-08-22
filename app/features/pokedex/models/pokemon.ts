import { types } from "mobx-state-tree"
import { DEFAULT_API_CONFIG } from "../../../services/api/api-config";

export const PokemonModel = types
  .model({
    name: types.maybe(types.string),
    url: types.maybe(types.string),
  })
  .views((self) =>({
    get getName() {
      return self.name
    },
    get getImageUrl() {
      const url = self.url;
      const urlSplit = url.split('/');
      const id = urlSplit[urlSplit.length - 2];
      const configImageUrl = DEFAULT_API_CONFIG.imageUrl
      const imageUrl = `${configImageUrl}/${id}.png`
      return imageUrl;
    },
    get getId() {
      const url = self.url;
      const urlSplit = url.split('/');
      const id = urlSplit[urlSplit.length - 2];
      return id;
    }
  }));
  