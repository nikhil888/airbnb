import React from "react";
import { View, FlatList } from "react-native";
import Post from '../../components/Post';
import places from '../../../assets/data/feed';

const SearchResultScreen = (props) => {
    return (
        <View>
           <FlatList
           data={places}
           renderItem={({item}) => <Post post={item} />}
           />
        </View>
    );
};

export default SearchResultScreen;