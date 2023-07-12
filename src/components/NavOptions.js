import { Text, View, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { FlatList, } from 'react-native-gesture-handler';
import { ArrowSmallRightIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../../slices/navSlice';
 
const data = [
  {
    id: '123',
    title: 'Get a ride',
    image: 'https://links.papareact.com/3pn',
    screen: 'MapScreen',
  },
  {
    id: '456',
    title: 'Order food',
    image: 'https://links.papareact.com/28w',
    screen: 'EatScreen', // change in future...
  }
]

const NavOptions = () => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList 
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity 
          style={tw`bg-gray-200 m-2 p-4 w-50 h-auto items-center justify-center`}
          onPress={() => navigation.navigate(item.screen)}
          disabled={!origin}
        >
          <View style={[tw`items-center w-full`, !origin ? tw`opacity-20` : tw`opacity-100`]}>
            <Image
              style={{ width: width*0.3, height: height*.15, resizeMode: 'contain' }}
              source={{ uri: item.image }}
            />
            <Text style={tw`w-full mt-3 text-lg text-black font-semibold`}>{item.title}</Text>
            <View style={tw`w-full h-auto`}>
              <View style={[tw`bg-black items-center justify-center p-4 rounded-full mt-4`, { width: 20, height: 20 }]}>
                <ArrowSmallRightIcon size={20} color={'white'} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default NavOptions