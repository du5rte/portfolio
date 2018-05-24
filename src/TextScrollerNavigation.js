import React from 'react'
import { View, /*ScrollView,*/ Text, StyleSheet, TouchableOpacity } from 'react-native'

import { primaryColor } from './colors'

import { section_content } from './data'

const ScrollerNavigation = ({ scroll }) => (
  <View style={styles.nav}>
    {scroll.children.map((child, i) => {
      const opacityStyle = {
        opacity: 1 - child.positionRatioRemainer + 0.2
      }

      return (
        <TouchableOpacity
          key={i}
          onPress={() => scroll.scrollToByIndex(i)}
        >
          <Text style={[styles.navItem, opacityStyle]}>
            {section_content[i].uid}
          </Text>
        </TouchableOpacity>
      )
    })}
  </View>
)

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: '100%',
    // padding: '3vh',
    // display: 'flex',
    // boxSizing: 'border-box',
  },
  navItem: {
    fontSize: '2vh',
    // lineHeight: 1,
    fontWeight: '700',
    // backgroundColor: 'red',
    // padding: `${3/16}em ${6/16}em`,
    paddingTop: '3vh',
    paddingBottom: '3vh',
    paddingLeft: '1.5vh',
    paddingRight: '1.5vh',
    color: primaryColor,
  }
});

export default ScrollerNavigation
