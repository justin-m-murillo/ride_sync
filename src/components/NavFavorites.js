import { View, Text } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';
import { HomeIcon, BriefcaseIcon } from 'react-native-heroicons/solid';
import tw from 'twrnc';

const data = [
  {
    id: '123',
    icon: <HomeIcon size={32} color={'white'} />,
    location: 'Home',
    destination: 'Grimmer Blvd, Fremont, CA, USA',
  },
  {
    id: '456',
    icon: <BriefcaseIcon size={32} color={'white'} />,
    location: 'Work',
    destination: '909 Kiely Blvd, Santa Clara, CA, USA',
  }
]

const NavFavorites = ({ handleFavoritesSubmit }) => {
  return (
    <FlatList 
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={[tw`bg-gray-300`, { height: 0.5 }]} />}
      renderItem={({item : {location, destination, icon}}) => (
        <TouchableOpacity
          onPress={() => handleFavoritesSubmit(destination)}
          style={tw`flex-row items-center p-5`}
        >
          <View style={tw`bg-gray-300 p-2 items-center rounded-full`}>
            {icon}
          </View>
          <View style={tw`mx-4 justify-center`}>
            <Text style={tw`text-lg text-black font-semibold`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default NavFavorites