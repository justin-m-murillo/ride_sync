import { View, Text, Platform, Pressable } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const EatScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View style={{ paddingTop: Platform.OS === 'ios' ? insets.top : 0 }}>
      <Text>EatScreen IN DEVELOPMENT</Text>
      <Pressable
        onPress={() => navigation.goBack()}
      >
        <Text style={tw`m-4 text-xl text-black font-semibold underline`}>GO BACK</Text>
      </Pressable>
    </View>
  )
}

export default EatScreen;