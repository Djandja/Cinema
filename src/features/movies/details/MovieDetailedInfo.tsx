import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { IMovieDTO } from '../../../app/models/Movie/movieDto'

 const MovieDetailedInfo : React.FC<{movie :IMovieDTO}> = ({movie}) => {
    return (
        <Segment.Group>
              <Segment attached='top'>
                <Grid>
                <Grid.Column width={1}>
                    <Icon name='heart' size='large' color='teal' />
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <span>Genre: {String(movie.genre.nameOfGenre)!}</span>
                  </Grid.Column>                  
                </Grid>
              </Segment>
              <Segment attached>
                <Grid verticalAlign='middle'>
                  <Grid.Column width={1}>
                    <Icon name='users' size='large' color='teal' />
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <span>Actors: {movie.review.actors}</span>
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment attached>
                <Grid verticalAlign='middle'>
                  <Grid.Column width={1}>
                    <Icon name='calendar' size='large' color='teal' />
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <span>Year of publication: {movie.review.yearOfPublication}</span>
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment attached>
                <Grid verticalAlign='middle'>
                <Grid.Column width={1}>
                    <Icon size='large' color='teal' name='info' />
                  </Grid.Column>
                  <Grid.Column width={9}>
                    <p>{movie.review.description}</p>
                  </Grid.Column>
                </Grid>
              </Segment>
            </Segment.Group>

    )
}
export default MovieDetailedInfo
