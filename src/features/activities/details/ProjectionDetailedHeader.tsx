import React, { useContext } from 'react'
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react'
import { IProjectionDTO } from '../../../app/models/Projection/projectionDto';
import { observer } from 'mobx-react-lite';
import ProjectionStore from '../../../app/stores/projectionStore';

const activityImageStyle = {
  filter: 'brightness(30%)'
};

const activityImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const ProjectionDetailedHeader: React.FC<{ projection: IProjectionDTO }> = ({ projection }) => {
  const projectionStore = useContext(ProjectionStore);
    const { selectedProjection, openEditForm, cancelSelectedProjection } = projectionStore;
    
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image src={'/assets/categoryImages/cinema.png'} fluid />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={projection.movie.title}
                  style={{ color: 'white' }}
                />
                <p> Sala: {projection.hall.nameOfHall}</p>
                <p> Sala {projection.hall.nameOfHall}</p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment>
        <p>Datum prikazivanja: <strong>{projection.dateOfProjection}</strong></p>
        <p>
          Vreme prikazivanja: <strong>{projection.timeOfProjection}</strong> 
        </p>
      </Segment>
      <Segment clearing attached='bottom'>
        <Button color='red'>Make a reservation</Button>
        <Button onClick={cancelSelectedProjection}>
          Cancel
           </Button>
        <Button 
        onClick={() => openEditForm(projection!.projectionID)}
        color='blue' floated='right'>
          Edit Projection
                </Button>
      </Segment>
    </Segment.Group>
  )
}
export default observer(ProjectionDetailedHeader);