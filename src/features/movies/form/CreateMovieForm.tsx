import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button, Dropdown, Grid, GridColumn, FormField, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import MovieStore from '../../../app/stores/movieStore';
import { IMoviePostUpdate } from "../../../app/models/Movie/moviePostUpdate";
import { history } from "../../../index";

const CreateMovieForm: React.FC = () => {
    const initializeForm = () => {
        return {
            genre: "",
            review: "",
            title: "",
            director: "",
            synchronization: "",
            ratings: "",
            minutes: "",
        };
    };
    const movieStore = useContext(MovieStore);
    const {
        genreNameOfGenreRecord,
        reviewDescriptionRecord,
        reviewActorsRecord,
        reviewYearOfPublicationRecord,
        createMovie,
        cancelCreateFormOpen,
        submitting,
        moviesDTO
    } = movieStore;

    const [movie, setMovie] = useState(initializeForm);
    const [errorTitle, setErrorTitle] = useState(false);
    const [uniqueError, setUniqueError] = useState(false);
    const [directorRequreidError, setDirectorRequiredError] = useState(false);
    const [synchronizationRequreidError, setSynchronizationRequiredError] = useState(false);
    const [ratingsRequreidError, setRatingsRequiredError] = useState(false);
    const [minutesRequreidError, setMinutesRequiredError] = useState(false);
    const [genreRequiredError, setGenreRequiredError] = useState(false);
    const [reviewRequiredError, setReviewRequiredError] = useState(false);
    const [titleRequiredError, setTitleRequiredError] = useState(false);

    const handleSubmit = () => {
        const genreValid = +movie.genre !== 0;
        if (!genreValid) {
            setGenreRequiredError(true);
        }
        const reviewValid = +movie.review !== 0;
        if (!reviewValid) {
            setReviewRequiredError(true);
        }
        const titleValid = movie.title !== "";
        if (!titleValid) {
            console.log("title invalid");
            setTitleRequiredError(true);
        }
        const directorValid = +movie.director !== 0;
        if (!directorValid) {
            setDirectorRequiredError(true);
        }
        // const synchronizationValid = +movie.synchronization !== 0;
        // if (!synchronizationValid) {
        //     setSynchronizationRequiredError(true);
        // }
        const ratingsValid = +movie.ratings !== 0;
        if (!ratingsValid) {
            setRatingsRequiredError(true);
        }
        const minutesValid = +movie.minutes !== 0;
        if (!minutesValid) {
            setMinutesRequiredError(true);
        }

        const formValid =  genreValid && reviewValid && titleValid && directorValid &&
         ratingsValid && minutesValid

        if (formValid) {
            let newMovie: IMoviePostUpdate = {
                title: movie.title,
                director: movie.director,
                synchronization: movie.synchronization === 'true'? true : false,
                ratings: movie.ratings,
                minutes: movie.minutes,
                genreID: +movie.genre,
                reviewID: +movie.review,
            };
            createMovie(newMovie);
        } else {

        }
    };

    const handleUniqueError = (valueID: number, valueTitle: string) => {
        const existingMovie = moviesDTO.find(
            (a) => valueID === a.review.reviewID && valueTitle === a.title
        );

        if (existingMovie !== undefined) {
            setUniqueError(true);
        } else {
            setUniqueError(false);
        }
    };


    const handleChange = (e: any, result: any) => {
        const { name, value } = result;
        // if (name === "rewiev") {
        //     if (movie.title !== "") {
        //         handleUniqueError(value, movie.title);
        //     }
        //     setReviewRequiredError(false);
        // }
        if (name === "genre") {
            setGenreRequiredError(false);
        }
        setMovie({
            ...movie,
            [name]: value,
        });
    };

    const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;

        if (name === "title") {
            if (value.length > 35) {
                setErrorTitle(true);
            } else {
                setErrorTitle(false);
            }
            // if (reviewRequiredError === false) {
            //     handleUniqueError(+movie.review, value);
            // }
            if (value === "") {
                setTitleRequiredError(true);
            } else {
                setTitleRequiredError(false);
            }
        }
        if (name === "director") {
            if (value === "") {
                setDirectorRequiredError(true);
            } else {
                setDirectorRequiredError(false);
            }
        }
        if (name === "ratings") {
            if (value === "") {
                setRatingsRequiredError(true);
            } else {
                setRatingsRequiredError(false);
            }
        }
        if (name === "minutes") {
            if (value === "") {
                setMinutesRequiredError(true);
            } else {
                setMinutesRequiredError(false);
            }
        }

        setMovie({ ...movie, [name]: value });
    };

    const optionsGenre = Array.from(
        genreNameOfGenreRecord.entries()
    ).map(([key, value]) => ({ key, value: key, text: value }));

    const optionsReview = Array.from(
        reviewDescriptionRecord.entries()
    ).map(([key, value]) => ({ key, value: key, text: value }));

    const cancelFormOpen = () => {
        history.push("/movies")
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
                                    label="Title"
                                    placeholder="Movie Title"
                                    name="title"
                                    error={errorTitle}
                                />
                                {errorTitle && (
                                    <Label
                                        basic
                                        pointing
                                        color="red"
                                        //style={{ marginBottom: 5 }}
                                        content="Title is too long"
                                    />
                                )}
                                {titleRequiredError && (
                                    <Label
                                        basic
                                        color="red"
                                        pointing
                                        content="Please add Title"
                                        style={{ marginBottom: 10 }}
                                    />
                                )}
                            </FormField>
                            <FormField>
                                <Form.Input
                                    onChange={handleInputChange}
                                    label="director"
                                    placeholder="Director name"
                                    name="director"
                                />
                                {directorRequreidError && (
                                    <Label
                                        basic
                                        color="red"
                                        pointing
                                        content="Please add Director"
                                        style={{ marginBottom: 10 }}
                                    />
                                )}
                            </FormField>
                            <FormField>
                                <Form.Input
                                    onChange={handleInputChange}
                                    label="Synscronization"
                                    placeholder="true"
                                    name="synchonization"
                                />
                                {/* {synchronizationRequreidError && (
                                    <Label
                                        basic
                                        color="red"
                                        pointing
                                        content="Please set synchronization"
                                        style={{ marginBottom: 10 }}
                                    />
                                )} */}
                            </FormField>
                            <FormField>
                                <Form.Input
                                    onChange={handleInputChange}
                                    label="Ratings"
                                    placeholder="5.0"
                                    name="ratings"
                                />
                                {ratingsRequreidError && (
                                    <Label
                                        basic
                                        color="red"
                                        pointing
                                        content="Please add rating"
                                        style={{ marginBottom: 10 }}
                                    />
                                )}
                            </FormField>
                            <FormField>
                                <Form.Input
                                    onChange={handleInputChange}
                                    label="Minutes"
                                    placeholder="60min"
                                    name="minutes"
                                />
                                {minutesRequreidError && (
                                    <Label
                                        basic
                                        color="red"
                                        pointing
                                        content="Please set minutes"
                                        style={{ marginBottom: 10 }}
                                    />
                                )}
                            </FormField>
                            <Form.Field
                                name="genre"
                                fluid
                                control={Dropdown}
                                selection
                                placeholder="Genre"
                                value={movie.genre}
                                options={optionsGenre}
                                onChange={handleChange}

                            />
                            {genreRequiredError && (
                                <Label
                                    basic
                                    color="red"
                                    pointing
                                    content="Please choose genre"
                                    style={{ marginBottom: 10 }}
                                />
                            )}

                            <Form.Field
                                name="review"
                                fluid
                                control={Dropdown}
                                selection
                                placeholder="Review"
                                value={movie.review}
                                options={optionsReview}
                                onChange={handleChange}
                            />

                            {/* {reviewRequiredError && (
                                <Label
                                    basic
                                    color="red"
                                    pointing
                                    content="Please choose review"
                                    style={{ marginBottom: 10 }}
                                />
                            )} */}

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
                                //   movieRequiredError ||
                                //   hallRequiredError ||
                                //   dateOfMovieRequiredError ||
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
            </Grid>
        </Segment>


    );
};

export default observer(CreateMovieForm);
