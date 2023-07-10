import AsyncStorage from '@react-native-async-storage/async-storage';
import {PlantType} from '../@types/PlantType';

interface StoragePlantType {
  [id: string]: {
    data: PlantType;
  };
}

export async function savePlant(plant: PlantType): Promise<void> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const oldPlants = data ? (JSON.parse(data) as StoragePlantType) : {};

    const newPlant = {
      [plant.id]: {
        data: plant,
      },
    };

    await AsyncStorage.setItem(
      '@plantmanager:plants',
      JSON.stringify({
        ...newPlant,
        ...oldPlants,
      }),
    );
  } catch (error) {
    throw new Error(error as any);
  }
}

export async function loadPlant(): Promise<StoragePlantType> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const plants = data ? (JSON.parse(data) as StoragePlantType) : {};

    return plants;
  } catch (error) {
    throw new Error(error as any);
  }
}
