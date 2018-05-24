import React, { Component } from 'react'

function arrayByCount(count) {
  let result = []

  for (let i = 0; i < count; i++) {
    result.push(i)
  }

  return result
}

function bounceInterpolation(i) {
  return i > 1/2 ? Math.abs(i - 1) : i
}

// function invertedBounceInterpolation(i) {
//   return i > 0.5 ? i - 0.5 : Math.abs(i - 0.5)
// }

export default class DotsScrollerNavigation extends Component {
  static defaultProps = {
    count: 4,
    progress: 0.25,
    vertical: false,
    border: 5,
    backgroundColor: "hsla(0, 0%, 0%, 0)",
    dotsColor: "hsla(0, 0%, 0%, 0.33)",
    dotColor: "hsla(0, 0%, 0%, 1)",
  };

  render() {
    const {
      progress,
      count,
      vertical,
      backgroundColor,
      dotsColor,
      dotColor,
      border,
      ...props
    } = this.props

    const circleDiameter = 15
    const circleRadius = circleDiameter / 2

    const directionLength = border + ( circleDiameter * ((count * 2) - 1) ) + border
    const acrossLength = border + circleDiameter + border

    const width = !vertical ? directionLength : acrossLength
    const height = vertical ? directionLength : acrossLength

    const borderRadius = acrossLength / 2

    const spacing = circleDiameter * 2

    function cx(i) {
      if (!vertical) {
        return ( border + circleRadius ) + ( spacing * i )
      } else {
        return width / 2
      }
    }

    function cy(i) {
      if (vertical) {
        return ( border + circleRadius ) + ( spacing * i )
      } else {
        return height / 2
      }
    }

    // const progressIndex = Math.floor(progress)

    // const invert = progress < 0

    const stepInterpolation = progress % 1
    const progressIndex = Math.floor(progress)

    const progressExtension = spacing * bounceInterpolation(stepInterpolation)

    const progressWidth = circleDiameter + (!vertical ? progressExtension : 0)
    const progressHeight = circleDiameter + (vertical ? progressExtension : 0)

    const noProgress = border

    const progressOffset = border
      + spacing * progressIndex
      + spacing * stepInterpolation
      - ( stepInterpolation < 0.5 ? progressExtension : 0)

    const progressX = !vertical ? progressOffset : noProgress
    const progressY = vertical ? progressOffset : noProgress

    return (
      <svg viewBox={`0 0 ${width} ${height}`} {...props}>
        <rect
          x="0" y="0"
          width={width} height={height}
          rx={borderRadius} ry={borderRadius}
          fill={backgroundColor}
        />
        {
          arrayByCount(count).map((i) =>
            <circle
              key={i}
              cx={cx(i)}
              cy={cy(i)}
              r={circleRadius}
              fill={dotsColor}
            />
          )
        }
        <rect
          x={progressX} y={progressY}
          width={progressWidth} height={progressHeight}
          // width={circleDiameter} height={circleDiameter}
          rx={circleRadius} ry={circleRadius}
          fill={dotColor}
        />
      </svg>

    )
  }
}
