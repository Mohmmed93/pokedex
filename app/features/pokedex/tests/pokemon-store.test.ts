import { PokenmonStoreModel } from "../models/pokemon-store"

describe('Pokemon Store testing', () => {
    const pokenmonStoreModel = PokenmonStoreModel.create({});

    it('Get pokemon list', async () => {
        expect(pokenmonStoreModel.getPokemonList.length).toBe(0);
        expect(pokenmonStoreModel.count).toBe(0);
        expect(pokenmonStoreModel.next).toBe('');
        expect(pokenmonStoreModel.previous).toBe(null);
        expect(pokenmonStoreModel.results).toStrictEqual([]);
        expect(pokenmonStoreModel.id).toBe(0);
        await pokenmonStoreModel.getPokemonListAction('limit=20');
        expect(pokenmonStoreModel.getPokemonList.length).toBe(20);
        expect(pokenmonStoreModel.count).toBeGreaterThan(0);
        expect(pokenmonStoreModel.next).toBe('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
        expect(pokenmonStoreModel.previous).toBe(null);
        expect(pokenmonStoreModel.results.length).toBe(20);
        expect(pokenmonStoreModel.getNext).toBe('offset=20&limit=20');
        expect(pokenmonStoreModel.getPokemonList[0].getId).toBe("1");
        expect(pokenmonStoreModel.getPokemonList[0].getName).toBe('bulbasaur');
        expect(pokenmonStoreModel.getPokemonList[0].getImageUrl)
        .toBe(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokenmonStoreModel.getPokemonList[0].getId}.png`)
    });

    it('Get pokemon list pagination', async () => {
        await pokenmonStoreModel.getPokemonListAction(pokenmonStoreModel.getNext);
       
        expect(pokenmonStoreModel.getPokemonList.length).toBe(40);
        expect(pokenmonStoreModel.previous).toBe('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
    });

    it('Pokemon details', async () => {
        await pokenmonStoreModel.getPokemonDetailsAction('bulbasaur');
        expect(pokenmonStoreModel.name).toBe('bulbasaur');
        expect(pokenmonStoreModel.getBaseExperience).toBe(64);
        expect(pokenmonStoreModel.getWeight).toBe(69);
        expect(pokenmonStoreModel.getHeight).toBe(7);
        expect(pokenmonStoreModel.getImageUrl)
        .toBe(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokenmonStoreModel.id}.png`)
    });
})