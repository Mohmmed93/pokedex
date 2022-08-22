import React, { useEffect, FC } from "react"
import { FlatList, TextStyle, View, ViewStyle} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { color, spacing } from "../../../theme"
import { NavigatorParamList } from "../../../navigators"
import { useStores } from "../../../models"
import { GradientBackground, Header, Screen, Spinner } from "../../../components"
import { PokemonItem } from "../../../components/pokemon-item/pokemon-item"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}
const ITEM_SEPARATOR: ViewStyle = {
  backgroundColor: color.palette.darkPurple,
  height: 2
}

export const PokedexScreen: FC<StackScreenProps<NavigatorParamList, "pokedex">> = observer(
  ({ navigation }) => {

    const { pokemonStore } = useStores()
    const { results } = pokemonStore

    useEffect(() => {
      async function fetchData() {
        await pokemonStore.getPokemonListAction('limit=20')
      }

      fetchData()
    }, [])

    const getPokemons = async () => {
      await pokemonStore.getPokemonListAction(pokemonStore.getNext)
    };

    const onNextScreen = async (item) => {
       navigation.navigate("pokedexDetails", {pokemonId: item.name})
    };

    return (
      <View style={FULL}>
        <GradientBackground colors={[color.palette.purple, color.palette.darkPurple]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerTx="pokedexScreen.title"
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <FlatList
            ItemSeparatorComponent={() => (
              <View style={ITEM_SEPARATOR} />
            )}
            ListFooterComponent={<Spinner />}
            contentContainerStyle={FLAT_LIST}
            data={[...results]}
            keyExtractor={(item) => item.getId}
            onEndReached={getPokemons}
            onEndReachedThreshold={0.4}
            renderItem={({ item }) => (
              <PokemonItem pokemonItem={item} onPokemonClick={onNextScreen} />
            )}
            removeClippedSubviews
          />
        </Screen>
      </View>
    )
  },
)
