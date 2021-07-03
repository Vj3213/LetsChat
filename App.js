import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Home from './screens/Home';
import Chat from './screens/Chat';
import store from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: '#2541B2'
              },
              headerTintColor: 'rgba(255, 255, 255, 0.7)'
            }}
          >
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: 'Lets Chat' }}
            />
            <Stack.Screen
              name="Chat"
              component={Chat}
              options={{ title: '' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App;