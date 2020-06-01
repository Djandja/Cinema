import axios, { AxiosResponse } from "axios";
import { IActivity } from "../models/projection";

axios.defaults.baseURL = "http://localhost:8081/api";

const responseBody = (response: AxiosResponse) => response.data;


const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Projections = {
  list: (): Promise<IActivity[]> => requests.get('/projections'),
//   {
//     const projectionPath = "http://localhost:8081/api/projections";
//     const moviePath = "http://localhost:8081/api/movies";
//     const hallPath = "http://localhost:8081/api/halls";

//     return allSettled([
//       axios.get<IActivity[]>(projectionPath)
//       //axios.get<IWriter[]>(writersPath),
//       //axios.get<IGenre[]>(genresPath),
//     ]);
//   },
  details: (id: string) => requests.get(`/projections/${id}`),
  create: (projection: IActivity) => requests.post("/projections", projection),
  update: (projection: IActivity) =>
    requests.put(`/projections/${projection.projectionID}`, {
      timeOfProjection: projection.projectionID,
      dateOfProjection: projection.dateOfProjection,
      movieID: projection.movieID,
      hallID: projection.hallID,
    }),
  delete: (id: string) => requests.delete(`/projections/${id}`),
};

export default {
  Projections,
};
