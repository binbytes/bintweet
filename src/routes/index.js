import { createStackNavigator, createAppContainer } from 'react-navigation'

import Splash from '../screens/splash'
import Main from './main'

const AppNavigator = createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      header: null
    }
  },
  Main: {
    screen: Main,
    navigationOptions: {
      header: null
    }
  }
})

export default createAppContainer(AppNavigator)
