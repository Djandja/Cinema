import React, { useContext } from 'react'
import { Card, Image, Button, Grid, GridColumn } from 'semantic-ui-react'
import MovieStore from '../../../app/stores/movieStore';
import { observer } from 'mobx-react-lite'
import MovieDetailedHeader from './MovieDetailedHeader';
import MovieDetailedInfo from './MovieDetailedInfo';


const MovieDetails: React.FC = () => {
    const movieStore = useContext(MovieStore);
    const { selectedMovie: movie, openEditForm, cancelSelectedMovie } = movieStore;
    return (
        <Grid>
            <GridColumn width={16}>
                <MovieDetailedHeader movie={movie!}/>
                <MovieDetailedInfo movie={movie!}/>
            </GridColumn>
        </Grid>
    )
}

export default observer(MovieDetails);