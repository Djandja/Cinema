import React, { useContext } from 'react'
import { Item, Button, Label, Segment, Icon } from 'semantic-ui-react'
import MovieStore from '../../../app/stores/movieStore';
import { IProjectionDTO } from '../../../app/models/Projection/projectionDto';
import { IMovieDTO } from '../../../app/models/Movie/movieDto';

const MovieListItem: React.FC<{ movie: IMovieDTO }> = ({ movie }) => {
    const movieStore = useContext(MovieStore);
    const {
        moviesDTO: movies,
        selectMovie,
        deleteMovie,
        submitting,
        target
    } = movieStore;
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item >
                        <Item.Image size='tiny' circular src='/assets/movieShow.png' />
                        <Item.Content>
                            <Item.Header as='a'>{movie.title}</Item.Header>
                            <Item.Meta>Director: {movie.director}</Item.Meta>
                            <Item.Description>
                                <div> Synchronization {String(movie.synchronization)!} </div>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>

            </Segment>
            <Segment>
                <Icon name='star' /> {movie.ratings}
                <Icon name='time' /> {movie.minutes}
            </Segment>
            <Segment secondary>
                <Item.Image size='tiny' circular src='/assets/genre.png' />
                {movie.genre.nameOfGenre}
            </Segment>
            <Segment clearing>
                {/* <span>{movie.review.description}</span> */}
                <Button
                    onClick={() => selectMovie(movie.movieID)}
                    floated='right'
                    content='View'
                    color='blue'
                />
                <Button
                    name={movie.movieID}
                    loading={+target === movie.movieID && submitting}
                    onClick={(e) => deleteMovie(e, movie.movieID)}
                    floated='right'
                    content='Delete'
                    color='red'
                />
            </Segment>
        </Segment.Group>

    )
}

export default MovieListItem
