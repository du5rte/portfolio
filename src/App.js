import React, { Component } from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'


import { social_medias, section_content } from './data'

import Avatar from './Avatar'
import SocialButton from './SocialButton'
import Button from './Button'

export default class App extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        {
          section_content.map((section, i, sections) =>
            <View style={styles.page}>
              {i === 0 ?
                <View style={styles.header}>
                  <Avatar />
                  <Text style={styles.title}>{section.title}</Text>
                </View>
              :
                <View style={styles.main}>
                  <Text style={styles.title}>{section.title}</Text>

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
                  onPress={() => console.log(section.button)}
                />
              </View>
            </View>
          )
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    // height: '100vh',
    // width: '100vw'
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    padding: '5vw',
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: `5vh`,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: `0.5em`,
    color: '#525252',
  },
  header: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
  },
  main: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    marginTop: '20%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: '20%',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {

  }
})
