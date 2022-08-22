import { ClientError } from "../../../models/ClientError";
import { getFromApi } from "../../../services/api";

interface Pokemon {
    name: string;
    url: string;
}

export interface PokemonList {
    results: Array<Pokemon>;
    next: string;
    previous: string | null;
    count: number;
}

export interface PokemonDetails {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
};

export async function getPokemonListApi(next: string) {
    const url = `pokemon?${next}`;
    const pokemonList: PokemonList | any = await getFromApi(url);
    if (pokemonList instanceof (ClientError || Error)) throw pokemonList;
    return pokemonList;
}

export async function getPokemonDetailsApi(pokemonId: string) {
    const url = `pokemon/${pokemonId}`;
    const pokemonDetails: PokemonDetails | any = await getFromApi(url);
    if (pokemonDetails instanceof (ClientError || Error)) throw pokemonDetails;
    return pokemonDetails;
}