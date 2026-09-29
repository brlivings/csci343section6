import { Pressable, StyleSheet, Text, View } from "react-native";

import Colors from "../constants/colors";

// Reusable button used on every screen of the app.
// props:
//   children - the label shown on the button
//   onPress  - function to run when the button is tapped
//   variant  - "primary" (teal), "secondary" (outlined) or "danger" (red)
//   small    - true for the compact version used inside each RecipeItem
function PrepButton({ children, onPress, variant = "primary", small = false }) {
  // pick the colors that match the requested variant
  const variantStyle = styles[variant];
  const variantTextStyle = styles[variant + "Text"];

  return (
    <View style={[styles.outerContainer, small && styles.smallOuter]}>
      <Pressable
        onPress={onPress}
        // darken the button slightly while the user is pressing it
        style={({ pressed }) => [
          styles.innerContainer,
          small && styles.smallInner,
          variantStyle,
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.buttonText, small && styles.smallText, variantTextStyle]}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
}

export default PrepButton;

const styles = StyleSheet.create({
  outerContainer: {
    marginVertical: 6,
    borderRadius: 4,
    overflow: "hidden",
  },
  smallOuter: {
    marginVertical: 0,
    marginLeft: 8,
  },
  innerContainer: {
    paddingVertical: 14,
    paddingHorizontal: 22,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 4,
  },
  smallInner: {
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  primary: {
    backgroundColor: Colors.teal,
    borderColor: Colors.teal,
  },
  secondary: {
    backgroundColor: "transparent",
    borderColor: Colors.charcoal,
  },
  danger: {
    backgroundColor: "transparent",
    borderColor: Colors.danger,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 17,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  smallText: {
    fontSize: 13,
    letterSpacing: 1,
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.charcoal,
  },
  dangerText: {
    color: Colors.danger,
  },
});
