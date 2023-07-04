import React, {useEffect, useState} from 'react';
import {FlatList, View, Text, ActivityIndicator} from 'react-native';
import {Header} from '../components/Header';
import {EnvironmentButton} from '../components/EnviromentButton';
import api from '../services/api';
import {PlantCardPrimary} from '../components/PlantCardPrimary';
import {tw} from '../lib/tailwind';
import {Load} from '../components/Load';
import {Colors} from 'react-native/Libraries/NewAppScreen';

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
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState('all');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadigMore, setLoadingMore] = useState(false);

  function handleEnviromentSelected(environment: string) {
    setEnviromentSelected(environment);

    if (environment === 'all') {
      return setFilteredPlants(plants);
    }

    const filtered = plants.filter(plant =>
      plant.environments.includes(environment),
    );

    setFilteredPlants(filtered);
  }

  async function fetchPlants() {
    const {data} = await api.get(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=6`,
    );
    if (!data) {
      return setLoading(true);
    }
    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data]);
      setFilteredPlants(oldValue => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) {
      return;
    }

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

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
    fetchPlants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Load />;
  }

  return (
    <View className="flex-1 space-y-8 ">
      <View className="mt-6 space-y-6 px-8">
        <Header title="João" subtitle="Olá," />

        <View>
          <Text className="font-heading text-base text-gray-500 dark:text-white">
            Em qual ambiente
          </Text>
          <Text className="font-body text-base text-gray-500 dark:text-white">
            você quer colocar sua planta?
          </Text>
        </View>
      </View>
      <View>
        <FlatList
          data={enviroments}
          renderItem={({item}) => (
            <EnvironmentButton
              title={item.title}
              state={item.key === enviromentSelected ? 'active' : 'default'}
              onPress={() => handleEnviromentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`pl-8 justify-center`}
        />
      </View>

      <View className="flex-1 justify-center px-8">
        <FlatList
          data={filteredPlants}
          renderItem={({item}) => <PlantCardPrimary data={item} />}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({distanceFromEnd}) => handleFetchMore(distanceFromEnd)}
          ListFooterComponent={
            loadigMore ? <ActivityIndicator color={Colors.green} /> : <></>
          }
        />
      </View>
    </View>
  );
}
