import AsyncStorage from '@react-native-async-storage/async-storage';
//import * as Notifications from 'react-native-push-notification';
import {PlantType} from '../@types/PlantType';
import {format} from 'date-fns';

enum StorageKeys {
  PLANTS = '@plantmanager:plants',
  USERNAME = '@plantmanager:user',
}

export interface StoragePlantType {
  [id: string]: {
    data: PlantType;
  };
}

export async function loadStorageUserName(): Promise<string> {
  return (await AsyncStorage.getItem(StorageKeys.USERNAME)) || '';
}

export async function savePlant(plant: PlantType): Promise<void> {
  try {
    //const nextTime = new Date(plant.dateTimeNotification);
    //const now = new Date();
    //const {times, repeat_every} = plant.frequency;
    //if (repeat_every === 'week') {
    //const interval = Math.trunc(7 / times);
    //nextTime.setDate(now.getDate() + interval);
    //} else {
    //nextTime.setDate(nextTime.getDate() + 1);
    //}
    //const seconds = Math.abs(
    //Math.ceil(now.getTime() - nextTime.getTime() / 1000),
    //);

    const data = await AsyncStorage.getItem(StorageKeys.PLANTS);
    const oldPlants = data ? (JSON.parse(data) as StoragePlantType) : {};

    const newPlant = {
      [plant.id]: {
        data: plant,
      },
    };

    await AsyncStorage.setItem(
      StorageKeys.PLANTS,
      JSON.stringify({
        ...newPlant,
        ...oldPlants,
      }),
    );
  } catch (error) {
    throw new Error(error as any);
  }
}

export async function loadPlant(): Promise<PlantType[]> {
  try {
    const data = await AsyncStorage.getItem(StorageKeys.PLANTS);
    const plants = data ? (JSON.parse(data) as StoragePlantType) : {};

    const plantsSorted = Object.keys(plants)
      .map(plant => ({
        ...plants[plant].data,
        hour: format(
          new Date(plants[plant].data.dateTimeNotification),
          'HH:mm',
        ),
      }))
      .sort((a, b) =>
        Math.floor(
          new Date(a.dateTimeNotification).getTime() / 1000 -
            Math.floor(new Date(b.dateTimeNotification).getTime() / 1000),
        ),
      );

    return plantsSorted;
  } catch (error) {
    throw new Error(error as any);
  }
}

export async function removePlant(id: string): Promise<void> {
  const data = await AsyncStorage.getItem(StorageKeys.PLANTS);
  const plants = data ? (JSON.parse(data) as StoragePlantType) : {};

  delete plants[id];

  await AsyncStorage.setItem(StorageKeys.PLANTS, JSON.stringify(plants));
}
