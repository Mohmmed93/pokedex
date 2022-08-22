import * as React from "react"
import { View, ViewStyle, ImageStyle, TextStyle, Image, TouchableOpacity } from "react-native"
import { Text } from "../text/text"

const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
interface PokemonItemType {
  name: string;
  getImageUrl: string;
  getId: string;
}
export interface PokemonItemProps {
  pokemonItem: PokemonItemType;
  onPokemonClick: (item: PokemonItemType) => void;
}

export function PokemonItem(props: PokemonItemProps) {
  return (
    <TouchableOpacity onPress={() => props.onPokemonClick(props.pokemonItem)}>
      <View  style={LIST_CONTAINER}>
       <Image source={{ uri: props.pokemonItem.getImageUrl }} style={IMAGE} />
       <Text style={LIST_TEXT}>
        {props.pokemonItem.name}
       </Text>
       </View>
    </TouchableOpacity>
  )
}
