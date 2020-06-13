import { observable, action, computed } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { act } from "react-dom/test-utils";
import { IMoviePostUpdate } from "../models/Movie/moviePostUpdate";
import { IMovie } from "../models/Movie/movie";
import {IMovieDTO} from "../models/Movie/movieDto"

class MovieStore {
  @observable movieRegistry = new Map();
  @observable moviesDTO: IMovieDTO[]=[];
  @observable loadingInitial = false;

  @observable genreNameOfGenreRecord = new Map<number, string>();

  @observable reviewDescriptionRecord = new Map<number, string>();
  @observable reviewActorsRecord = new Map<number, string>();
  @observable reviewYearOfPublicationRecord = new Map<number, string>();

  @observable selectedMovie: IMovieDTO | undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable createMode = false;
  @observable target = "";

 
  @action loadMovies = () => {
    this.loadingInitial = true;
    agent.Movies.list()
      .then(([moviesResult,genresResult, reviewsResult ]) => {
        if (
          moviesResult.status === "fulfilled" &&
          genresResult.status === "fulfilled" &&
          reviewsResult.status === "fulfilled"
        ) {
          this.genreNameOfGenreRecord = new Map(
            genresResult.value.data.map(({ genreID, nameOfGenre }) => [
              genreID,
              nameOfGenre,
            ])
          );
          this.reviewDescriptionRecord = new Map(
            reviewsResult.value.data.map(({ reviewID, description }) => [
              reviewID,
              description,
            ])
          );
          this.reviewActorsRecord = new Map(
            reviewsResult.value.data.map(({ reviewID, actors }) => [
              reviewID,
              actors,
            ])
          );
          this.reviewYearOfPublicationRecord = new Map(
            reviewsResult.value.data.map(({ reviewID, yearOfPublication }) => [
              reviewID,
              yearOfPublication,
            ])
          );
          

          const movies = moviesResult.value.data.map(
            ({ genreID, reviewID, ...movie }) => ({
              ...movie,
              genre: {
                genreID: genreID,
                nameOfGenre: this.genreNameOfGenreRecord.get(genreID as number)!,
              },
              review: {
                reviewID: reviewID,
                description: this.reviewDescriptionRecord.get(reviewID as number)!,
                actors: this.reviewActorsRecord.get(reviewID as number)!,
                yearOfPublication: this.reviewYearOfPublicationRecord.get(reviewID as number)!,
              },
            })
          );
          movies.forEach((movie) => {
            movie.review.yearOfPublication = movie.review.yearOfPublication.split(
              "T"
            )[0];
          })

          this.moviesDTO= movies; 
          console.log(this.moviesDTO);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => (this.loadingInitial = false));
  };

  @action createMovie = async (movie: IMoviePostUpdate) => {
    this.submitting = true;
    try {
      await agent.Movies.create(movie);

      this.loadMovies();
      this.createMode = false;
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  };

  @action openCreateForm = () => {
    this.createMode = true;
    this.selectedMovie = undefined;
  };

  @action openEditForm = (id: number) => {
    this.selectedMovie = this.moviesDTO.find(
      (a) => a.movieID === id
    );
    this.editMode = true;
  };

  @action cancelSelectedMovie = () => {
    this.selectedMovie = undefined;
  };

  @action cancelCreateFormOpen = () => {
    this.createMode = false;
  };
  @action cancelEditFormOpen = () => {
    this.editMode = false;
  };

  @action selectMovie = (id: number) => {
    this.selectedMovie = this.moviesDTO.find(
      (a) => a.movieID === id
    );
    this.editMode = false;
    this.createMode = false;
  };

  @action editMovie = async (movie: IMovie) => {
    this.submitting = true;
    try {
      await agent.Movies.update(movie);
      this.loadMovies();
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  };

  @action deleteMovie = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Movies.delete(id);
      this.loadMovies();
      this.submitting = false;
      this.target = "";
    } catch (error) {
      this.submitting = false;
      this.target = "";
      console.log(error);
    }
  };
}

export default createContext(new MovieStore());
