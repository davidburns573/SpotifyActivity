import React from 'react';
import PropTypes from 'prop-types';

import {Text, StyleSheet, TouchableOpacity} from 'react-native';

class FriendTile extends React.Component {
  static propTypes = {
    friend: PropTypes.object.isRequired,
    onItemPress: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
  }

  render() {
    const { friend, onItemPress, index } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={() => onItemPress(index)}>
        <Text style={styles.userName}>{friend.user.name}</Text>
        <Text numberOfLines={1} style={styles.songName}>{friend.track.name}</Text>
        <Text numberOfLines={1} style={styles.albumName}>{friend.track.artist.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    paddingRight: 2,
    paddingLeft: 2,
    backgroundColor: '#CDCDCD',
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  userName: {
    margin: 5,
    backgroundColor: '#9bbf9e',
    padding: 5,
    borderRadius: 5,

  },
  songName: {
    margin: 5,
    padding: 5,
    textAlign: 'center',

  },
  albumName: {
    margin: 5,
    padding: 5,
    flex: 1,
    textAlign: 'right',
  },
});

export default FriendTile;