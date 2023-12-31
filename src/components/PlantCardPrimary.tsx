import React from 'react';
import {Text} from 'react-native';
import {
  RectButtonProps,
  RectButton as RNRectButton,
} from 'react-native-gesture-handler';

import {SvgFromUri} from 'react-native-svg';
import {tw} from '../lib/tailwind';
import {styled} from 'nativewind';

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  };
}

const RectButton = styled(RNRectButton);

export const PlantCardPrimary = ({data, ...rest}: PlantProps) => {
  return (
    <RectButton
      style={tw`rounded-3xl`}
      className="m-2 flex-1 items-center space-y-2 bg-gray-100 py-8  dark:bg-green-500/40"
      {...rest}>
      <SvgFromUri uri={data.photo} width={70} height={70} />
      <Text className="font-heading text-green-600"> {data.name} </Text>
    </RectButton>
  );
};
