import { View, Image, useWindowDimensions, TextInputProps } from 'react-native'
import React, { useRef } from 'react';
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../../slices/navSlice';
import NavFavorites from '../components/NavFavorites';

const HomeScreen = () => {
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const handleFavoritesSubmit = (input) => {
    inputRef.current?.setAddressText(input);
    inputRef.current?.focus();
  }

  return (
    <View style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image 
          style={{ 
            width: width*.25,
            height: height*.15,
            resizeMode: 'contain',
          }}
          source={{
            uri: 'https://links.papareact.com/gzs',
          }}
        />
        
        <GooglePlacesAutocomplete
          ref={inputRef}
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            }
          }}
          onPress={(data, details = null) => {
            dispatch(setOrigin({
              location: details.geometry.location,
              description: data.description,
            }));

            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          returnKeyType={'search'}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
          placeholder='Where from?' 
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={400}
        />

        <NavOptions />
        <NavFavorites handleFavoritesSubmit={handleFavoritesSubmit} />
      </View>
    </View>
  )
}

export default HomeScreen