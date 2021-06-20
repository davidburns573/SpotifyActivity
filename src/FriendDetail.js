import React from 'react';
import PropTypes from 'prop-types';

import {Text, StyleSheet, TouchableOpacity} from 'react-native';

class FriendDetail extends React.Component {
  static propTypes = {
    friend: PropTypes.object.isRequired,
  }

  render() {
    const { friend } = this.props;
    return (
      <Text>THIS WORKS</Text>
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

export default FriendDetail;