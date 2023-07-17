import React, {useState, useEffect} from 'react';
import {View, Image, Text, FlatList, Alert} from 'react-native';
import {Header} from '../components/Header';
import waterdrop from '../assets/waterdrop.png';
import {PlantType} from '../@types/PlantType';
import {removePlant, loadPlant} from '../lib/storage';
import {formatDistance} from 'date-fns';
import {pt} from 'date-fns/locale';
import {PlantCardSecundary} from '../components/PlantCardSecundary';
import {Load} from '../components/Load';

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantType[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  function handleRemove(plant: PlantType) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não 👎🏼',
        style: 'cancel',
      },
      {
        text: 'Sim 👍🏼',
        onPress: async () => {
          try {
            await removePlant(plant.id);

            setMyPlants(oldData =>
              oldData.filter(item => item.id !== plant.id),
            );
          } catch (error) {
            Alert.alert('Não foi possível remover! ❌');
          }
        },
      },
    ]);
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant();
      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        {locale: pt},
      );

      setNextWatered(
        `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}.`,
      );

      setMyPlants(plantsStoraged);
      setLoading(false);
    }

    loadStorageData();
  }, []);

  if (loading) {
    return <Load />;
  }

  return (
    <View className="flex-1 space-y-5 bg-white px-8  pt-12 dark:bg-slate-900">
      <Header />

      <View className="flex-row items-center justify-between rounded-3xl bg-blue-blue_light p-5 dark:bg-blue-950">
        <Image className="h-16 w-16" source={waterdrop} />

        <Text className="ml-5 flex-1 text-left font-body text-blue-blue dark:text-blue-blue_light">
          {nextWatered}
        </Text>
      </View>
      <Text className="font-heading text-2xl text-gray-500 dark:text-gray-shape">
        Próximas regadas
      </Text>
      <View className="w-full flex-1">
        <FlatList
          data={myPlants}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <PlantCardSecundary
              data={item}
              handleRemove={() => {
                handleRemove(item);
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
