import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button, Dropdown, Grid, GridColumn, FormField, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ProjectionStore from '../../../app/stores/projectionStore';
import { IProjectionPostUpdate } from "../../../app/models/Projection/projectionPostUpdate";
import { history } from "../../../index";

const CreateProjectionForm: React.FC = () => {
  const initializeForm = () => {
    return {
      movie: "",
      hall: "",
      dateOfProjection: "",
      timeOfProjection: "",
    };
  };
  const projectionStore = useContext(ProjectionStore);
  const {
    movieTitleRecord,
    hallNameRecord,
    createProjection,
    cancelCreateFormOpen,
    submitting,
    projectionsDTO
  } = projectionStore;

  const [projection, setProjection] = useState(initializeForm);
  const [errorTitle, setErrorTitle] = useState(false);
  const [uniqueError, setUniqueError] = useState(false);
  const [dateOfProjectionRequiredError, setDateOfProjectioRequiredError] = useState(false);
  const [timeOfProjectioRequiredError, setTimeOfProjectioRequiredError] = useState(false);
  const [movieRequiredError, setMovieRequiredError] = useState(false);
  const [hallRequiredError, setHallRequiredError] = useState(false);

  // const handleSubmit = () => {
  //   let newProjection: IProjectionPostUpdate = {
  //     dateOfProjection: projection.dateOfProjection,
  //     timeOfProjection: projection.timeOfProjection,
  //     movieID: +projection.movie,
  //     hallID: +projection.hall,
  //   };
  //   createProjection(newProjection);
  // };

  const handleSubmit = () => {
    const dateOfProjectionValid = +projection.dateOfProjection !== 0;
    if (!dateOfProjectionValid) {
      setDateOfProjectioRequiredError(true);
    }
    const timeOfProjectionValid = +projection.timeOfProjection !== 0;
    if (!timeOfProjectionValid) {
      setTimeOfProjectioRequiredError(true);
    }
    const movieValid = +projection.movie !== 0;
    if (!movieValid) {
      setMovieRequiredError(true);
    }
    const hallValid = +projection.hall !== 0;
    if (!hallValid) {
      setHallRequiredError(true);
    }

    const formValid = !uniqueError && movieValid && hallValid && dateOfProjectionValid && timeOfProjectionValid;

    if (formValid) {
      let newProjection: IProjectionPostUpdate = {
        dateOfProjection: projection.dateOfProjection,
        timeOfProjection: projection.timeOfProjection,
        movieID: +projection.movie,
        hallID: +projection.hall,
      };
      createProjection(newProjection);
    } else {

    }
  };

  const handleUniqueError = (valueID: number, valueDate: string, valueTime: string) => {
    const existingProjection = projectionsDTO.find(
      (a) => valueID === a.movie.movieID && valueDate === a.dateOfProjection && valueTime === a.timeOfProjection
    );

    if (existingProjection !== undefined) {
      setUniqueError(true);
    } else {
      setUniqueError(false);
    }
  };

  // const handleChange = (e: any, result: any) => {
  //   const { name, value } = result;
  //   setProjection({
  //     ...projection,
  //     [name]: value,
  //   });
  // };

  const handleChange = (e: any, result: any) => {
    const { name, value } = result;
    if (name === "movie") {
      // if (projection.dateOfProjection !== "") {
      //   handleUniqueError(value, (projection.dateOfProjection);
      // }
      setMovieRequiredError(false);
    }
    if (name === "hall") {
      setHallRequiredError(false);
    }
    setProjection({
      ...projection,
      [name]: value,
    });
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    if (name === "movie") {
      // if (value.length > 35) {
      //   setErrorTitle(true);
      // } else {
      //   setErrorTitle(false);
      // }
      if (movieRequiredError === false) {
        handleUniqueError(+projection.movie, value, value);
      }
      if (value === "") {
        setMovieRequiredError(true);
      } else {
        setMovieRequiredError(false);
      }
    }

    setProjection({ ...projection, [name]: value });
  };

  const optionsMovie = Array.from(
    movieTitleRecord.entries()
  ).map(([key, value]) => ({ key, value: key, text: value }));

  const optionsHall = Array.from(
    hallNameRecord.entries()
  ).map(([key, value]) => ({ key, value: key, text: value }));

  const cancelFormOpen = () => {
    history.push("/projections")
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
                  label="Date Of Projection"
                  type="date"
                  placeholder="31.12.2020"
                  name="dateOfProjection"
                />
                {dateOfProjectionRequiredError && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content="Please choose date of projection"
                    style={{ marginBottom: 10 }}
                  />
                )}
              </FormField>
              <FormField>
                <Form.Input
                  onChange={handleInputChange}
                  label="Time Of Projection"
                  type="HH:mm:ss"
                  placeholder="20:00:00"
                  name="timeOfProjection"
                />
                {timeOfProjectioRequiredError && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content="Please choose time of projection"
                    style={{ marginBottom: 10 }}
                  />
                )}
              </FormField>

              <Form.Field
                name="movie"
                fluid
                control={Dropdown}
                selection
                placeholder="Movie"
                value={projection.movie}
                options={optionsMovie}
                onChange={handleChange}

              />
              {movieRequiredError && (
                <Label
                  basic
                  color="red"
                  pointing
                  content="Please choose movie"
                  style={{ marginBottom: 10 }}
                />
              )}

              <Form.Field
                name="hall"
                fluid
                control={Dropdown}
                selection
                placeholder="Hall"
                value={projection.hall}
                options={optionsHall}
                onChange={handleChange}
              />

              {hallRequiredError && (
                <Label
                  basic
                  color="red"
                  pointing
                  content="Please choose hall"
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
                  //   movieRequiredError ||
                  //   hallRequiredError ||
                  //   dateOfProjectionRequiredError ||
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

export default observer(CreateProjectionForm);
