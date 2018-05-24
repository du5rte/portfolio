import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { primaryColor } from './colors'

export default class Button extends Component {
  render() {
    const { title, ...props } = this.props

    return (
      <TouchableOpacity {...props}>
        <View style={styles.container}>
          <Text selectable={false} style={styles.text}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
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
    borderColor: primaryColor,
    borderRadius: 9999,
    cursor: 'pointer'
  },
  text: {
    fontFamily: 'Montserrat',
    fontSize: '2.25vh',
    fontWeight: '700',
    textAlign: 'center',
    color: primaryColor
  }
})
