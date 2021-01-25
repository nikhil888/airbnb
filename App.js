
import React from 'react';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import SearchResultsMap from './src/screens/SearchResultsMap';
 import SearchResultScreen from './src/screens/SearchResults';
 import Geo from './src/screens/Geo';
// import Post from './src/components/Post';
import feed from './assets/data/feed';
import { StatusBar, } from 'react-native';
import Router from './src/navigation/Router';

// import Amplify from 'aws-amplify';
// import config from './aws-exports';
// import { withAuthenticator } from 'aws-amplify-react-native'

// Amplify.configure(config);



const post1 = feed[0];

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
    
    {/* <HomeScreen/> */}
    {/* <Post post = {post1}/> */}
    {/* <SearchResultsMap/> */}
    <Geo/>
    {/* <Router/> */}
   
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;