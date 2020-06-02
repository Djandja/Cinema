import axios, { AxiosResponse } from "axios";
import { IProjection } from "../models/Projection/projection";
import allSettled from "promise.allsettled";
import { IMovie } from "../models/Movie/movie";
import { IHall } from "../models/Hall/hall";
import { IProjectionPostUpdate } from "../models/Projection/projectionPostUpdate";

axios.defaults.baseURL = "http://localhost:8081/api";

const responseBody = (response: AxiosResponse) => response.data;


const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Projections = {
  list: () => //requests.get('/projections'),
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
  create: (projection: IProjectionPostUpdate) => requests.post("/projections", projection),
  update: (projection: IProjection) =>
    requests.put(`/projections/${projection.projectionID}`, {
      timeOfProjection: projection.timeOfProjection,
      dateOfProjection: projection.dateOfProjection,
      movieID: projection.movieID,
      hallID: projection.hallID,
    }),
  delete: (id: number) => requests.delete(`/projections/${id}`),
};

export default {
  Projections,
};
