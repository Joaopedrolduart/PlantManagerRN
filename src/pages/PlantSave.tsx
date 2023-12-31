import React, {useState} from 'react';
import {
  Alert,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import {SvgFromUri} from 'react-native-svg';
import waterdrop from '../assets/waterdrop.png';
import {Button} from '../components/Button';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {PlantType} from '../@types/PlantType';
import {savePlant} from '../lib/storage';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {format, isBefore} from 'date-fns';
import {StackRoutesList} from '../Routes/stack.routes';

export interface PlantSaveParams {
  plant: PlantType;
}

export function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');
  const route = useRoute<RouteProp<StackRoutesList, 'PlantSave'>>();
  const navigator = useNavigation<NavigationProp<StackRoutesList>>();
  const {plant} = route.params;

  function handleChangeTime(
    event: DateTimePickerEvent,
    dateTime: Date | undefined,
  ) {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma hora no futuro! ⏰ ');
    }

    if (dateTime) {
      setSelectedDateTime(dateTime);
    }
  }

  function handleOpenDateTimePicker() {
    setShowDatePicker(oldstate => !oldstate);
  }

  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });

      navigator.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle:
          'Fique tranquilo que sempre vamos lembrar você de cuidar das suas plantinhas com muito cuidado.',
        buttonTitle: 'Continuar   ➡',
        icon: 'hug',
        nextScreen: 'MyPlants',
      });
    } catch {
      Alert.alert('❌ Não foi possível salvar ❌');
    }
  }

  return (
    <SafeAreaView className="flex-1 justify-between bg-gray-shape dark:bg-slate-900">
      <View className="flex-1 items-center justify-center px-8">
        <SvgFromUri uri={plant.photo} height={150} width={150} />
        <Text className="font-heading text-2xl text-gray-500 dark:text-green-600">
          {plant.name}
        </Text>
        <Text className="mt-4 text-center font-body text-gray-500  dark:text-gray-shape">
          {plant.about}
        </Text>
      </View>

      <View className="bg-white px-5 pb-5 pt-5 dark:bg-gray-800">
        <View className="relative bottom-20 flex-row items-center justify-between rounded-3xl bg-blue-blue_light p-5 dark:bg-blue-950">
          <Image source={waterdrop} className="h-14 w-14" />
          <Text className="ml-5 flex-1 text-center font-body text-base text-blue-blue dark:text-blue-blue_light">
            {plant.water_tips}
          </Text>
        </View>

        <Text className="text-center font-heading text-xs text-gray-400 dark:text-gray-shape">
          Escolha o melhor horário para ser lembrado:
        </Text>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDateTime}
            mode="time"
            display="spinner"
            onChange={handleChangeTime}
          />
        )}

        {Platform.OS === 'android' && (
          <TouchableOpacity
            className="w-full items-center py-10"
            onPress={handleOpenDateTimePicker}>
            <Text className="font-heading text-2xl text-gray-500  underline dark:text-green-600">
              {`Horário -  ${format(selectedDateTime, 'HH:mm')}`}
            </Text>
          </TouchableOpacity>
        )}
        <Button title="Cadastrar planta" onPress={handleSave} />
      </View>
    </SafeAreaView>
  );
}
