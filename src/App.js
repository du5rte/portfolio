import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Avatar from './Avatar'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Avatar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    height: '100vh',
    width: '100vw'
  }
})
