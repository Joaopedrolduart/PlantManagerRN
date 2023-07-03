import React from 'react';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';

import {SvgFromUri} from 'react-native-svg';

interface PlantProps extends TouchableOpacityProps {
  data: {
    name: string;
    photo: string;
  };
}

export const PlantCardPrimary = ({data, ...rest}: PlantProps) => {
  return (
    <TouchableOpacity
      className="flex-1 items-center rounded-3xl bg-gray-100 py-8"
      {...rest}>
      <SvgFromUri uri={data.photo} width={70} height={70} />
      <Text className="font-heading text-green-700"> {data.name} </Text>
    </TouchableOpacity>
  );
};
