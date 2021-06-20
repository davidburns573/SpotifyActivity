import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  View,
  FlatList,
  Linking,
  TextInput,
  div,
} from 'react-native';
import api_calls from './src/api_calls';
import FriendTile from './src/FriendTile';
import FriendDetail from './src/FriendDetail';
import 'react-native-gesture-handler';

class App extends React.Component{
  state = {
    friends: [],
    tokenIsValid: false,
    tokenIsSaved: false,
    text: "",
    friendDetailView: false,
    currentFriendIndex: -1,
  }

  getToken = async () => {
    Linking.openURL("https://open.spotify.com/get_access_token?reason=transport&productType=web_player");
    //await api_calls.fetchToken();
    let tokenIsValid = true;
    this.setState({tokenIsValid});
  }

  getActivity = async () => {
    let friends = await api_calls.fetchActivity(this.state.text);
    if (friends == null) {
      this.setState({tokenIsValid: false, tokenIsSaved: false});
    } else {
      this.setState({tokenIsValid: true, friends, tokenIsSaved: true});
    }
  }

  setCurrentFriend = (friendIndex) => {
    this.setState({currentFriendIndex: friendIndex, friendDetailView: true});
  }

  unsetCurrentFriend = () => {
    this.setState({currentFriendIndex: -1, friendDetailView: false});
  }

  _keyExtractor = (item, index) => index;

  render() {
      return (
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>
            SPOTIVITY
          </Text>
          {!this.state.friendDetailView && <View style={styles.container}>
            {this.state.friends.length > 0 && <FlatList 
              data={this.state.friends} 
              renderItem={({item, index}) => {return (<FriendTile onItemPress={this.setCurrentFriend} friend={item} index={index}/>)}} 
              keyExtractor={this._keyExtractor}/>}
            {this.state.tokenIsValid && this.state.friends.length == 0 && 
              <Text style={styles.sectionDescription}> We didn't find any activity...</Text>}
            {this.state.tokenIsValid && !this.state.tokenIsSaved && <TextInput         
              style={styles.textInput}
              placeholder="Place Token Here!"
              onChangeText={text => this.setState({text})}/>}
            {!this.state.tokenIsValid &&
              <TouchableOpacity style={styles.buttonP} onPress={this.getToken}>
                <Text style={styles.buttonText}>Get Token</Text>  
              </TouchableOpacity>}
            {this.state.tokenIsValid &&  
              <TouchableOpacity style={styles.buttonP} onPress={this.getActivity}>
                <Text style={styles.buttonText}>Get Activity</Text>
              </TouchableOpacity>}
          </View>}
          {this.state.friendDetailView && <View style={styles.container}>
            <FriendDetail friend={this.state.friends[this.state.currentFriendIndex]}/>
            <TouchableOpacity style={styles.buttonP} onPress={this.unsetCurrentFriend}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>}
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
    marginBottom: 0,
    padding: 18,
    backgroundColor: '#36bf41',
    color: '#000000',
    position: 'absolute',
    bottom: 0,
    width: '100%'
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
    color: '#FFFFFF',
    width: '100%',
    position: 'absolute',
    bottom: 50,
  },
  buttonText: {
    textAlign: 'center',
    letterSpacing: 2,
  },
});

export default App;
