import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react'
import ProjectionDashboard from '../../features/activities/dashboard/ProjectionDashboard';
import NavBar from '../../features/nav/NavBar';
import LoadingComponent from './LoadingComponent';
import ProjectionStore from '../stores/projectionStore';
import { observer } from 'mobx-react-lite'
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import CreateProjectionForm from '../../features/activities/form/CreateProjectionForm';

const App = () => {

  const projectionStore = useContext(ProjectionStore);

  useEffect(() => {
    projectionStore.loadProjections();
  }, [projectionStore]);

  if (projectionStore.loadingInitial) return <LoadingComponent content='Ucitavanje projekcija...' />

  return (
    <Fragment>
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Route path='/projections' component={ProjectionDashboard} />
            <Route path='/createProjection' component={CreateProjectionForm} />
          </Container>
        </Fragment>
      )} />

    </Fragment>
  );


}

export default observer(App);