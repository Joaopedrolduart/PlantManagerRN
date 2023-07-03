import React, {useEffect, useState} from 'react';
import {FlatList, View, Text} from 'react-native';
import {Header} from '../components/Header';
import {EnvironmentButton} from '../components/EnviromentButton';
import api from '../services/api';
import {PlantCardPrimary} from '../components/PlantCardPrimary';

interface EnviromentProps {
  key: string;
  title: string;
}

interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
}

export function PlantSelector() {
  const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);

  useEffect(() => {
    async function fetchEnviroment() {
      const result = await api
        .get<EnviromentProps[]>('plants_environments?_sort=title&_order=asc')
        .then(r => r)
        .catch(e => console.debug(e));

      if (!result) {
        return;
      }

      setEnviroments([
        {
          key: 'all',
          title: 'todos',
        },
        ...result.data,
      ]);
    }

    fetchEnviroment();
  }, []);

  useEffect(() => {
    async function fetchPlants() {
      const {data} = await api.get('plants?_sort=name&_order=asc');
      setPlants(data);
    }

    fetchPlants();
  }, []);

  return (
    <View className="flex-1 space-y-8 ">
      <View className="mt-6 space-y-6 px-8">
        <Header title="João" subtitle="Olá," />

        <Text className="font-heading text-base text-gray-500 dark:text-white">
          Em qual ambiente
        </Text>
        <Text className="font-body text-base text-gray-500 dark:text-white">
          você quer colocar sua planta?
        </Text>
      </View>
      <View style={{paddingLeft: 25}}>
        <FlatList
          data={enviroments}
          renderItem={({item}) => (
            <EnvironmentButton
              title={item.title}
              state={(item && 'default') || undefined}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View className="flex-1 justify-center px-8">
        <FlatList
          data={plants}
          renderItem={({item}) => <PlantCardPrimary data={item} />}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </View>
    </View>
  );
}
