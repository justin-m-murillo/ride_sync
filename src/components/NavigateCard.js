import { StyleSheet, View, Text } from 'react-native'
import React, { useRef } from 'react'
import tw from 'twrnc'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import IOIcon from 'react-native-vector-icons/Ionicons';
import NavFavorites from './NavFavorites';

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const inputRef = useRef(null);
  const handleFavoritesSubmit = (input) => {
    inputRef.current?.setAddressText(input);
    inputRef.current?.focus();
  }

  return (
    <View style={tw`bg-white flex-1`}>
      <View style={tw`flex-row p-5 justify-center`}>
        <View style={tw`flex-1`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={24} color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={tw`flex-2`}>
          <Text style={tw`text-center text-base sm:text-xl text-black`}>Good morning, Justin</Text>
        </View>
        <View style={tw`flex-1`} />{/* Space filler */}
      </View>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete 
            ref={inputRef}
            placeholder='Where to?'
            styles={toInputBoxStyles}
            fetchDetails={true}
            enablePoweredByContainer={false}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(setDestination({
                location: details.geometry.location,
                description: data.description,
              }));
              navigation.navigate('RideOptionsCard');
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
          />
        </View>
        <NavFavorites handleFavoritesSubmit={handleFavoritesSubmit} />
      </View>

      <View 
        style={tw`flex-row mx-4 mt-auto mb-4  bg-white justify-evenly py-2 border-t border-gray-200`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('RideOptionsCard')}
          style={tw`flex flex-row w-24 bg-black px-4 py-3 rounded-full content-between`}
        >
            <View style={tw`flex-1`}>
              <FAIcon name='car' type='font-awesome' color='white' size={20} />
            </View>
            <Text style={tw`text-center text-white`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row w-24 bg-gray-200 px-4 py-3 rounded-full content-between`}
        >
            <View style={tw`flex-1`}>
              <IOIcon name='fast-food-outline' type='ionicon' color='black' size={20} />
            </View>
            <Text style={tw`text-center text-black`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#dddddf',
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
})