import React from 'react';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {StyledComponent} from 'nativewind';
import {StyledProps} from 'nativewind/dist/styled';

type ButtonProps = StyledProps<Omit<TouchableOpacityProps, 'children'>> & {
  title: string;
};

export function Button({title, ...props}: ButtonProps) {
  return (
    <StyledComponent component={TouchableOpacity} {...props}>
      <TouchableOpacity
        className="h-14 items-center justify-center rounded-lg bg-green-500 dark:bg-green-500/75"
        activeOpacity={0.7}
        {...props}>
        <Text className="text-base font-medium text-white ">{title}</Text>
      </TouchableOpacity>
    </StyledComponent>
  );
}
