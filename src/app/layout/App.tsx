import React, { useState, useEffect, Fragment } from 'react';
import { Header, Icon, List, Container } from 'semantic-ui-react'
import axios from 'axios';
import { IActivity } from '../models/projection';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from '../../features/nav/NavBar';

const App = () => {

  const [projections, setProjections] = useState<IActivity[]>([])
  const [selectedProjection, setSelectedProjection] = useState<IActivity | null>(null);

  const [editMode, setEditMode] = useState(false);

  const handleSelectProjection = (id: string) => {
    setSelectedProjection(projections.filter(a => a.projectionID == id)[0])
  }

  const handleOpenCreateForm = () => {
    setSelectedProjection(null);
    setEditMode(true);
  }

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:8081/api/projections')
      .then((response) => {
        setProjections(response.data)
      });
  }, []);



  return (
    <Fragment>
      <NavBar openCreateForm= {handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          projections={projections}
          selectProjection={handleSelectProjection}
          selectedProjection={selectedProjection}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedProjection={setSelectedProjection} />
      </Container>
    </Fragment>
  );


}

export default App;
