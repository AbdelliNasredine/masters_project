import React, {useState, useMemo, useEffect} from 'react';
import {View, ActivityIndicator, Text, StyleSheet, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initialLoginState, loginReducer} from './reducers/loginReducer';
import {authenticate} from './services/AuthServices';

import RootStackScreen from './screens/RootStackScreen';
import MainNavigationScreen from './screens/MainNavigationScreen';

function App() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  // services
  const authContext = useMemo(
    () => ({
      login: async (phoneNumber, password) => {
        // stub
      },
      logout: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      register: () => {
        // setUserToken('nasro');
        // setIsLoading(false);
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={true}
          size="large"
          style={{opacity: 1}}
          color="#1A6CC7"
        />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={{authContext, loginState, dispatch}}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <MainNavigationScreen />
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
