import React from "react";
import { Platform, StyleSheet } from "react-native";

// Navigation
import { createAppContainer } from "react-navigation";
import {
  createStackNavigator,
  TransitionPresets
} from "react-navigation-stack";

// Screens
import LogoScreen from "../screens/LogoScreen.js";
import LoginScreen from "../screens/login/LoginScreen.js";
import SignupScreen from "../screens/signup/SignUpScreen.js";
import ProfileScreen from "../screens/profile/Profile.js";
import DashboardScreen from "../screens/dash/Dashboard.js";
import DashboardScreen2 from "../screens/dash/Dashboard2.js";
import ShiftScreen from "../screens/shift/ShiftScreen.js";
import OnboardingScreen from "../screens/OnboardingScreen.js";

const MainNavigator = createStackNavigator(
  {
    Logo: { screen: LogoScreen },
    Login: { screen: LoginScreen },
    Signup: { screen: SignupScreen },
    Dash: { screen: DashboardScreen2 },
    Shift: { screen: ShiftScreen },
    Onboarding: { screen: OnboardingScreen }
  },
  {
    headerMode: "none",
    initialRouteName: "Shift",
    defaultNavigationOptions: {
      ...TransitionPresets.FadeFromBottomAndroid,
      cardOverlayEnabled: true,
      gestureEnabled: true
    }
  }
);

const App = createAppContainer(MainNavigator);

export default App;
