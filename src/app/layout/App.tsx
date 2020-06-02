import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react'
import ProjectionDashboard from '../../features/activities/dashboard/ProjectionDashboard';
import NavBar from '../../features/nav/NavBar';
import LoadingComponent from './LoadingComponent';
import ProjectionStore from '../stores/projectionStore';
import { observer } from 'mobx-react-lite'

const App = () => {

  const projectionStore = useContext(ProjectionStore);

  useEffect(() => {
    projectionStore.loadProjections();
  }, [projectionStore]);

if(projectionStore.loadingInitial)return <LoadingComponent content='Ucitavanje projekcija...'/>

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ProjectionDashboard/>
      </Container>
    </Fragment>
  );


}

export default observer(App);
