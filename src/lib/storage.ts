import AsyncStorage from '@react-native-async-storage/async-storage';
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
