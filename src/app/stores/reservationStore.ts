import { observable, action, computed } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { act } from "react-dom/test-utils";
import { IReservationPostUpdate } from "../models/Reservation/reservationPostUpdate";
import { IReservation } from "../models/Reservation/reservation";
import {IReservationDTO} from "../models/Reservation/reservationDto"

class ReservationStore {
  @observable reservationRegistry = new Map();
  @observable reservationsDTO: IReservationDTO[]=[];
  @observable loadingInitial = false;

  @observable projectionRecord = new Map<number, number>();
  @observable projectionTimeRecord = new Map<number, string>();
  @observable projectionDateRecord = new Map<number, string>();
  @observable projectionMovieIDRecord = new Map<number, number>();
  @observable projectionHallIdRecord = new Map<number, number>();

  @observable userNameRecord = new Map<number, string>();
  @observable userSurnameRecord = new Map<number, string>();
  @observable userEmailRecord = new Map<number, string>();

  @observable selectedReservation: IReservationDTO | undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable createMode = false;
  @observable target = "";

  @computed get reservationByDate() {
    return Array.from(this.reservationsDTO.values()).sort(
      (a, b) => Date.parse(a.startDate) - Date.parse(b.startDate)
    );
  }
 
  @action loadReservations = () => {
    this.loadingInitial = true;
    agent.Reservations.list()
      .then(([reservationsResult,projectionResult, userResult ]) => {
        if (
          reservationsResult.status === "fulfilled" &&
          projectionResult.status === "fulfilled" &&
          userResult.status === "fulfilled"
        ) {
          this.projectionTimeRecord = new Map(
            projectionResult.value.data.map(({projectionID ,timeOfProjection }) => [
              projectionID,
              timeOfProjection
            ])
          );
          this.projectionDateRecord = new Map(
            projectionResult.value.data.map(({projectionID ,dateOfProjection }) => [
              projectionID,
              dateOfProjection
            ])
          );
          this.projectionMovieIDRecord = new Map(
            projectionResult.value.data.map(({projectionID ,movieID }) => [
              projectionID,
              movieID
            ])
          );
          this.projectionHallIdRecord = new Map(
            projectionResult.value.data.map(({projectionID ,hallID }) => [
              projectionID,
              hallID
            ])
          );
          this.userEmailRecord = new Map(
            userResult.value.data.map(({ userID, email }) => [
              userID,
              email,
            ])
          );
          this.userNameRecord = new Map(
            userResult.value.data.map(({ userID, firstName }) => [
              userID,
              firstName,
            ])
          );
          this.userSurnameRecord = new Map(
            userResult.value.data.map(({ userID, lastName }) => [
              userID,
              lastName,
            ])
          );
          
          const reservations = reservationsResult.value.data.map(
            ({ projectionID, userID, ...reservation }) => ({
              ...reservation,
              projection: {
                projectionID: projectionID,
                timeOfProjection: this.projectionTimeRecord.get(projectionID as number)!,
                dateOfProjection: this.projectionDateRecord.get(projectionID as number)!,
                movieID: this.projectionMovieIDRecord.get(projectionID as number)!,
                hallID: this.projectionHallIdRecord.get(projectionID as number)!,
              },
              user: {
                userID: userID,
                firstName: this.userNameRecord.get(userID as number)!,
                lastName: this.userSurnameRecord.get(userID as number)!,
                email: this.userEmailRecord.get(userID as number)!,
              },
            })
          );
          reservations.forEach((reservation) => {
            reservation.startDate = reservation.startDate.split("T")[0];
            //reservation.exparationDateTime = reservation.exparationDateTime.split("T")[0]
            reservation.projection.dateOfProjection = reservation.projection.dateOfProjection.split("T")[0];
            reservation.projection.timeOfProjection = reservation.projection.timeOfProjection.split("T")[1];

      })

          this.reservationsDTO= reservations; 
          console.log(this.reservationsDTO);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => (this.loadingInitial = false));
  };

  @action createReservation = async (reservation: IReservationPostUpdate) => {
    this.submitting = true;
    try {
      await agent.Reservations.create(reservation);

      this.loadReservations();
      this.createMode = false;
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  };

  @action openCreateForm = () => {
    this.createMode = true;
    this.selectedReservation = undefined;
  };

  @action openEditForm = (id: number) => {
    this.selectedReservation = this.reservationsDTO.find(
      (a) => a.reservationID === id
    );
    this.editMode = true;
  };

  @action cancelSelectedReservation = () => {
    this.selectedReservation = undefined;
  };

  @action cancelCreateFormOpen = () => {
    this.createMode = false;
  };
  @action cancelEditFormOpen = () => {
    this.editMode = false;
  };

  @action selectReservation = (id: number) => {
    this.selectedReservation = this.reservationsDTO.find(
      (a) => a.reservationID === id
    );
    this.editMode = false;
    this.createMode = false;
  };

  @action editReservation = async (reservation: IReservation) => {
    this.submitting = true;
    try {
      await agent.Reservations.update(reservation);
      this.loadReservations();
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  };

  @action deleteReservation = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Reservations.delete(id);
      this.loadReservations();
      this.submitting = false;
      this.target = "";
    } catch (error) {
      this.submitting = false;
      this.target = "";
      console.log(error);
    }
  };
}

export default createContext(new ReservationStore());
