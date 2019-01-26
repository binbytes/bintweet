import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  ImageBackground
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { apply } from '../../theme/styles'

class sample extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.imageContainer}>
          <ImageBackground
            source={{
              uri: 'https://homepages.cae.wisc.edu/~ece533/images/boat.png'
            }}
            style={styles.image}
            blurRadius={this.state.isDownloading ? 1 : 0}
          />
        </TouchableHighlight>
        <View style={styles.bottomPanel}>
          <View style={styles.downloadContainer}>
            <View style={{ flexDirection: 'row', marginTop: 48 }}>
              <View style={styles.favoriteContainer}>
                <Icon
                  name={'cloud-download'}
                  size={20}
                  color={'#fff'}
                  style={styles.visibleIcon}
                />
                <Text style={styles.favoriteText}>50</Text>
              </View>
              <View style={styles.favoriteContainer}>
                <Icon
                  name={'visibility'}
                  size={20}
                  color={'#fff'}
                  style={styles.visibleIcon}
                />
                <Text style={styles.favoriteText}>50</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 32
              }}
            >
              <TouchableOpacity>
                <Icon
                  name={'image'}
                  size={20}
                  style={styles.wallpaperIcon}
                  color={'#fff'}
                />
              </TouchableOpacity>
              <TouchableOpacity ref={instance => (this._download = instance)}>
                <Icon
                  name={'file-download'}
                  size={32}
                  style={styles.downloadIcon}
                  color={'#fff'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.content}>
            <Text style={styles.userName}>ABC</Text>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <TouchableOpacity>
                <Text style={styles.description}>http://google/com</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.report}
                onPress={() => this.reportRef.openDialog()}
              >
                <Icon name={'report'} size={20} color={'#fff'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc'
  },
  imageContainer: {
    position: 'absolute',
    width: width,
    height: height
  },
  image: {
    flex: 1
  },
  downloadView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333cc'
  },
  linearGradient: {
    flex: 0.15
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    width: width
  },
  downloadContainer: {
    marginTop: -32,
    zIndex: 5,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  downloadIcon: {
    // marginRight: 46,
    backgroundColor: '#5696ff',
    padding: 12,
    borderColor: '#000',
    borderRadius: 50
  },
  wallpaperIcon: {
    marginRight: 16,
    backgroundColor: '#c41313',
    padding: 12,
    borderColor: '#c41313',
    borderRadius: 50
  },
  favoriteContainer: {
    marginLeft: 16,
    flexDirection: 'row'
  },
  visibleIcon: {
    marginRight: 8
  },
  favoriteText: {
    color: '#fff'
  },
  content: {
    margin: 16
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  description: {
    color: '#5696ff',
    textDecorationLine: 'underline'
  },
  report: {
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 0.5
  }
})

export default sample
