export interface IReservationDTO {
  reservationID: number;
  startDate: string;
  exparationDateTime: string;
  seatNo: number;
  rowNo: string;
  projection: Projection;
  user: User;
}

export type Tuple = readonly [number, string];

export type Projection = {
  projectionID: number;
  timeOfProjection: string;
  dateOfProjection: string;
  movieID: number;
  hallID: number;
};

export type User = {
    userID: number,
    firstName: string,
    lastName: string,
    //sex: string,
    //noTelephone: string,
    email: string,
    //password: string,
};
