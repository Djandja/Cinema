import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button, Dropdown } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ProjectionStore from '../../../app/stores/projectionStore';
import { IProjectionPostUpdate } from "../../../app/models/Projection/projectionPostUpdate";

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
  } = projectionStore;
  const [projection, setProjection] = useState(initializeForm);

  const handleSubmit = () => {
    let newProjection: IProjectionPostUpdate = {
      dateOfProjection: projection.dateOfProjection,
      timeOfProjection: projection.timeOfProjection,
      movieID: +projection.movie,
      hallID: +projection.hall,
    };
    createProjection(newProjection);
  };

  const handleChange = (e: any, result: any) => {
    const { name, value } = result;
    setProjection({
      ...projection,
      [name]: value,
    });
  };
  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setProjection({ ...projection, [name]: value });
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
          onChange={handleInputChange}
          label="Date Of Projection"
          type="date"
          placeholder="31.12.2020"
          name="dateOfProjection"
        />
        <Form.Input
          onChange={handleInputChange}
          label="Time Of Projection"
          type="HH:mm:ss"
          placeholder="20:00:00"
          name="timeOfProjection"
        />
        <Form.Field
          name="movie"
          fluid
          control={Dropdown}
          selection
          placeholder="Frozen 2"
          value={projection.movie}
          options={optionsMovie}
          onChange={handleChange}
        />
        <Form.Field
          name="hall"
          fluid
          control={Dropdown}
          selection
          placeholder="Sala 1"
          value={projection.hall}
          options={optionsHall}
          onChange={handleChange}
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
            onClick={() => cancelCreateFormOpen()}
            style={{ width: "50%" }}
            type="button"
            content="Cancel"
          />
        </div>
      </Form>
    </Segment>
  );
};

export default observer(CreateProjectionForm);
