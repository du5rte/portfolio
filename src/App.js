import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Scroller } from 'react-skroll'

import Avatar from './Avatar'

import Title from './Title'
import Button from './Button'
import SocialButton from './SocialButton'
import ScrollerNavigation from './ScrollerNavigation'

import { primaryColor } from './colors'

import { social_medias, section_content } from './data'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Scroller
          scrollRef={ref => this.scroll = ref}
          autoScroll={true}
          autoFrame={true}
          ScrollerNavigation={ScrollerNavigation}
        >
          {
            section_content.map((section, i, sections) =>
              <View key={i} style={styles.page}>
                {i !== 0 &&
                  <View style={styles.header} />
                }

                {i === 0 ?
                  <View style={styles.hero}>
                    <Avatar />
                    <Title>
                      {section.title}
                    </Title>
                  </View>
                :
                  <View style={styles.main}>
                    <Title>
                      {section.title}
                    </Title>

                    {i === sections.length - 1 &&
                      <View style={styles.icons}>
                        {
                          social_medias.map(social =>
                            <SocialButton key={social.id} social={social} />
                          )
                        }
                      </View>
                    }
                  </View>
                }
                <View style={styles.footer}>
                  <Button
                    title={section.button}
                    onPress={() => this.scroll.scrollToByIndex(i === sections.length - 1 ? 0 : i + 1)}
                  />
                </View>
              </View>
            )
          }
        </Scroller>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFill,
    position: 'fixed',
    height: '100%',
    width: '100%',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: '5vw',
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: `5vh`,
    fontWeight: '700',
    textAlign: 'center',
    color: primaryColor,
  },
  hero: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
  },
  main: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '20%',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
