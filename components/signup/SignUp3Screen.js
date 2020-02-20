import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { frontendError } from '../../lib/alerts';
import StepsTimeline from '../../components/StepsTimeline';

export default class SignUp3Screen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      user: {},
    }
  }

  //Setup User Payload
  setupParams = ()  => {
    this.setState({ user: this.props.user });
    this.state.user.email = this.state.email;
    this.state.user.password = this.state.password;
    this.state.user.password_confirmation = this.state.confirmPassword;
  }

  /*Checks conditions before transitioning to next screen:
   * 1. all fields are filled out and not empty.
   * 2. password and confirmPassword fields match.
   * 3. passwords have at least one number and letter.
   * 4. email contains an "@" character.
   */
  checkValidNext = () => {
    if (this.state.email == "" || this.state.password == "" || this.state.confirmPassword == "") {
      frontendError("Please fill out all fields.")
    } else if (this.state.password != this.state.confirmPassword) {
      frontendError("Passwords must match.")
    } else if (!this.state.password.match(/\d/) || !this.state.password.match(/[a-z]/i)) {
      frontendError("Passwords must have a number and a letter.")
    } else if (!this.state.email.match(/@/)) {
      frontendError("Invalid Email.")
    } else {
      this.setupParams()
      this.props.setScreenForward(this.state.user)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StepsTimeline currentPosition={2}/>
        <ScrollView
          contentContainerStyle={styles.contentContainer}>
            <Text style={styles.heading}>Great! Now let's create your account. Your email will be your username.</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.subHeading}>Email</Text>
              <TextInput style={styles.input} placeholder={'email@email.com'} autoCapitalize={'none'} onChangeText={text => this.setState({email: text})}></TextInput>
              <Text style={styles.subHeading}>Password</Text>
              <TextInput style={styles.input} secureTextEntry={true} placeholder={'Please include one letter and one number'} onChangeText={text => this.setState({password: text})}></TextInput>
              <Text style={styles.subHeading}>Confirm Password</Text>
              <TextInput style={styles.input} secureTextEntry={true} placeholder={'Please re-enter your password'} onChangeText={text => this.setState({confirmPassword: text})}></TextInput>
            </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={this.checkValidNext}>
                  <Text style={styles.buttonText}>NEXT</Text>
              </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
  button: {
    backgroundColor: '#38A5DB',
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 5,
    position: 'absolute',
    bottom: 0,
    width: 320
  }, 
  buttonContainer: {
    alignItems: 'center',
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 50
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: "uppercase"
  },
  input: {
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#3b3b3b',
    color: '#000000',
  },
  inputContainer: {
    paddingTop: 25,
  },
  subHeading: {
    color: '#000000',
    marginTop: 10,
    textAlign: 'left',
    fontWeight: '600',
    opacity: 0.9,
    fontSize: 14
  },
  contentContainer: {
    padding: 25,
    paddingTop: 30,
  },
  heading: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
  },
});