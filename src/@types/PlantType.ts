export type PlantType = {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  hour: string;
  frequency: {
    times: number;
    repeat_every: string;
  };
  dateTimeNotification: Date;
};
