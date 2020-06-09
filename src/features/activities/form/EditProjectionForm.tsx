import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button, Dropdown, FormField, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { IProjectionDTO } from "../../../app/models/Projection/projectionDto";
import ProjectionStore from '../../../app/stores/projectionStore';


interface IProps {
  projection: IProjectionDTO;
}

const EditProjectionForm: React.FC<IProps> = ({ projection: initialFormState }) => {
  const projectionStore = useContext(ProjectionStore);
  const {
    movieTitleRecord,
    hallNameRecord,
    editProjection,
    submitting,
    cancelEditFormOpen,
    projectionsDTO
  } = projectionStore;

  const [projection, setProjection] = useState<IProjectionDTO>(initialFormState);
  const [errorTitle, setErrorTitle] = useState(false);
  const [uniqueError, setUniqueError] = useState(false);
  const [dateOfProjectionRequiredError, setDateOfProjectioRequiredError] = useState(false);
  const [timeOfProjectioRequiredError, setTimeOfProjectioRequiredError] = useState(false);
  const [movieRequiredError, setMovieRequiredError] = useState(false);
  const [hallRequiredError, setHallRequiredError] = useState(false);

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
      editProjection({
        projectionID: projection.projectionID,
        dateOfProjection: projection.dateOfProjection,
        timeOfProjection: projection.timeOfProjection.toString(),
        movieID: +projection.movie.movieID,
        hallID: +projection.hall.hallID,
      });
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

  const handleChangeMovie = (e: any, result: any) => {
    const { value } = result;

    setMovieRequiredError(false);

    setProjection({
      ...projection,
      movie: { movieID: value }
    });
  };

  const handleChangeHall = (e: any, result: any) => {
    const { name, value } = result;

    setHallRequiredError(false);

    setProjection({
      ...projection,
      hall: { hallID: value }
    });
  };


  const optionsMovie = Array.from(
    movieTitleRecord.entries()
  ).map(([key, value]) => ({ key, value: key, text: value }));

  const optionsHall = Array.from(
    hallNameRecord.entries()
  ).map(([key, value]) => ({ key, value: key, text: value }));



  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <Form.Input
            value={projection.dateOfProjection}
            onChange={handleInputChange}
            label="Date Of Projection   (format YYYY-mm-dd)"
            type='date'
            placeholder="datum"
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
            value={projection.timeOfProjection}
            onChange={handleInputChange}
            label="Time Of Projection"
            type='HH:mm:ss'
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
          //value={projection.movie}
          options={optionsMovie}
          onChange={handleChangeMovie}
          defaultValue={projection.movie.movieID}

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
          //value={projection.hall}
          options={optionsHall}
          onChange={handleChangeHall}
          defaultValue={projection.hall.hallID}
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
            style={{ width: "50%" }}
            onClick={() => cancelEditFormOpen()}
            type="button"
            content="Cancel"
          />
        </div>
      </Form>
    </Segment>
  );
};

export default observer(EditProjectionForm);
