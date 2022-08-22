import React, { useEffect, FC } from "react"
import { TextStyle, View, ViewStyle, ImageStyle, Image } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { color, spacing } from "../../../theme"
import { NavigatorParamList } from "../../../navigators"
import { useStores } from "../../../models"
import { GradientBackground, Header, Screen, Text } from "../../../components"
import I18n from "i18n-js"

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
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 200,
  width: 200,
}
const VIEW_CONTAINER: ViewStyle = {
  alignItems: 'center'
}
const NAME_TEXT: TextStyle = {
  fontSize: 24,
  fontWeight: 'bold',
  marginTop: 15
}
const DETAILS_TEXT: TextStyle = {
  fontSize: 16,
  fontWeight: '500'
}

export const PokedexDetailsScreen: FC<StackScreenProps<NavigatorParamList, "pokedexDetails">> = observer(
  ({ navigation, route }) => {

    const { pokemonStore } = useStores()
    const { getName, getHeight, getBaseExperience, getWeight, getImageUrl} = pokemonStore
    const goBack = () => navigation.goBack()
    const { pokemonId } = route.params;

    useEffect(() => {
      async function fetchData() {
        await pokemonStore.getPokemonDetailsAction(pokemonId)
      }
      fetchData()
    }, [route])

    return (
      <View style={FULL}>
       <GradientBackground colors={[color.palette.purple, color.palette.darkPurple]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            leftIcon="back"
            onLeftPress={goBack}
            headerTx="pokedexDetailsScreen.title"
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <View style={VIEW_CONTAINER}>
          <Image source={{ uri: getImageUrl }} style={IMAGE} />
          <Text style={NAME_TEXT}>{getName}</Text>
          <Text style={DETAILS_TEXT}>{`${I18n.t("pokedexDetailsScreen.height")}: ${getHeight}`}</Text>
          <Text style={DETAILS_TEXT}>{`${I18n.t("pokedexDetailsScreen.experience")}: ${getBaseExperience}`}</Text>
          <Text style={DETAILS_TEXT}>{`${I18n.t("pokedexDetailsScreen.weight")}: ${getWeight}`}</Text>
          </View>
        </Screen>
      </View>
    )
  },
)
