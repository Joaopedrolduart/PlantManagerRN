import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

import {SvgFromUri} from 'react-native-svg';

interface PlantProps extends TouchableOpacityProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
}

export const PlantCardSecundary = ({data, ...rest}: PlantProps) => {
  return (
    <TouchableOpacity
      className="my-2 w-full flex-row rounded-3xl bg-gray-shape px-5 py-6"
      {...rest}>
      <SvgFromUri uri={data.photo} width={50} height={50} />
      <Text className="ml-2 mt-4 flex-1 font-heading text-base text-gray-500">
        {data.name}
      </Text>

      <View>
        <Text className="mt-2 font-body text-xs text-gray-400"> Regar às </Text>
        <Text className="ml-4 mt-2 font-heading text-sm"> {data.hour} </Text>
      </View>
    </TouchableOpacity>
  );
};
