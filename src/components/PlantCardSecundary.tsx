import React from 'react';
import {Text, View} from 'react-native';

import {SvgFromUri} from 'react-native-svg';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated from 'react-native-reanimated';
import colors from 'tailwindcss/colors';
import Feather from 'react-native-vector-icons/Feather';
import {
  RectButton as RNRectButton,
  RectButtonProps,
} from 'react-native-gesture-handler';
import {tw} from '../lib/tailwind';
import {styled} from 'nativewind/dist/styled';

const RectButton = styled(RNRectButton);

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  handleRemove: () => void;
}

export const PlantCardSecundary = ({
  data,
  handleRemove,
  ...rest
}: PlantProps) => {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton
              style={tw` rounded-2xl`}
              className="relative right-5 mt-5 h-20 w-24 items-center justify-center  bg-red-500 pl-4 dark:bg-red-700"
              onPress={handleRemove}>
              <Feather name="trash" size={32} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}>
      <RectButton
        style={tw`rounded-3xl`}
        className="my-2 w-full flex-row bg-gray-shape px-5  py-6 dark:bg-green-500/40"
        {...rest}>
        <SvgFromUri uri={data.photo} width={50} height={50} />
        <Text className="ml-2 mt-4 flex-1 font-heading text-base text-gray-500 dark:text-green-600">
          {data.name}
        </Text>

        <View>
          <Text className="mt-2 font-body text-xs text-gray-400 dark:text-green-600">
            Regar às
          </Text>
          <Text className="ml-4 mt-2 font-heading text-sm text-gray-500 dark:text-green-600">
            {data.hour}
          </Text>
        </View>
      </RectButton>
    </Swipeable>
  );
};
