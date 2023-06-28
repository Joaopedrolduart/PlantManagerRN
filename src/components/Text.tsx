import clsx from 'clsx';
import {styled} from 'nativewind';
import {Text as ReactNativeText} from 'react-native';

export const Text = styled(
  ReactNativeText,
  clsx`font-body text-xl text-gray-500 dark:text-white`,
);
