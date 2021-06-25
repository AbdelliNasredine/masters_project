import React, {useMemo, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initialLoginState, loginReducer} from './reducers/loginReducer';

import RootStackScreen from './screens/RootStackScreen';
import MainNavigationScreen from './screens/MainNavigationScreen';

import Loader from './components/Loader';

function App() {
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );
  const authContext = useMemo(
    () => ({
      login: async (phoneNumber, password) => {},
      logout: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      register: () => {},
    }),
    [],
  );

  const onMount = async () => {
    let userToken = null;
    try {
      userToken = await AsyncStorage.getItem('userToken');
    } catch (e) {
      console.log(e);
    }
    dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
  };

  useEffect(() => {
    onMount();
  }, []);

  if (loginState.isLoading) {
    return <Loader />;
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

export default App;
