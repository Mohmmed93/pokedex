// Use this import if you want to use "env.js" file
// const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
// import { API_URL, IMAGE_URL  } from '../../config'

const API_URL='https://pokeapi.co/api/v2/'
const IMAGE_URL='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'
/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string
  imageUrl: string
  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL || process.env.API_URL || 'http://localhost:3000',
  timeout: 20000,
  imageUrl: IMAGE_URL
}
