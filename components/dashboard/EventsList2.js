import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

// Animation Libraries
import { TabView } from "react-native-tab-view";
import Animated from "react-native-reanimated";

// Components
import ActivityCard from "../../components/dashboard/ActivityCard.js";

// Constants
import Sizes from "../../constants/Sizes";
import Colors from "../../constants/Colors";
import { normalize } from "../../utils/Normalize.js";

// Utils
import LocalStorage from "../../helpers/LocalStorage.js";
import { get_dashboard_events_lists } from "../../helpers/EventsHelper.js";

class UpcomingEventsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcomingEvents: props.upcomingEvents,
    };
  }

  render() {
    if (
      this.state.upcomingEvents === undefined ||
      this.state.upcomingEvents.length == 0
    ) {
      return (
        <View style={[styles.scene, { backgroundColor: "#FFFFFF" }]}>
          <View style={styles.infoContainer}>
            <Text style={styles.subText}>
              Oh no! You have no upcoming shifts.
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.props.navigation.navigate("Search")}
              >
                <Text style={styles.buttonText}>Sign Up for Shift</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={[styles.scene, { backgroundColor: "#FFFFFF" }]}>
          <ScrollView style={{ height: "100%" }}>
            {this.state.upcomingEvents.map((event) => {
              return (
                <ActivityCard
                  key={event.id}
                  event={event}
                  navigation={this.props.navigation}
                />
              );
            })}
          </ScrollView>
        </View>
      );
    }
  }
}

class AttendedEventsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attendedEvents: props.attendedEvents,
    };
  }

  render() {
    if (
      this.state.attendedEvents === undefined ||
      this.state.attendedEvents.length == 0
    ) {
      return (
        <View style={[styles.scene, { backgroundColor: "#FFFFFF" }]}>
          <View style={styles.infoContainer}>
            <Text style={styles.subText}>
              Did you know?{"\n"}
              RLC has rescued over 1.7 million{"\n"}
              pounds of food! Sign up for an event{"\n"}
              and be a part of the movement!
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.props.navigation.navigate("Search")}
              >
                <Text style={styles.buttonText}>Sign Up for Shift</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={[styles.scene, { backgroundColor: "#FFFFFF" }]}>
          <ScrollView style={{ height: "100%" }}>
            {this.state.attendedEvents.map((event) => {
              return (
                <ActivityCard
                  key={event.id}
                  event={event}
                  navigation={this.props.navigation}
                />
              );
            })}
          </ScrollView>
        </View>
      );
    }
  }
}

export default class EventsList2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      user_id: "",
      isFetching: true,
      attendedEvents: [],
      upcomingEvents: [],
      routes: [
        { key: "first", title: "Upcoming" },
        { key: "second", title: "Attended" },
      ],
    };
  }

  async componentDidMount() {
    try {
      let user = await LocalStorage.getNonNullItem("user");
      this.setState({ user_id: user.userId }, this._fetchEvents);
    } catch (err) {
      console.error(err);
      this.props.navigation.navigate("Login");
    }
  }

  // Fetch function
  _fetchEvents = async () => {
    let event_lists = await get_dashboard_events_lists(this.state.user_id);
    this.setState({
      //Finished fetching events, populate state.
      upcomingEvents: event_lists.upcoming,
      attendedEvents: event_lists.attended,
      isFetching: false,
    });
  };

  _handleIndexChange = (index) => this.setState({ index });

  _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map((inputIndex) =>
                  inputIndex === i ? 56 : 117
                ),
              })
            ),
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map((inputIndex) =>
                  inputIndex === i ? 165 : 117
                ),
              })
            ),
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map((inputIndex) =>
                  inputIndex === i ? 219 : 117
                ),
              })
            )
          );

          return (
            <TouchableOpacity
              key={i}
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}
            >
              <Animated.Text style={{ color }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = ({ route }) => {
    if (this.state.isFetching) {
      // return null; // Still fetching the events
      switch (route.key) {
        case "first":
          return (
            <View style={styles.infoContainer}>
              <ActivityIndicator size="large" color={Colors.mainBlue} />
            </View>
          );
        case "second":
          return (
            <View style={styles.infoContainer}>
              <ActivityIndicator size="large" color={Colors.mainBlue} />
            </View>
          );
        default:
          return null;
      }
    } else {
      switch (route.key) {
        case "first":
          return (
            <UpcomingEventsList
              upcomingEvents={this.state.upcomingEvents}
              navigation={this.props.navigation}
            />
          );
        case "second":
          return (
            <AttendedEventsList
              attendedEvents={this.state.attendedEvents}
              navigation={this.props.navigation}
            />
          );
        default:
          return null;
      }
    }
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
        initialLayout={{ height: 0, width: Sizes.width }}
      />
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#38A5DB",
    paddingVertical: "4%",
    borderRadius: 5,
    maxWidth: 250,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: "5.3%",
    height: "13.3%",
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "600",
    textTransform: "uppercase",
    paddingHorizontal: "13.3%",
  },
  scene: {
    flex: 1,
  },
  subText: {
    color: "#757575",
    fontStyle: "italic",

    textAlign: "center",
    justifyContent: "center",
    fontWeight: "normal",
    marginTop: "0%",

    opacity: 0.85,
    fontSize: normalize(16),
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: "auto",
  },
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: "2.6%",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: "2.6%",
  },
  heading: {
    color: "#000000",
    marginTop: "2.6%",
    marginBottom: "2.6%",
    marginLeft: "8%",
    textAlign: "left",
    fontWeight: "600",
    opacity: 0.7,
    fontSize: normalize(16),
  },
});
