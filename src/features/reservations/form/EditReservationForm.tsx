import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button, Dropdown, FormField, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { IReservationDTO } from "../../../app/models/Reservation/reservationDto";
import ReservationStore from '../../../app/stores/reservationStore';
import { IReservationPostUpdate } from "../../../app/models/Reservation/reservationPostUpdate";
import { history } from "../../../index";



interface IProps {
    reservation: IReservationDTO;
}

const EditReservationForm: React.FC<IProps> = ({ reservation: initialFormState }) => {
    const reservationStore = useContext(ReservationStore);
    const {
        projectionRecord,
        projectionTimeRecord,
        projectionDateRecord,
        projectionMovieIDRecord,
        projectionHallIdRecord,
        userNameRecord,
        userSurnameRecord,
        userEmailRecord,
        createReservation,
        cancelEditFormOpen,
        editReservation,
        submitting,
        reservationsDTO
    } = reservationStore;

    const [reservation, setReservation] = useState(initialFormState);
    const [uniqueError, setUniqueError] = useState(false);
    const [projectionRequreidError, setProjectionRequiredError] = useState(false);
    const [timeRequreidError, setTimeRequiredError] = useState(false);
    const [dateRequreidError, setDateRequiredError] = useState(false);
    const [movieRequreidError, setMovieRequiredError] = useState(false);
    const [hallRequreidError, setHallRequiredError] = useState(false);
    const [nameRequreidError, setNameRequiredError] = useState(false);
    const [surnameRequreidError, setSurnameRequiredError] = useState(false);
    const [emailRequreidError, setEmailRequiredError] = useState(false);
    const [startDateRequiredError, setStartDateRequiredError] = useState(false);
    const [exparationtDateRequiredError, setExparationDateRequiredError] = useState(false);
    const [seatRequiredError, setSeatRequiredError] = useState(false);
    const [rowRequiredError, setRowRequiredError] = useState(false);

    const handleSubmit = () => {
        const projectionValid = +reservation.projection !== 0;
        if (!projectionValid) {
            setProjectionRequiredError(true);
        }
        const userValid = +reservation.user !== 0;
        if (!userValid) {
            setNameRequiredError(true);
        }
        const startDateValid = reservation.startDate !== "";
        if (!startDateValid) {
            setStartDateRequiredError(true);
        }
        const exparationDateValid = +reservation.exparationDateTime !== 0;
        if (!exparationDateValid) {
            setExparationDateRequiredError(true);
        }
        const seatValid = +reservation.seatNo !== 0;
        if (!seatValid) {
            setSeatRequiredError(true);
        }
        const rowValid = +reservation.rowNo !== 0;
        if (!rowValid) {
            setRowRequiredError(true);
        }

        const formValid = projectionValid && userValid && startDateValid
            && exparationDateValid && seatValid && rowValid


        if (formValid) {
            editReservation({
                reservationID: reservation.reservationID,
                startDate: reservation.startDate,
                exparationDateTime: reservation.exparationDateTime,
                seatNo: +reservation.seatNo,
                rowNo: reservation.rowNo,
                projectionID: +reservation.projection.projectionID,
                userID: +reservation.user.userID
            });

        }
    };

    const handleUniqueError = (valueID: number, valuSeat: number, valueRow: string) => {
        const existingReservation = reservationsDTO.find(
            (a) => valueID === a.projection.projectionID
                && valuSeat === a.seatNo && valueRow === a.rowNo
        );

        if (existingReservation !== undefined) {
            setUniqueError(true);
        } else {
            setUniqueError(false);
        }
    };

    const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;

        if (name === "startDate") {
            if (value === "") {
                setStartDateRequiredError(true);
            } else {
                setStartDateRequiredError(false);
            }
        }
        if (name === "exparationDateTime") {
            if (value === "") {
                setExparationDateRequiredError(true);
            } else {
                setExparationDateRequiredError(false);
            }
        }
        if (name === "seatNo") {
            if (value === "") {
                setSeatRequiredError(true);
            } else {
                setSeatRequiredError(false);
            }
        }
        if (name === "rowNo") {
            if (value === "") {
                setRowRequiredError(true);
            } else {
                setRowRequiredError(false);
            }
        }

        setReservation({ ...reservation, [name]: value });
    };


    const handleChangeProjection = (e: any, result: any) => {
        const { value } = result;

        setProjectionRequiredError(false);

        setReservation({
            ...reservation,
            projection: { projectionID: value, timeOfProjection: value, dateOfProjection: value, movieID: value, hallID: value }
        });
    };

    const handleChangeUser = (e: any, result: any) => {
        const { value } = result;

        setNameRequiredError(false);

        setReservation({
            ...reservation,
            user: { userID: value, firstName: value, lastName: value, email: value }
        });
    };


    const optionsProjection = Array.from(
        projectionTimeRecord.entries()
    ).map(([key, value]) => ({ key, value: key, text: key }));

    const optionsUserEmail = Array.from(
        userEmailRecord.entries()
    ).map(([key, value]) => ({ key, value: key, text: value }));


    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <FormField>
                    <Form.Input
                        onChange={handleInputChange}
                        label="Start date"
                        value={reservation.startDate}
                        type="date"
                        placeholder="01.01.2020."
                        name="startDate"
                    />
                    {startDateRequiredError && (
                        <Label
                            basic
                            color="red"
                            pointing
                            content="Please add start date"
                            style={{ marginBottom: 10 }}
                        />
                    )}
                </FormField>
                <FormField>
                    <Form.Input
                        onChange={handleInputChange}
                        value={reservation.exparationDateTime}
                        label="Exparation date"
                        type="date-time"
                        placeholder="03.01.2020."
                        name="exparationDateTime"
                    />
                    {exparationtDateRequiredError && (
                        <Label
                            basic
                            color="red"
                            pointing
                            content="Please add exparation date"
                            style={{ marginBottom: 10 }}
                        />
                    )}
                </FormField>
                <FormField>
                    <Form.Input
                        value={reservation.seatNo}
                        onChange={handleInputChange}
                        label="Seat number"
                        type='number'
                        placeholder="10"
                        name="seatNo"
                    />
                    {seatRequiredError && (
                        <Label
                            basic
                            color="red"
                            pointing
                            content="Please add seat number"
                            style={{ marginBottom: 10 }}
                        />
                    )}
                </FormField>
                <FormField>
                    <Form.Input
                        value={reservation.rowNo}
                        onChange={handleInputChange}
                        label="Row number"
                        placeholder="A"
                        name="rowNo"
                    />
                    {rowRequiredError && (
                        <Label
                            basic
                            color="red"
                            pointing
                            content="Please add row number"
                            style={{ marginBottom: 10 }}
                        />
                    )}
                </FormField>

                <Form.Field
                    name="projection"
                    fluid
                    control={Dropdown}
                    selection
                    label="Projection"
                    placeholder="Projection"
                    value={reservation.projection.projectionID}
                    options={optionsProjection}
                    onChange={handleChangeProjection}

                />
                {timeRequreidError && (
                    <Label
                        basic
                        color="red"
                        pointing
                        content="Please choose projection"
                        style={{ marginBottom: 10 }}
                    />
                )}

                <Form.Field
                    name="user"
                    fluid
                    control={Dropdown}
                    selection
                    placeholder="User"
                    value={reservation.user.userID}
                    options={optionsUserEmail}
                    onChange={handleChangeUser}
                />
                {emailRequreidError && (
                    <Label
                        basic
                        color="red"
                        pointing
                        content="Please choose users email"
                        style={{ marginBottom: 10 }}
                    />
                )}

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button
                        loading={submitting}
                        style={{ width: "50%", marginRight: 10 }}
                        positive
                        type="submit"
                        content="Save"
                    // disabled={
                    //   uniqueError ||
                    //   errorTitle ||
                    //   reservationRequiredError ||
                    //   hallRequiredError ||
                    //   dateOfReservationRequiredError ||
                    //   timeOfProjectioRequiredError

                    // }
                    />
                    <Button
                        onClick={cancelEditFormOpen}
                        style={{ width: "50%" }}
                        type="button"
                        content="Cancel"
                    />
                </div>
            </Form>
        </Segment>


    );
};


export default observer(EditReservationForm);
