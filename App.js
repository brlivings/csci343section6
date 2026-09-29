import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";

import HomeScreen from "./screens/HomeScreen";
import RecipesScreen from "./screens/RecipesScreen";
import AddRecipeScreen from "./screens/AddRecipeScreen";
import RecipeModalScreen from "./screens/RecipeModalScreen";

// Starter recipes so the list isn't empty the first time the app opens.
// These are my regular weekly preps.
const starterRecipes = [
  {
    id: "r1",
    title: "Chicken, Rice & Broccoli",
    text:
      "Makes 5 containers\n\n" +
      "- 2.5 lb chicken breast\n" +
      "- 5 cups cooked jasmine rice\n" +
      "- 2 bags frozen broccoli\n" +
      "- garlic powder, paprika, salt, pepper\n\n" +
      "1. Season chicken and bake at 425°F for 20-22 min.\n" +
      "2. Steam the broccoli while the chicken rests.\n" +
      "3. Slice chicken, split everything evenly into 5 containers.\n\n" +
      "Per container: ~520 cal / 50g P / 60g C / 7g F",
  },
  {
    id: "r2",
    title: "Ground Turkey Taco Bowls",
    text:
      "Makes 4 containers\n\n" +
      "- 2 lb 93/7 ground turkey\n" +
      "- 1 packet low sodium taco seasoning\n" +
      "- 4 cups cooked rice\n" +
      "- 1 can black beans (rinsed)\n" +
      "- salsa + fat free greek yogurt on top\n\n" +
      "1. Brown the turkey, drain, add seasoning and a splash of water.\n" +
      "2. Portion rice and beans, then turkey on top.\n" +
      "3. Keep salsa/yogurt separate until you eat it.\n\n" +
      "Per container: ~580 cal / 52g P / 62g C / 13g F",
  },
  {
    id: "r3",
    title: "Overnight Protein Oats",
    text:
      "1 jar (make 5 on Sunday)\n\n" +
      "- 1/2 cup oats\n" +
      "- 1 scoop vanilla whey\n" +
      "- 1/2 cup almond milk\n" +
      "- 1/2 cup greek yogurt\n" +
      "- 1 tbsp chia seeds + berries\n\n" +
      "Mix everything in a mason jar, fridge overnight, eat cold.\n\n" +
      "Per jar: ~430 cal / 42g P / 45g C / 9g F",
  },
  {
    id: "r4",
    title: "Salmon & Sweet Potato",
    text:
      "Makes 3 containers\n\n" +
      "- 3 salmon fillets (6 oz each)\n" +
      "- 3 medium sweet potatoes, cubed\n" +
      "- green beans\n" +
      "- olive oil spray, lemon pepper\n\n" +
      "1. Roast sweet potato at 400°F for 25 min.\n" +
      "2. Add salmon + green beans to the pan for the last 12-15 min.\n" +
      "3. Eat within 3 days - fish doesn't keep as long.\n\n" +
      "Per container: ~560 cal / 38g P / 45g C / 22g F",
  },
];

export default function App() {
  // load the Oswald font used for headings and buttons
  const [fontsLoaded] = useFonts({
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold,
  });

  // the main list of recipes - every screen reads from / updates this
  const [recipes, setRecipes] = useState(starterRecipes);
  // which screen is showing: "home", "recipes" or "addRecipe"
  const [currentScreen, setCurrentScreen] = useState("home");
  // controls the View Recipe modal
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  // used to build a unique id for each new recipe
  const [nextRecipeId, setNextRecipeId] = useState(starterRecipes.length + 1);

  // ---------- navigation ----------
  function goToHomeHandler() {
    setCurrentScreen("home");
  }

  function goToRecipesHandler() {
    setCurrentScreen("recipes");
  }

  function goToAddRecipeHandler() {
    setCurrentScreen("addRecipe");
  }

  // ---------- modal ----------
  function viewRecipeHandler(recipeId) {
    setSelectedRecipeId(recipeId);
    setModalIsVisible(true);
  }

  function closeModalHandler() {
    setModalIsVisible(false);
  }

  // ---------- updating the recipe list ----------
  // adds a new recipe to the end of the list, then goes back to Recipes
  function saveRecipeHandler(recipeTitle, recipeText) {
    const newRecipe = {
      id: "r" + nextRecipeId,
      title: recipeTitle,
      text: recipeText,
    };

    setRecipes((currentRecipes) => [...currentRecipes, newRecipe]);
    setNextRecipeId((currentId) => currentId + 1);
    setCurrentScreen("recipes");
  }

  // removes the recipe with the matching id from the list
  function deleteRecipeHandler(recipeId) {
    setRecipes((currentRecipes) =>
      currentRecipes.filter((recipe) => recipe.id !== recipeId)
    );
  }

  // find the full recipe object for the modal
  const selectedRecipe = recipes.find((recipe) => recipe.id === selectedRecipeId);

  // decide which screen to show based on currentScreen
  let screen = (
    <HomeScreen onGoToRecipes={goToRecipesHandler} recipeCount={recipes.length} />
  );

  if (currentScreen === "recipes") {
    screen = (
      <RecipesScreen
        recipes={recipes}
        onViewRecipe={viewRecipeHandler}
        onDeleteRecipe={deleteRecipeHandler}
        onAddRecipe={goToAddRecipeHandler}
        onGoHome={goToHomeHandler}
      />
    );
  }

  if (currentScreen === "addRecipe") {
    screen = (
      <AddRecipeScreen onSaveRecipe={saveRecipeHandler} onCancel={goToRecipesHandler} />
    );
  }

  // wait for the font so the headings don't flash in the default font
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style={currentScreen === "home" ? "light" : "dark"} />
      {screen}
      <RecipeModalScreen
        visible={modalIsVisible}
        recipe={selectedRecipe}
        onClose={closeModalHandler}
      />
    </SafeAreaProvider>
  );
}
