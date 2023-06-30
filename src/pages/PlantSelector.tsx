import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Header} from '../components/Header';
import {Text} from '../components/Text';
import {EnvironmentButton} from '../components/EnviromentButton';
import api from '../services/api';

interface EnviromentProps {
  key: string;
  title: string;
}

export function PlantSelector() {
  const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);

  useEffect(() => {
    async function fetchEnviroment() {
      const result = await api
        .get<EnviromentProps[]>('plants_environments')
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

  return (
    <View className="flex-1 space-y-6">
      <View className="mt-6 space-y-6 px-4">
        <Header title="João" subtitle="Olá," />

        <View>
          <Text>Em qual ambiente</Text>
          <Text>você quer colocar sua planta?</Text>
        </View>
      </View>
      <FlatList
        data={enviroments}
        renderItem={({item}) => (
          <EnvironmentButton
            title={item.title}
            state={(item && 'active') || undefined}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
