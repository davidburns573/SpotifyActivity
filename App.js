import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Button,
  View,
  FlatList,
  Linking,
  TextInput,
} from 'react-native';
import api_calls from './src/api_calls';
import FriendTile from './src/FriendTile'

class App extends React.Component{
  state = {
    friends: [],
    tokenIsValid: false,
    text: "",
  }

  getToken = async () => {
    Linking.openURL("https://open.spotify.com/get_access_token?reason=transport&productType=web_player");
    // await api_calls.fetchToken();
    // let tokenIsValid = true;
    // this.setState({tokenIsValid});
  }

  getActivity = async () => {
    let friends = await api_calls.fetchActivity(this.state.text);
    if (friends == null) {
      let tokenIsValid = false;
      this.setState({tokenIsValid});
    } else {
      let tokenIsValid = true;
      this.setState({tokenIsValid});
      this.setState({friends});
    }
  }

  _keyExtractor = (item, index) => index;

  render() { 
      return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>
          SPOTIFY INFO
        </Text>
        <View style={styles.buttonP}>
          <Button onPress={this.getToken} title="Get Token" disabled={this.state.tokenIsValid}/>
        </View>
        <View style={styles.buttonP}>  
          <Button onPress={this.getActivity} title="Get Activity"/>
        </View>        
        <TextInput         
          style={styles.textInput}
          placeholder="Place Token Here!"
          onChangeText={text => this.setState({text})}/>
        {this.state.friends.length > 0 && <FlatList 
          data={this.state.friends} 
          renderItem={({item}) => {return (<FriendTile friend={item}/>)}} 
          keyExtractor={this._keyExtractor}/>}
        {this.state.friends.length == 0 && 
          <Text style={styles.sectionDescription}> We didn't find any activity...</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    letterSpacing: 3,
  },
  buttonP: {
    marginBottom: 10,
  },
  sectionDescription: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  highlight: {
    fontWeight: '700',
  },
  textInput: {
    backgroundColor: '#000000',
    marginBottom: 5,
  }
});

export default App;
