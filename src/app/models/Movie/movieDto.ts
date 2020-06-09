export interface IMovieDTO {
    movieID: number,
    title: string,
    director: string,
    synchronization: boolean,
    ratings: string,
    minutes:string,
    genre: Genre,
    review: Review,
}
    
    export type Tuple = readonly [number, string];
    
    export type Genre = {
        genreID: number;
        nameOfGenre?: string;
    };

    export type Review = {
        reviewID: number;
        description?: string;
        actors?: string;
        yearOfPublication?: string;
    };

   