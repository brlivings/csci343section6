# Prep Book – Recipes App (CSCI 343, Assignment 06)

Brennan Livingston · Coastal Carolina University

A React Native (Expo) recipes app for keeping track of my weekly meal preps.

## Screens
| Screen | File | What it does |
| --- | --- | --- |
| Home | `screens/HomeScreen.js` | App title, meal prep image, button to the recipes |
| Recipes | `screens/RecipesScreen.js` | FlatList of `RecipeItem`s, Add Recipe + Home buttons |
| Add Recipe | `screens/AddRecipeScreen.js` | Title + recipe text inputs, Save / Cancel |
| View Recipe (modal) | `screens/RecipeModalScreen.js` | Recipe title + text, Back to Recipes button |

Custom components are in `components/` (`PrepButton`, `RecipeItem`), images in
`assets/images/`, and the app mock up is `docs/mockup.png`.

The recipe list, the current screen and the modal state all live in `App.js`
and are passed down to the screens as props.

## Running it
```
npm install
npx expo start
```
