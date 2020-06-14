import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react'
import ProjectionDashboard from '../../features/activities/dashboard/ProjectionDashboard';
import NavBar from '../../features/nav/NavBar';
import LoadingComponent from './LoadingComponent';
import ProjectionStore from '../stores/projectionStore';
import MovieStore from '../stores/movieStore';
import ReservationStore from '../stores/reservationStore';
import { observer } from 'mobx-react-lite'
import { Route, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import CreateProjectionForm from '../../features/activities/form/CreateProjectionForm';
import MovieDashboard from '../../features/movies/dashboard/MovieDashboard';
import CreateMovieForm from '../../features/movies/form/CreateMovieForm';
import ReviewStore from '../stores/reviewStore';
import ReviewDashboard from '../../features/reviews/dashboard/ReviewDashboard';
import CreateReviewForm from '../../features/reviews/form/CreateReviewForm';
import ReservationDashboard from '../../features/reservations/dashboard/ReservationDashboard';
import CreateReservationForm from '../../features/reservations/form/CreateReservationForm';
import UserStore from '../stores/userStore';
import UserDashboard from '../../features/users/dashboard/UserDashboard';
import CreateUserForm from '../../features/users/form/CreateUserForm';
import { history } from "../..";
import LoginStore from "../stores/loginStore";
import LoginForm from "../../features/login/LoginForm";

const App = () => {

  const projectionStore = useContext(ProjectionStore);
  const movieStore = useContext(MovieStore);
  const reviewStore = useContext(ReviewStore);
  const reservationStore = useContext(ReservationStore);
  const userStore = useContext(UserStore);
  const loginStore = useContext(LoginStore);
  const { isUserAuth } = loginStore;

  useEffect(() => {
    projectionStore.loadProjections();
    movieStore.loadMovies();
    reviewStore.loadReviews();
    reservationStore.loadReservations();
    userStore.loadUsers();
  }, [projectionStore, movieStore,reviewStore, reservationStore, userStore ]);

  useEffect(() => {
    console.log("test");
    history.listen(({ pathname }) => {
      console.log(pathname);
      if (pathname === "/projections" && isUserAuth) {
        projectionStore.loadProjections();
      }
    });
  }, []);

  if (projectionStore.loadingInitial) return <LoadingComponent content='Loading projections...' />
  if (movieStore.loadingInitial) return <LoadingComponent content='Loading movies...' />
   if (reviewStore.loadingInitial) return <LoadingComponent content='Loading reviews...' />
   if (reservationStore.loadingInitial) return <LoadingComponent content='Loading reservations...' />
   if (userStore.loadingInitial) return <LoadingComponent content='Loading users...' />

  return (
    <Fragment>
      <Switch>
         {!isUserAuth && <Route component={LoginForm} />} 
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
          <Switch>
            <Route path='/projections' component={ProjectionDashboard} />
            <Route path='/movies' component={MovieDashboard} />
            <Route path='/reviews' component={ReviewDashboard} />
            <Route path='/reservations' component={ReservationDashboard} />
            <Route path='/users' component={UserDashboard} />
            <Route path='/createProjection' component={CreateProjectionForm} />
            <Route path='/createMovie' component={CreateMovieForm} />
            <Route path='/createReview' component={CreateReviewForm} />
            <Route path='/createReservation' component={CreateReservationForm} />
            <Route path='/createUser' component={CreateUserForm} />
            </Switch>
          </Container>
        </Fragment>
      )} />
</Switch>
    </Fragment>
  );


}

export default observer(App);