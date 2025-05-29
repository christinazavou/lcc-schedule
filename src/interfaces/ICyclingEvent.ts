export interface ICyclingEvent {
  date: Date;
  title: string;
  description: string;
  startTime: {
    hours: string;
    minutes: string;
  };
  distance: number;
  rideTime: number;
  difficulty: string;
  difficultyLevel: number;
  rideLeader: string;
  routeType: string;
  startPoint: string;
}
