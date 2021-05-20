import React, {useState, useMemo, useEffect} from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './components/context';

import RootStackScreen from './screens/RootStackScreen';
import MainNavigationScreen from './screens/MainNavigationScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(
    () => ({
      login: () => {
        setUserToken('nasro');
        setIsLoading(false);
      },
      logout: () => {
        setUserToken(null);
        setIsLoading(false);
      },
      register: () => {
        setUserToken('nasro');
        setIsLoading(false);
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
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
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken !== null ? <MainNavigationScreen /> : <RootStackScreen />}
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
