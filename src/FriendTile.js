import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

class FriendTile extends React.Component {
  static propTypes = {
    friend: PropTypes.object.isRequired,
  }

  render() {
    const { friend } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.textField}>{friend.user.name}</Text>
        <Text style={styles.textField}>{friend.track.name}</Text>
        <Text style={styles.textField}>{friend.track.artist.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    backgroundColor: '#CDCDCD',
    borderRadius: 5,
    padding: 4,
  },
  textField: {
    margin: 5,
  },
});

export default FriendTile;