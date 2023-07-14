import React from 'react';
import {Text} from 'react-native';
import {StyledComponent} from 'nativewind';
import clsx from 'clsx';
import {Style} from 'nativewind/dist/style-sheet/runtime';
import {RectButtonProps, RectButton} from 'react-native-gesture-handler';
import {tw} from '../lib/tailwind';

type States = 'active' | 'default';

type Variants = {
  [key in States]: Style | string;
};

type Props = RectButtonProps & {
  title: string;
  state?: States;
};

const buttonVariants: Variants = {
  active: clsx`bg-green-100 dark:bg-green-500/40`,
  default: clsx`bg-gray-100 dark:bg-gray-200/10`,
};

const textVariants: Variants = {
  active: clsx`font-semibold text-green-700 dark:text-green-200`,
  default: clsx`text-gray-600 dark:text-white`,
};

export function EnvironmentButton({title, state = 'default', ...props}: Props) {
  return (
    <StyledComponent
      component={RectButton}
      style={tw`rounded-xl`}
      className={clsx(
        'mx-1.5 h-10 w-20 items-center justify-center',
        buttonVariants[state],
      )}
      {...props}>
      <Text className={clsx('capitalize', textVariants[state])}>{title}</Text>
    </StyledComponent>
  );
}
