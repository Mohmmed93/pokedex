import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PokenmonStoreModel } from "../../features/pokedex/models/pokemon-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  pokemonStore: types.optional(PokenmonStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
export interface PokenmonStore extends Instance<typeof PokenmonStoreModel>{}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
