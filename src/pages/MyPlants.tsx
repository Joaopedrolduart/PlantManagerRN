import React, {useState, useEffect} from 'react';
import {View, Image, Text, FlatList} from 'react-native';
import {Header} from '../components/Header';
import waterdrop from '../assets/waterdrop.png';
import {PlantType} from '../@types/PlantType';
import {loadPlant} from '../lib/storage';
import {formatDistance} from 'date-fns';
import {pt} from 'date-fns/locale';
import {PlantCardSecundary} from '../components/PlantCardSecundary';

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantType[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant();
      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        {locale: pt},
      );

      setNextWatered(
        `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime} horas.`,
      );

      setMyPlants(plantsStoraged);
      setLoading(false);
    }

    loadStorageData();
  }, []);

  return (
    <View className="flex-1 space-y-5 px-8 pt-12">
      <Header />

      <View className="flex-row items-center justify-between rounded-3xl bg-blue-blue_light p-5">
        <Image className="h-16 w-16" source={waterdrop} />

        <Text className="ml-5 flex-1 text-left font-body text-blue-blue">
          {nextWatered}
        </Text>
      </View>
      <Text className="font-heading text-2xl text-gray-500">
        Próximas regadas
      </Text>
      <View className="w-full flex-1">
        <FlatList
          data={myPlants}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => <PlantCardSecundary data={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
