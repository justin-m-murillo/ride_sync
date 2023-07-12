import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react'
import tw from 'twrnc';
import Map from '../components/Map';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 relative`}>
      <View
        style={tw`flex-1 bg-gray-100 absolute top-8 left-8 z-50 p-3 rounded-full`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <FAIcon name='bars' type='font-awesome' color='black' size={24} />
        </TouchableOpacity>
      </View>
      <View style={tw`h-1/2`}>
        <Map />
      </View>

      <View style={tw`h-1/2`}>
        <Stack.Navigator
          initialRouteName='NavigateCard'
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen 
            name='NavigateCard'
            children={(props) => <NavigateCard {...props} />}
          />
          <Stack.Screen 
            name='RideOptionsCard'
            children={(props) => <RideOptionsCard {...props} />}
          />
        </Stack.Navigator>
      </View>
    </View>
  )
}

export default MapScreen