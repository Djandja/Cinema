export interface IProjectionDTO {
  projectionID: number;
  timeOfProjection: string;
  dateOfProjection: string;
  movie: Movie;
  hall: Hall;
  }
  
  export type Tuple = readonly [number, string];
  
  export type Movie = {
    movieID: number,
    title?: string,
    director?: string,
    synchronization?: boolean,
    ratings?: string,
    minutes?:string,
    reviewID?: number,
    genreID?: number
  };
  export type Hall = {
    hallID: number;
    nameOfHall?: string;
    // numberOfSeats: number;
    // numberOfRows: number;
  };