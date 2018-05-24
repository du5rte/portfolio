import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Media from "react-media"

import TextScrollerNavigation from './TextScrollerNavigation'
import DotsScrollerNavigation from './DotsScrollerNavigation'

import { section_content } from './data'

const ResponsiveScrollerNavigation = ({ scroll }) => (
  <Media query={{ maxWidth: 480 }}>
    {matches =>
      matches ? (
        <DotsScrollerNavigation
          vertical
          width="5vw"
          style={styles.dots}
          count={scroll.children.length}
          progress={scroll.positionRelativeRatio}
        />
      ) : (
        <TextScrollerNavigation scroll={scroll} />
      )
    }
  </Media>
)

const styles = {
  dots: {
    position: 'absolute',
    top: '50%',
    left: 0,
    transform: 'translateY(-50%)',
    padding: '2.5vw',
    opacity: 0.3,
    pointerEvents: 'none'
  }
}

export default ResponsiveScrollerNavigation
