import React, { useContext } from 'react'
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react'
import { IMovieDTO } from '../../../app/models/Movie/movieDto';
import { observer } from 'mobx-react-lite';
import MovieStore from '../../../app/stores/movieStore';

const activityImageStyle = {
  filter: 'brightness(30%)'
};

const activityImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'gold'
};

const MovieDetailedHeader: React.FC<{ movie: IMovieDTO }> = ({ movie }) => {
  const movieStore = useContext(MovieStore);
    const { selectedMovie, openEditForm, cancelSelectedMovie } = movieStore;
    
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image src={'/assets/movieTime.png'} fluid />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={movie.title}
                  style={{ color: 'white' }}
                />
                <p> Directed by: {movie.director}</p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment>
        <p>Rating <strong>{movie.ratings}</strong></p>
        <p> <strong>{movie.minutes}</strong></p>
        <p> Synchronization: <strong>{String(movie.synchronization)!}</strong></p>
      </Segment>
      <Segment clearing attached='bottom'>
        <Button onClick={cancelSelectedMovie}>
          Cancel
           </Button>
        <Button 
        onClick={() => openEditForm(movie!.movieID)}
        color='blue' floated='right'>
          Edit Movie
                </Button>
      </Segment>
    </Segment.Group>
  )
}
export default observer(MovieDetailedHeader);