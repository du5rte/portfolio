import React, { Component } from 'react'
import Svg, {
  Rect,
  Ellipse,
  Path,
  G,
  Defs,
  ClipPath
} from 'svgs'

import PathData from './path-data'

function ratio(val, max) {
  return val / max
}

function centerRatio(val, max) {
  return ratio(val, max) - 1/2
}

const COLOR_HAIR_LIGHT = '#655546'
const COLOR_HAIR_MEDIUM = '#3D302C'
const COLOR_HAIR_DARK = '#261815'

const COLOR_SKIN_LIGHT = '#DDB684'
const COLOR_SKIN_MEDIUM = '#CBA576'
const COLOR_SKIN_DARK = '#997A53'

export default class Avatar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      moveX: 0,
      moveY: 0
    }
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseMove = (e) => {
    const moveX = centerRatio(e.clientX, window.innerWidth) * 2
    const moveY = centerRatio(e.clientY, window.innerHeight) * 2

    this.setState({
      moveX,
      moveY
    })
  }


  render() {
    const { moveX, moveY } = this.state

    const HEAR_LEFT_PATH = PathData()
      .moveTo(270.2, 457.1)
      .curve(-1, 12.7, -1.5, 25.6, -1.5, 38.6)
      .smoothcurve(1.5, 43.3, 4.3, 64)


    const HEAR_RIGHT_PATH = PathData()
      .moveTo(689.8, 457.1)
      .curve(1, 12.7, 1.5, 25.6, 1.5, 38.6)
      .smoothcurve(-1.5, 43.3, -4.3, 64)

    const HEAR_TRANSFORM = `translate(${moveX * 20}, ${moveY * -20})`

    const HEAD_PATH = PathData()
      .moveTo(480, 178.4)
      .curve(-116.7, 0, -211.4, 94.6, -211.4, 211.4)
      .vline(118.7)
      .hline(.2)
      .curve(4.4, 169.4, 97.3, 304.7, 211.2, 304.7)
      .smoothcurve(206.8, -135.3, 211.2, -304.7)
      .hline(.2)
      .vlineTo(389.7)
      .curve(0, -116.7, -94.6, -211.3, -211.4, -211.3)
      .closepath()

    const TRANSFORM_HEAD = `translate(${moveX * 30}, ${moveY * 10})`
    const TRANSFORN_HEAD_FOR_HAIR = `translate(${moveX * -30}, ${moveY * -30})`

    const HAIR_PATH = "M623.7 143.5l27.5 266c1.3 12.1 6.4 23.5 14.6 32.5 0 0 7.5 7.3 16.5 18.1 7.2 8.6 18.6 22.1 18.3 48.4-1.1 84.2-20.3 120-39.8 151.3-25.3 40.5-67.5 59.5-93.5 3.2-8.3-18-26.5-30.5-47.6-30.5H480h-39.7c-21.1 0-39.3 12.5-47.6 30.5-25.9 56.3-68.2 37.4-93.5-3.2-19.5-31.3-38.7-67.1-39.8-151.3-.3-26.2 11.1-39.7 18.3-48.4 9-10.8 16.5-18.1 16.5-18.1 8.2-9 13.4-20.4 14.6-32.5l27.5-266H199.4v730.3h561.2V143.5H623.7zm-86.3 541.3c0 9.6-7.9 17.5-17.5 17.5h-80c-9.6 0-17.5-7.9-17.5-17.5s7.9-17.5 17.5-17.5h80c9.7 0 17.5 7.9 17.5 17.5z"

    const TRANSFORM_FACE = `translate(${moveX * 60}, ${moveY * 40})`

    // move with face
    const HAIR_QUIFF_PATH = PathData()
       .moveTo(438.3, 198.9)
      .curve(-70.4, 0, -127.5, 57.1, -127.5, 127.5)
      .curve(0, 44.2, 22.5, 83.2, 56.7, 106.1)
      .curve(6.6, -33, 35.8, -57.9, 70.8, -57.9)
      .hline(175.7 + Math.abs(moveX) * -15)
      .curve(70.4, 0, 127.5, -57.1, 127.5, -127.5)
      .curve(0, -53.1, -32.5, -98.6, -78.6, -117.8)
      .curve(2, 5.5, 3.1, 11.5, 3.1, 17.7)
      .curve(0, 28.7, -23.3, 52, -52, 52)
      .hline(-175.7 + Math.abs(moveX) * -15)
      .closepath()

    const HAIR_QUIFF_TRANSFORM = `translate(${moveX * 60}, ${moveY * 60})`

    const NECK_SHADOW_PATH = PathData()
      .move(320.2, 632.4)
      .vline(133.1)
      .curve(27.8, 47.3, 114.6, 114.4, 159.6, 114.5)
      .curve(45, 0, 132.7, -66.8, 160, -115)
      .vline(-132.6)
      .hline(-319.6)
      .closepath()

    const NECK_SKIN_PATH = PathData()
      .moveTo(320.2, 632.4)
      .vline(133.1)
      .curve({
        x1: 27.7 + (moveX * 10), y1: 38.9,
        x2: 114.6 + (moveX * 10), y2: 90.3,
        x: 159.6 + (moveX * 10), y: 90.3
      })
      .curve({
        x1: 45 + (moveX * 10), y1: 0,
        x2: 132.7 - (moveX * 10), y2: -51.1,
        x: 160 - (moveX * 10), y: -90.8
      })
      .vline(-132.6)
      .hline(-319.6)
      .closepath()

    const HAIRLINE_DIFF = 80

    const HAIRLINE_PATH = PathData()
      .move(199.4, 146.9)
      .vline(226.6 - (moveY * HAIRLINE_DIFF / 2))
      .curve({
        x1: 67.9, y1: 0 + (moveY * HAIRLINE_DIFF * 2/3),
        x2: 168.4, y2: 0 + (moveY * HAIRLINE_DIFF),
        x: 280.6, y: 0 + (moveY * HAIRLINE_DIFF)
      })
      .smoothcurve({
        x2: 212.6, y2: 0 - (moveY * HAIRLINE_DIFF * 1/3),
        x: 280.6, y: 0 - (moveY * HAIRLINE_DIFF)
      })
      .vline(-226.6 + (moveY * HAIRLINE_DIFF / 2))
      .closepath()

    const TRANSFORM_HAIRLINE = `translate(${moveX * 60}, ${moveY * 20})`

    return (
      <Svg viewBox="0 0 960 960">
        <Defs>
          <ClipPath id="HeadClipPath">
            <Path
              d={HEAD_PATH}
              transform={TRANSFORM_HEAD}
            />
          </ClipPath>
          <ClipPath id="HeadForHairClipPath">
            <Path
              d={HEAD_PATH}
              transform={TRANSFORN_HEAD_FOR_HAIR}
            />
          </ClipPath>
          <ClipPath id="HairClipPath">
            <Path
              clipPath="url(#HeadForHairClipPath)"
              d={HAIR_PATH}
              transform={TRANSFORM_FACE}
            />
          </ClipPath>
        </Defs>

        <Path
          id="neckBackGround"
          fill={COLOR_SKIN_DARK}
          d={NECK_SHADOW_PATH}
        />

        <Path
          id="neckForeGround"
          fill={COLOR_SKIN_MEDIUM}
          d={NECK_SKIN_PATH}
        />

        <Path
          id="leftHear"
          fill="none"
          stroke={COLOR_SKIN_LIGHT}
          strokeWidth="36"
          strokeLinecap="round"
          transform={HEAR_TRANSFORM}
          d={HEAR_LEFT_PATH}
        />

        <Path
          id="rightHear"
          fill="none"
          stroke={COLOR_SKIN_LIGHT}
          strokeWidth="36"
          strokeLinecap="round"
          transform={HEAR_TRANSFORM}
          d={HEAR_RIGHT_PATH}
        />

        <G id="face" clipPath="url(#HeadClipPath)">
          <Rect
            fill={COLOR_SKIN_LIGHT}
            x="199.4" y="143.5"
            width="561.2" height="730.3"
            transform={TRANSFORM_FACE}
          />
        </G>

        <G id="hair" clipPath="url(#HairClipPath)">
          <Rect
            fill={COLOR_HAIR_MEDIUM}
            x="199.4" y="143.5"
            width="561.2" height="730.3"
            transform={TRANSFORM_FACE}
          />
          <Ellipse
            fill={COLOR_HAIR_LIGHT}
            cx="480" cy="508.6"
            rx="280.6" ry="123.8"
            transform={TRANSFORM_FACE}
          />
        </G>

        <G id="hairline" clipPath="url(#HeadClipPath)">
          <Path
            fill={COLOR_HAIR_DARK}
            d={HAIRLINE_PATH}
            transform={TRANSFORM_HAIRLINE}
          />
        </G>

        <Path
          id="hairQuiff"
          fill={COLOR_HAIR_MEDIUM}
          d={HAIR_QUIFF_PATH}
          transform={HAIR_QUIFF_TRANSFORM}
        />
      </Svg>
    )
  }
}
