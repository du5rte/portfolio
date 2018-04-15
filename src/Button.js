import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { transparent, white, charcoal } from './colors'

export default class Button extends Component {
  render() {
    const { title, ...props } = this.props

    return (
        <View style={styles.container}>
          <Text style={styles.text}>
            {title}
          </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: charcoal,
    borderRadius: 9999
  },
  text: {
    fontFamily: 'Montserrat',
    fontSize: '2.25vh',
    fontWeight: '700',
    textAlign: 'center',
    color: charcoal
  }
})
