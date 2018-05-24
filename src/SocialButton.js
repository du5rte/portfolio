import React, { Component } from 'react'
import { TouchableWithoutFeedback, Animated, Linking } from 'react-native'
import Media from 'react-media'

import { secondaryColor, primaryBackground, primaryColor } from './colors'

// https://webpack.js.org/concepts/loaders/#inline
// import extractProps from 'react-native-svg/lib/extract/extractProps';
// import extractBrush from 'react-native-svg/lib/extract/extractBrush';

class SocialButton extends Component {
  static defaultProps = {
    height: '10vh'
  }

  constructor(props) {
    super(props)

    this.animateState = new Animated.Value(0)

    this.animateState.addListener(() => {
      const backgroundColor = this.animateState.interpolate({
        inputRange: [0, 1],
        outputRange: [secondaryColor, props.social.color],
      })

      const foregroundColor = this.animateState.interpolate({
        inputRange: [0, 1],
        outputRange: [primaryColor, primaryBackground],
      })

      const scale = this.animateState.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.1],
      })

      if (this._rect) {
        this._rect.setAttribute('fill', backgroundColor.__getValue())
      }

      if (this._path) {
        this._path.setAttribute('fill', foregroundColor.__getValue())
      }

      if (this._group) {
        this._group.setAttribute('transform', `scale(${scale.__getValue()})`)
      }
    })
  }

  animate(options) {
    Animated.spring(
      this.animateState,
      {

        ...options
      }
    ).start()
  }

  animateActive() {
    this.animate({ toValue: 1 })
  }

  animateInactive() {
    this.animate({ toValue: 0 })
  }

  render() {
    const { social, ...props } = this.props

    const { title, path, url } = social

    const backgroundColor = secondaryColor
    const foregroundColor = primaryColor

    const border = 24
    const height = 96 + border
    const width = 96 + border
    const x = width / -2
    const y = height / -2

    const viewBox = `${x} ${y} ${width} ${height}`
    const pathTransform = `translate(${x + border / 2}, ${y + border / 2})`

    return (
      <svg
        viewBox={viewBox}
        overflow="visible"
        style={styles.container}
        title={title}
        {...props}
      >
        <TouchableWithoutFeedback
          onPress={() => Linking.openURL(url)}
          onPressIn={() => this.animateActive()}
          onPressOut={() => this.animateInactive()}
          onMouseEnter={() => this.animateActive()}
          onMouseLeave={() => this.animateInactive()}
        >
          <g
            ref={ref => this._group = ref}
            cursor="pointer"
          >
            <rect
              ref={ref => this._rect = ref}
              fill={backgroundColor}
              x={x} y={y}
              width={width} height={height}
              rx={width / 2} ry={height / 2}
            />
            <path
              ref={ref => this._path = ref}
              fill={foregroundColor}
              d={path}
              transform={pathTransform}
            />
          </g>
        </TouchableWithoutFeedback>
      </svg>
    )
  }
}

const styles = {
  container: {
    margin: 2
  }
}

const ResponsiveSocialButton = (props) => (
  <Media query={{ maxWidth: 480 }}>
    {matches =>
      matches ? (
        <SocialButton height="15vw" {...props} />
      ) : (
        <SocialButton height="10vh" {...props} />
      )
    }
  </Media>
)

export default ResponsiveSocialButton
