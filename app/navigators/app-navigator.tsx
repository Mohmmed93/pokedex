/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { PokedexScreen } from "../features/pokedex/screens/PokedexScreen"
import { PokedexDetailsScreen } from "../features/pokedex/screens/PokedexDetailsScreen"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  pokedex: undefined
  pokedexDetails: undefined
  welcome: undefined
  demo: undefined
  demoList: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="pokedex"
    >
      <Stack.Screen name="pokedex" component={PokedexScreen} />
      <Stack.Screen name="pokedexDetails" component={PokedexDetailsScreen} />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  useBackButtonHandler(canExit)
  const linking = {
    prefixes: ['pokedex://'],
    config: {
      // initialRouteName: 'PokedexScreen',
      screens: {
        pokedexDetails: 'pokedexDetails/:pokemonId',
        pokedex: {
          path: 'pokedex'
        },
      },
      
    }
  };
  return (
    <NavigationContainer
      linking={linking}
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["pokedex"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
