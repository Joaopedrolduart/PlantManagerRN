import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

interface PlantProps extends TouchableOpacity {
  data: {
    name: string;
    photo: string;
  };
}

export const PlantCardPrimary = ({data, ...rest}: PlantProps) => {
  return (
    <TouchableOpacity
      className="m-10 max-w-3xl flex-1 items-center rounded-lg bg-inherit py-10"
      {...rest}>
      <Text className="my-16 bg-green-700 font-heading"> {data.name} </Text>
    </TouchableOpacity>
  );
};
