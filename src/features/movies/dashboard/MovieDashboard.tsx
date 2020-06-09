import React, { useContext } from 'react'
import { Grid,  GridColumn } from 'semantic-ui-react'
import MovieList from './MovieList'
import MovieDetails from '../details/MovieDetails'
import { observer } from 'mobx-react-lite'
import MovieStore from '../../../app/stores/movieStore';
import EditMovieForm from '../form/EditMovieForm'
import CreateMovieForm from '../form/CreateMovieForm'


const MovieDashboard: React.FC = () => {
    const movieStore = useContext(MovieStore);
    const {createMode, selectedMovie, editMode} = movieStore
    return (
        <Grid>
            <Grid.Column width={10}>
                <MovieList />
            </Grid.Column>
            <GridColumn width={6}>
                {selectedMovie && !editMode && <MovieDetails/>}
                {editMode && <EditMovieForm movie={selectedMovie!}/>}  
                    {/* key={selectedMovie && selectedMovie.movieID || 0}
                    movie={selectedMovie!}      */}
                {createMode && <CreateMovieForm/>}
            </GridColumn>
        </Grid>
    );

};

export default observer(MovieDashboard);