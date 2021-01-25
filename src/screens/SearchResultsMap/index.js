import React, {useState, useEffect, useRef} from "react";
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import places from '../../../assets/data/feed';
import CustomMarker from '../../components/CustomMarker';
import PostcarouselItem from '../../components/PostcarouselItem';
import { FlatList } from 'react-native-gesture-handler';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

const SearchResultsMap = (props) => {
  const [selectedPlaceId,setSelectedPlaceId] = useState(null);
  const flatList = useRef();
  const map = useRef();

  const viewConfig = useRef({itemVisiblePercentThreshold: 70})
  const onViewChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      const selectedPlace = viewableItems[0].item;
      setSelectedPlaceId(selectedPlace.id)
    }
  })

  const width = useWindowDimensions().width;
  useEffect( ()=> {
    if(!selectedPlaceId || !flatList){
      return;
    }
    const index = places.findIndex(place => place.id === selectedPlaceId)
    flatList.current.scrollToIndex({index})

    const selectedPlace = places[index];
    const region = {
      latitude: selectedPlace.coordinate.latitude,
      longitude:selectedPlace.coordinate.longitude,
      latitudeDelta:0.8,
      longitudeDelta:0.8,
    }
    map.current.animateToRegion(region);
    },[selectedPlaceId])

  return (
    <View style={{width: '100%', height: '100%'}}>
    <MapView
      ref={map}
      style={{width: '100%', height: '100%'}}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 28.3279822,
        longitude: -16.5124847,
        latitudeDelta: 0.8,
        longitudeDelta: 0.8,
      }}
    >
   {places.map(place => (
     <CustomMarker
       coordinate={place.coordinate}
       price={place.newPrice}
       isSelected={place.id === selectedPlaceId}
       onPress={() => setSelectedPlaceId(place.id)}

       />)
   )}
     </MapView>

     <View style={{position:'absolute',bottom:40}}>
       <FlatList
       ref={flatList}
       data={places}
       renderItem={({item}) => <PostcarouselItem post={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width - 60}
        snapToAlignment={"center"}
        decelerationRate={"fast"}
        viewabilityConfig={viewConfig.current}
        onViewableItemsChanged={onViewChanged.current} 
        />
      
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default SearchResultsMap;