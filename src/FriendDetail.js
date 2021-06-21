import React from 'react';
import PropTypes from 'prop-types';

import {Text, StyleSheet, View, Image, ScrollView} from 'react-native';
import { interpolate } from 'react-native-reanimated';

class FriendDetail extends React.Component {
  static propTypes = {
    friend: PropTypes.object.isRequired,
  }

  getDateString = (timeStamp) => {
    let t = new Date(timeStamp);
    let now = new Date();
    let difference = (now.getTime() - t.getTime()) / 1000;
    if (difference < 60) {
      return difference.toFixed(0) + " seconds ago";
    } else if (difference < 3600) {
      return (difference / 60).toFixed(0) + " minutes ago";
    } else if (difference < 86400) {
      return (difference / 3600).toFixed(0) + " hours ago";
    } else {
      return (difference / 86400).toFixed(0) + " days ago";
    }
    return t.toString();
  }

  render() {
    const { friend } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.userName}>{friend.user.name}</Text>
        <ScrollView>
          <View style={styles.hBox}>
            <Text style={styles.titleLabel}>Song Title:</Text>
            <Text numberOfLines={1} style={styles.nameLabel}>{friend.track.name}</Text>
          </View>
          <View style={styles.hBox}>
            <Text style={styles.titleLabel}>Artist Name:</Text>
            <Text numberOfLines={1} style={styles.nameLabel}>{friend.track.artist.name}</Text>
          </View>
          <View style={styles.hBox}>
            <Text style={styles.titleLabel}>Album Name:</Text>
            <Text numberOfLines={1} style={styles.nameLabel}>{friend.track.album.name}</Text>
          </View>
          <View style={styles.hBox}>
            <Text style={styles.titleLabel}>Context:</Text>
            <Text numberOfLines={1} style={styles.nameLabel}>{friend.track.context.name}</Text>
          </View>
          <Image source={{uri: friend.track.imageUrl}} style={{width: '100%', aspectRatio: 1, marginTop: 10}} resizeMode={'cover'}/>
          <Text style={styles.timeStamp}>{this.getDateString(friend.timestamp)}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
  },
  userName: {
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
    letterSpacing: 2,
    backgroundColor: '#9bbf9e',
  },
  titleLabel: {
    margin: 5,
    padding: 5,
    fontSize: 16,
  },
  nameLabel: {
    margin: 5,
    marginRight: 10,
    padding: 5,
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
  },
  hBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeStamp: {
    margin: 5,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: 'center',
    borderRadius: 15,
    backgroundColor: '#111111',
    color: '#FFFFFF',
  }
});

export default FriendDetail;