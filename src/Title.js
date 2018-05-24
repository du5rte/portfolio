import React from 'react'
import { Text, StyleSheet } from 'react-native'
import Media from 'react-media'

import { primaryColor } from './colors'

const Title = ({ style, children, ...props }) => (
  <Text
    selectable={false}
    style={[styles.title, style]}
    {...props}
  >
    {children}
  </Text>
)

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Montserrat',
    fontSize: `5vh`,
    fontWeight: '700',
    textAlign: 'center',
    color: primaryColor,
  },
  adjust: {
    fontSize: `8vw`,
  },
  fixed: {
    fontSize: `5vh`,
  }
});

const ResponsiveTitle = (props) => (
  <Media query={{ maxWidth: 480 }}>
    {matches =>
      matches ? (
        <Title style={styles.adjust} {...props} />
      ) : (
        <Title style={styles.fixed} {...props} />
      )
    }
  </Media>
)

export default ResponsiveTitle
