import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button, Dropdown, Grid, GridColumn, FormField, Label, Image, Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ReservationStore from '../../../app/stores/reservationStore';
import { IReservationPostUpdate } from "../../../app/models/Reservation/reservationPostUpdate";
import { history } from "../../../index";

const CreateReservationForm: React.FC = () => {
    const initializeForm = () => {
        return {
            projection: "",
            user: "",
            startDate: "",
            exparationDateTime: "",
            seatNo: "",
            rowNo: "",
        };
    };
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
        cancelCreateFormOpen,
        submitting,
        reservationsDTO
    } = reservationStore;

    const [reservation, setReservation] = useState(initializeForm);
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
            console.log("title invalid");
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
            let newReservation: IReservationPostUpdate = {
                startDate: reservation.startDate,
                exparationDateTime: reservation.exparationDateTime,
                seatNo: +reservation.seatNo,
                rowNo: reservation.rowNo,
                projectionID: +reservation.projection,
                userID: +reservation.user
            };
            createReservation(newReservation);
        } else {

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


    const handleChange = (e: any, result: any) => {
        const { name, value } = result;
        // if (name === "rewiev") {
        //     if (reservation.title !== "") {
        //         handleUniqueError(value, reservation.title);
        //     }
        //     setReviewRequiredError(false);
        // }
        if (name === "projection") {
            setProjectionRequiredError(false);
        }
        if (name === "user") {
            setNameRequiredError(false);
        }
        setReservation({
            ...reservation,
            [name]: value,
        });
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

    const optionsProjection = Array.from(
        projectionTimeRecord.entries()
    ).map(([key, value]) => ({ key, value: key, text: key }));

    

    const optionsUser = Array.from(
        userEmailRecord.entries()
    ).map(([key, value]) => ({ key, value: key, text: value }));

    const cancelFormOpen = () => {
        history.push("/reservations")
    }
    return (

        <Segment clearing>
            <Grid>
                <Grid.Column width={10}>
                    <Segment clearing>
                        <Form onSubmit={handleSubmit}>
                            <FormField>
                                <Form.Input
                                    onChange={handleInputChange}
                                    label="Start date"
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
                                    label="Exparation date and time"
                                    type="date-time"
                                    placeholder="2020-06-01T19:30:00"
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
                                    onChange={handleInputChange}
                                    label="Seat number"
                                    placeholder="1,2,3,4,5,6,7,8,9,10"
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
                                    onChange={handleInputChange}
                                    label="Row number"
                                    placeholder="A,B,C"
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
                                placeholder="Projection"
                                value={reservation.projection}
                                options={optionsProjection}
                                onChange={handleChange}

                            />
                            {projectionRequreidError && (
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
                                value={reservation.user}
                                options={optionsUser}
                                onChange={handleChange}
                            />

                            {nameRequreidError && (
                                <Label
                                    basic
                                    color="red"
                                    pointing
                                    content="Please choose user"
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
                                    onClick={cancelFormOpen}
                                    style={{ width: "50%" }}
                                    type="button"
                                    content="Cancel"
                                />
                            </div>
                        </Form>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={5}>
                    <Image src={'/assets/reservation.png'}
                        style={{ flex: 3, height: 350, width: 350 }}
                        fluid />
                </Grid.Column>
            </Grid>
        </Segment>


    );
};

export default observer(CreateReservationForm);
