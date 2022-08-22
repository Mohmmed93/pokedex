import { getPokemonDetailsApi, getPokemonListApi } from "../services/pokedex.services";

describe('Pokemon service testing', () => {
    it('Get pokemon list', async () => {
        const pokemonList = await getPokemonListApi('limit=20');
        if (pokemonList instanceof Error) fail(pokemonList);
        expect(pokemonList.results.length).toBe(20);
        expect(pokemonList.next).toBe('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
        expect(pokemonList.previous).toBe(null);
        expect(pokemonList.count).toBeGreaterThan(0);
    });

    it('Get pokemon details', async () => {
        const pokemonDetails = await getPokemonDetailsApi('bulbasaur');
        if (pokemonDetails instanceof Error) fail(pokemonDetails);
        expect(pokemonDetails.name).toBe('bulbasaur')
        expect(pokemonDetails.base_experience).toBe(64);
        expect(pokemonDetails.weight).toBe(69);
        expect(pokemonDetails.height).toBe(7);
    });
})