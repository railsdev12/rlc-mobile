import React, { Component } from "../../node_modules/react";
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    ScrollView,
    SafeAreaView,
} from "react-native";
import ActivityCard from "../dashboard/ActivityCard.js";
import DatePicker from "react-native-datepicker";
import { getRequest } from "../../lib/requests.js";

import Styles from "../../constants/Styles.js";
import Sizes from "../../constants/Sizes.js";
import { normalize } from "../../utils/Normalize.js";
import Colors from "../../constants/Colors";

import ShiftType from "../../constants/ShiftType.js";

export default class SuggestedEventsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            selectedEventsInDay: [],
            locations: {},
        };
    }

    componentDidMount() {
        locations = {};
        for (let i = 0; i < this.props.preferredLocations.length; i++) {
            locationId = this.props.preferredLocations[i]["id"];
            locationName = this.props.preferredLocations[i]["name"];
            locations[locationId] = locationName;
        }
        this.setState(
            {
                locations: locations,
            },
            () => {
                this.processEventData();
            }
        );
    }

    processEventData() {
        getRequest(
            `api/get_events/${this.state.date.toString()}`,
            (responseData) => {
                selectedEventsInDay = [];
                for (i = 0; i < responseData.length; i++) {
                    currentEvent = {};
                    eventDetails = {};
                    currentEvent["shiftType"] = ShiftType.searched;
                    eventDetails["name"] = responseData[i]["title"];
                    eventDetails["spotsOpen"] = responseData[i]["slot"];
                    eventDetails["weight"] = responseData[i]["weight"];
                    eventDetails["numPickups"] = responseData[i]["numPickups"];
                    startingTime = new Date(responseData[i]["starting_time"]);
                    endingTime = new Date(responseData[i]["ending_time"]);
                    eventDetails["start_time"] =
                        startingTime.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                        }) +
                        " to " +
                        endingTime.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                        });
                    if (responseData[i]["location_id"] !== null) {
                        locationIdString = responseData[i]["location_id"].toString();
                        if (this.state.locations[locationIdString] != null) {
                            currentEvent["address"] = this.state.locations[locationIdString];
                            currentEvent["details"] = eventDetails;
                            selectedEventsInDay.push(currentEvent);
                        }
                    }
                }
                this.setState(
                    {
                        selectedEventsInDay: selectedEventsInDay,
                    },
                    () => {
                        this.render();
                    }
                );
            },
            (error) => {
                console.log(error);
            }
        );
    }

    renderNewEvents(chosenDate) {
        getRequest(
            `api/get_events/${chosenDate.toString()}`,
            (responseData) => {
                selectedEventsInDay = [];
                for (i = 0; i < responseData.length; i++) {
                    currentEvent = {};
                    eventDetails = {};
                    currentEvent["shiftType"] = ShiftType.searched;
                    eventDetails["name"] = responseData[i]["title"];
                    eventDetails["spotsOpen"] = responseData[i]["slot"];
                    eventDetails["weight"] = responseData[i]["pound"] + " lbs";
                    eventDetails["numPickups"] = responseData[i]["numPickups"];
                    startingTime = new Date(responseData[i]["starting_time"]);
                    endingTime = new Date(responseData[i]["ending_time"]);
                    eventDetails["start_time"] =
                        startingTime.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                        }) +
                        " to " +
                        endingTime.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                        });
                    if (responseData[i]["location_id"] != null) {
                        locationIdString = responseData[i]["location_id"].toString();
                        if (this.state.locations[locationIdString] != null) {
                            currentEvent["address"] = this.state.locations[locationIdString];
                            currentEvent["details"] = eventDetails;
                            selectedEventsInDay.push(currentEvent);
                        }
                    }
                }
                this.setState(
                    {
                        selectedEventsInDay: selectedEventsInDay,
                    },
                    () => {
                        this.render();
                    }
                );
            },
            (error) => {
                console.log(error);
            }
        );
    }

    render() {
        if (this.state.selectedEventsInDay.length == 0) {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Text style={Styles.title}> Suggested Events </Text>
                        <View
                            style={{
                                boderBottomColor: "black",
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                width: "100%",
                            }}
                        ></View>
                        <DatePicker
                            style={{ marginTop: "2%", marginBottom: "2%" }}
                            date={this.state.date}
                            mode="date"
                            onDateChange={(date) =>
                                this.setState(
                                    {
                                        date: date,
                                    },
                                    () => {
                                        this.renderNewEvents(date);
                                    }
                                )
                            }
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                btnTextConfirm: {
                                    color: Colors.mainBlue,
                                },
                            }}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.subText}>
                            There are no events on this date.
            </Text>
                    </View>
                </SafeAreaView>
            );
        } else {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Text style={Styles.title}> Suggested Events </Text>
                        <View
                            style={{
                                boderBottomColor: "black",
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                width: "100%",
                            }}
                        ></View>
                        <DatePicker
                            style={{
                                marginTop: "2%",
                                marginBottom: "2%",
                            }}
                            date={this.state.date}
                            mode="date"
                            onDateChange={(date) =>
                                this.setState(
                                    {
                                        date: date,
                                    },
                                    () => {
                                        this.renderNewEvents(date);
                                    }
                                )
                            }
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                btnTextConfirm: {
                                    color: Colors.mainBlue,
                                },
                            }}
                        />
                    </View>
                    <FlatList
                        data={this.state.selectedEventsInDay}
                        renderItem={({ item }) => (
                            <ActivityCard event={item} navigation={this.props.navigation} />
                        )}
                        keyExtractor={(item) => item["id"]}
                    />
                </SafeAreaView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Sizes.width,
    },
    header: {
        alignItems: "center",
    },
    headerText: {
        textAlign: "center",
        color: "#000000",
        fontWeight: "600",
        textTransform: "uppercase",
    },
    datePicker: {
        marginBottom: "3%",
        marginTop: "1%",
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white,
        margin: "auto",
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
});
