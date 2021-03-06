import React, { Component } from "react";
import { StyleSheet, View, Icon, Text, Image } from "react-native";
import { Avatar } from "react-native-elements";

// Constants
import Sizes from "../../constants/Sizes.js";

// Utils
import { getInitials } from "../../utils/Initials.js";
import LocalStorage from "../../helpers/LocalStorage.js";

export default class ProfileHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfAttendedEvents: "-",
    };
  }

  componentDidMount() {
    this.retrieveAttendedEvents();
  }

  async retrieveAttendedEvents() {
    try {
      let attendedEvents = await LocalStorage.getItem("attended_events");
      this.setState(
        { numOfAttendedEvents: attendedEvents.length },
        this.render
      );
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    var fullName =
      this.props.getUserAttribute("firstname") +
      " " +
      this.props.getUserAttribute("lastname");

    return (
      <View>
        <View style={styles.profileContainer}>
          <Avatar rounded title={getInitials(fullName)} size="large" />

          {this.props.isFetching ? (
            <Text></Text>
          ) : (
            <Text style={styles.title}>{fullName}</Text>
          )}

          <Text style={styles.subtext}>Member since September 2019</Text>
        </View>

        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeHeading}>
              {this.state.numOfAttendedEvents}
            </Text>
            <Text style={styles.badgeText}>Shifts Completed</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeHeading}>
              {this.state.numOfAttendedEvents}
            </Text>
            <Text style={styles.badgeText}>Missions Completed</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeHeading}>
              {this.state.numOfAttendedEvents == "-"
                ? "-"
                : this.state.numOfAttendedEvents * 17}
            </Text>
            <Text style={styles.badgeText}>Pounds Rescued</Text>
          </View>
        </View>

        <View
          style={{
            boderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: "100%",
          }}
        ></View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "flex-start",
    marginTop: 25,
    maxHeight: "75%",
  },
  profilePic: {
    width: "37%",
    height: Sizes.height * 0.155,
  },
  badgeContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    marginBottom: 25,
    paddingHorizontal: "7%",
    alignItems: "flex-start",
  },
  badge: {
    width: "33%",
  },
  badgeHeading: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20,
  },
  badgeText: {
    textAlign: "center",
    fontSize: 12,
    color: "#9e9e9e",
  },
  title: {
    color: "#000000",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
    opacity: 0.9,
    fontSize: 22,
  },
  subtext: {
    color: "#000000",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "normal",
    opacity: 0.85,
    fontSize: 16,
  },
});
