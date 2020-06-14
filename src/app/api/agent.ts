import axios, { AxiosResponse } from "axios";
import { IProjection } from "../models/Projection/projection";
import allSettled from "promise.allsettled";
import { IMovie } from "../models/Movie/movie";
import { IHall } from "../models/Hall/hall";
import { IProjectionPostUpdate } from "../models/Projection/projectionPostUpdate";
import { IGenre } from "../models/Genre/gnre";
import { IReview } from "../models/Review/review";
import { IUser } from "../models/User/user";
import { IMoviePostUpdate } from "../models/Movie/moviePostUpdate";
import { IUserPostUpdate } from "../models/User/userPostUpdate";
import { IReviewPostUpdate } from "../models/Review/reviewPostUpdate";
import { IReservation } from "../models/Reservation/reservation";
import { IReservationPostUpdate } from "../models/Reservation/reservationPostUpdate";

axios.defaults.baseURL = "http://localhost:8081/api";

const responseBody = (response: AxiosResponse) => response.data;

let user = "";
let pass = "";

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Projections = {
  list: () =>
    //requests.get('/projections'),
    {
      const projectionPath = "http://localhost:8081/api/projections";
      const moviePath = "http://localhost:8081/api/movies";
      const hallPath = "http://localhost:8081/api/halls";

      return allSettled([
        axios.get<IProjection[]>(projectionPath),
        axios.get<IMovie[]>(moviePath),
        axios.get<IHall[]>(hallPath),
      ]);
    },
  details: (id: number) => requests.get(`/projections/${id}`),
  create: (projection: IProjectionPostUpdate) =>
    requests.post("/projections", projection),
  update: (projection: IProjection) =>
    requests.put(`/projections/${projection.projectionID}`, {
      timeOfProjection: projection.timeOfProjection,
      dateOfProjection: projection.dateOfProjection,
      movieID: projection.movieID,
      hallID: projection.hallID,
    }),
  delete: (id: number) => requests.delete(`/projections/${id}`),
};

const Movies = {
  list: () =>
    //requests.get('/projections'),
    {
      const moviePath = "http://localhost:8081/api/movies";
      const genrePath = "http://localhost:8081/api/genres";
      const reviewPath = "http://localhost:8081/api/reviews";

      return allSettled([
        axios.get<IMovie[]>(moviePath),
        axios.get<IGenre[]>(genrePath),
        axios.get<IReview[]>(reviewPath),
      ]);
    },
  details: (id: number) => requests.get(`/movies/${id}`),
  create: (movie: IMoviePostUpdate) => requests.post("/movies", movie),
  update: (movie: IMovie) =>
    requests.put(`/movies/${movie.movieID}`, {
      title: movie.title,
      director: movie.director,
      synchronization: movie.synchronization,
      ratings: movie.ratings,
      minutes: movie.minutes,
      genreID: movie.genreID,
      reviewID: movie.reviewID,
    }),
  delete: (id: number) => requests.delete(`/movies/${id}`),
};

const Reservations = {
  list: () => {
    const reservationPath = "http://localhost:8081/api/reservations";
    const projectionPath = "http://localhost:8081/api/projections";
    const userPath = "http://localhost:8081/api/users";

    return allSettled([
      axios.get<IReservation[]>(reservationPath),
      axios.get<IProjection[]>(projectionPath),
      axios.get<IUser[]>(userPath),
    ]);
  },
  details: (id: number) => requests.get(`/reservations/${id}`),
  create: (reservation: IReservationPostUpdate) =>
    requests.post("/reservations", reservation),
  update: (reservation: IReservation) =>
    requests.put(`/reservations/${reservation.reservationID}`, {
      startDate: reservation.startDate,
      exparationDateTime: reservation.exparationDateTime,
      seatNo: reservation.seatNo,
      rowNo: reservation.rowNo,
      projectionID: reservation.projectionID,
      userID: reservation.userID,
    }),
  delete: (id: number) => requests.delete(`/reservations/${id}`),
};

const Reviews = {
  list: () =>
    //requests.get('/projections'),
    {
      const reviewPath = "http://localhost:8081/api/reviews";

      const reviews: Promise<IReview[]> = requests.get(reviewPath);
      return reviews;
    },
  details: (id: number) => requests.get(`/reviews/${id}`),
  create: (review: IReviewPostUpdate) => requests.post("/reviews", review),
  update: (review: IReview) =>
    requests.put(`/reviews/${review.reviewID}`, {
      description: review.description,
      actors: review.actors,
      yearOfPublication: review.yearOfPublication,
    }),
  delete: (id: number) => requests.delete(`/reviews/${id}`),
};

const Users = {
  list: () =>
    {
      const urerPath = "http://localhost:8081/api/users";

      const users: Promise<IUser[]> = requests.get(urerPath);
      return users;
    },
  details: (id: number) => requests.get(`/users/${id}`),
  create: (user: IUserPostUpdate) => requests.post("/users", user),
  update: (user: IUser) =>
    requests.put(`/users/${user.userID}`, {
      firstName: user.firstName,
      lastName: user.lastName,
      sex:user.sex,
      noTelephone: user.noTelephone,
      email: user.email,
      password: user.password
    }),
  delete: (id: number) => requests.delete(`/users/${id}`),
};

const Login = {
  login: (email: string, password: string) => {
    user = email;
    pass = password;
    return axios.get("http://localhost:8081/login", {
      params: {},
      withCredentials: false,
      headers: {
        username: email,
        password: password
       
      },
    });
  },
};

export default {
  Projections,
  Movies,
  Reviews,
  Reservations,
  Users,
  Login
};
