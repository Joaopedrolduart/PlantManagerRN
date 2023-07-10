import React, {useState} from 'react';
import {
  Alert,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';

import {SvgFromUri} from 'react-native-svg';
import waterdrop from '../assets/waterdrop.png';
import {Button} from '../components/Button';
import {useRoute} from '@react-navigation/native';
import {PlantType} from '../@types/PlantType';
import {savePlant} from '../lib/storage';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {format, isBefore} from 'date-fns';

export interface PlantSaveParams {
  plant: PlantType;
}

export function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');
  const route = useRoute();
  const {plant} = route.params as PlantSaveParams;

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
    } catch {
      Alert.alert('❌ Não foi possível salvar ❌');
    }
  }

  return (
    <View className="flex-1 justify-between bg-gray-shape">
      <View className="flex-1 items-center justify-center px-8">
        <SvgFromUri uri={plant.photo} height={150} width={150} />
        <Text className="font-heading text-2xl dark:text-white">
          {plant.name}
        </Text>
        <Text className="mt-4 text-center font-body ">{plant.about}</Text>
      </View>

      <View className="bg-white px-5 pb-5 pt-5">
        <View className="relative bottom-20 flex-row items-center justify-between rounded-3xl bg-blue-blue_light p-5">
          <Image source={waterdrop} className="h-14 w-14" />
          <Text className="ml-5 flex-1 text-center font-body text-base text-blue-blue">
            {plant.water_tips}
          </Text>
        </View>

        <Text className="text-center font-heading text-xs text-gray-400">
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
            <Text className="font-heading text-2xl underline">
              {`Horário -  ${format(selectedDateTime, 'HH:mm')}`}
            </Text>
          </TouchableOpacity>
        )}

        <Button title="Cadastrar planta" onPress={handleSave} />
      </View>
    </View>
  );
}
