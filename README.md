# Pokedex

## Run the following command to run the application

To get started please, follow: <https://reactnative.dev/docs/environment-setup>

1. Enter `yarn`

2. Enter `npx react-native start --reset-cache`

3. To run Android enter: `yarn android` or `npx react-native run-android`

4. To run iOS enter: `yarn ios` or `npx react-native run-ios`

5. To run test enter: `yarn test`

### To open Pokemon details page directly(Deep link), please use following command in terminal or browser

- To open the pokedex app:
  - iOS: `npx uri-scheme open pokedex:// --ios`
  - Android: `adb shell am start -W -a android.intent.action.VIEW -d "pokedex://"`
  
- To open pokemon specific character details. For example to open 'ditto':
  - iOS: `npx uri-scheme open pokedex://pokedexDetails/ditto --ios`
  - Android: `adb shell am start -W -a android.intent.action.VIEW -d "pokedex://pokedexDetails/ditto" --android`

 Likewise, we can pass any character name through this url and open the details of that.

## Pokedex project structure

```

├── app
│   ├── components - project nano components
│   ├── config - env file access points
│   ├── features
│   │   └── pokedex - feature folder that contain all the file to respective feature.
│   │       ├──models   - feature's models and MobX tree.
│   │       ├──screens  - feature's user interface screens.
│   │       ├──services - rest api calls.
│   │       └──test     - feature's unit test files.
│   ├── i18n - project localizations files.
│   ├── models - root model and model setup files.
│   ├── navigators - project navigation utilities.
│   ├── services - rest api setup files.
│   ├── theme - project theme setup files.
│   └──app.tsx - .ts entry point to application.
├── test - test setup files.
├── README.md
├── android - native android files.
├── index.js - application entry point.
├── ios - native iOS files.
├── .env** - project environment files.
└── package.json - project json files.

```
