import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button, Dropdown } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { IProjectionDTO } from "../../../app/models/Projection/projectionDto";
import ProjectionStore from '../../../app/stores/projectionStore';

interface IProps {
  projection: IProjectionDTO;
}

const EditProjectionForm: React.FC<IProps> = ({ projection: initialFormState }) => {
  const [projection, setProjection] = useState<IProjectionDTO>(initialFormState);
  const projectionStore = useContext(ProjectionStore);
  const {
    movieTitleRecord,
    hallNameRecord,
    editProjection,
    submitting,
    cancelEditFormOpen
  } = projectionStore;

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setProjection({ ...projection, [name]: value });
  };

  // const handleChange = (e: any, result: any) => {
  //   const { name, value } = result;
  //   setProjection({
  //     ...projection,
  //     [name]: value,
  //   });
  // };

  const handleChangeMovie = (e: any, result: any) => {
    const {value } = result;
    setProjection({
      ...projection,
      movie: {movieID:value}
    });
  };

  const handleChangeHall = (e: any, result: any) => {
    const { name, value } = result;
    setProjection({
      ...projection,
      hall:{hallID:value}
    });
  };

  const handleSubmit = () => {
    editProjection({
      projectionID: projection.projectionID,
      dateOfProjection: projection.dateOfProjection,
      timeOfProjection:projection.timeOfProjection.toString(),
      movieID: +projection.movie.movieID,
      hallID: +projection.hall.hallID,
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
      <Form.Input
          value = {projection.dateOfProjection}
          onChange={handleInputChange}
          label="DateOfProjection"
          type='date'
          placeholder="datum"
          name="dateOfProjection"
        />
        <Form.Input
        value = {projection.timeOfProjection}
        onChange={handleInputChange}
          label="TimeOfProjection"
          type='HH:mm:ss'
          placeholder="vreme"
          name="timeOfProjection"
        />
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            loading={submitting}
            style={{ width: "50%", marginRight: 10 }}
            positive
            type="submit"
            content="Save"
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
