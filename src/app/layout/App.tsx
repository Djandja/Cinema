import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react';
import { Container } from 'semantic-ui-react'
import axios from 'axios';
import { IActivity } from '../models/projection';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from '../../features/nav/NavBar';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

const App = () => {

  const [projections, setProjections] = useState<IActivity[]>([])
  const [selectedProjection, setSelectedProjection] = useState<IActivity | null>(null);

  const [editMode, setEditMode] = useState(false);
  const[loading, setLoading] = useState(true);
  const[submitting, setSubmitting] = useState(false);
  const[target, setTarget]= useState('');

  const handleSelectProjection = (id: string) => {
    setSelectedProjection(projections.filter(a => a.projectionID == id)[0])
    setEditMode(false);
  }

  const handleOpenCreateForm = () => {
    setSelectedProjection(null);
    setEditMode(true);
  }

  const handleCreateProjection = (projection: IActivity) => {
    setSubmitting(true);
    agent.Projections.create(projection).then(() => {
      setProjections([...projections, projection])
      setSelectedProjection(projection);
      setEditMode(false);
    }).then(()=> setSubmitting(false))
  }

  const handleEditProjection = (projection: IActivity) => {
    setSubmitting(true);
    agent.Projections.update(projection).then(() => {
      setProjections([...projections.filter(a => a.projectionID !== projection.projectionID), projection])
      setSelectedProjection(projection);
      setEditMode(false);
    }).then(()=> setSubmitting(false))
  }


  const handleDeleteProjection = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Projections.delete(id).then(() => {
      setProjections([...projections.filter(a => a.projectionID == id)])
    }).then(()=> setSubmitting(false))
  }

  useEffect(() => {
    agent.Projections.list()
      .then((response) => {
        let projections: IActivity[] = [];
        response.forEach((projection) => {
          projection.dateOfProjection = projection.dateOfProjection.split('.')[0];
          projections.push(projection);
        })
        setProjections(projections)
      }).then(()=> setLoading(false));
  }, []);

if(loading)return <LoadingComponent content='Ucitavanje projekcija...'/>

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          projections={projections}
          selectProjection={handleSelectProjection}
          selectedProjection={selectedProjection}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedProjection={setSelectedProjection}
          createProjection={handleCreateProjection}
          editProjection={handleEditProjection}
          deleteProjection={handleDeleteProjection}
          submitting= {submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );


}

export default App;
