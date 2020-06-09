import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react'
import ProjectionDashboard from '../../features/activities/dashboard/ProjectionDashboard';
import NavBar from '../../features/nav/NavBar';
import LoadingComponent from './LoadingComponent';
import ProjectionStore from '../stores/projectionStore';
import MovieStore from '../stores/movieStore';
import { observer } from 'mobx-react-lite'
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import CreateProjectionForm from '../../features/activities/form/CreateProjectionForm';
import MovieDashboard from '../../features/movies/dashboard/MovieDashboard';
import CreateMovieForm from '../../features/movies/form/CreateMovieForm';
import ReviewStore from '../stores/reviewStore';
import ReviewDashboard from '../../features/reviews/dashboard/ReviewDashboard';
import CreateReviewForm from '../../features/reviews/form/CreateReviewForm';

const App = () => {

  const projectionStore = useContext(ProjectionStore);
  const movieStore = useContext(MovieStore);
  const reviewStore = useContext(ReviewStore);

  useEffect(() => {
    projectionStore.loadProjections();
    movieStore.loadMovies();
    reviewStore.loadReviews();
  }, [projectionStore, movieStore,reviewStore ]);

  if (projectionStore.loadingInitial) return <LoadingComponent content='Loading projections...' />
  if (movieStore.loadingInitial) return <LoadingComponent content='Loading movies...' />
   if (reviewStore.loadingInitial) return <LoadingComponent content='Loading reviews...' />

  return (
    <Fragment>
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Route path='/projections' component={ProjectionDashboard} />
            <Route path='/movies' component={MovieDashboard} />
            <Route path='/reviews' component={ReviewDashboard} />
            <Route path='/createProjection' component={CreateProjectionForm} />
            <Route path='/createMovie' component={CreateMovieForm} />
            <Route path='/createReview' component={CreateReviewForm} />
          </Container>
        </Fragment>
      )} />

    </Fragment>
  );


}

export default observer(App);