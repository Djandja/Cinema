import React, { useContext } from 'react'
import { Item, Button, Label, Segment, Icon } from 'semantic-ui-react'
import ProjectionStore from '../../../app/stores/projectionStore';
import { IProjectionDTO } from '../../../app/models/Projection/projectionDto';

const ProjectionListItem: React.FC<{ projection: IProjectionDTO }> = ({ projection }) => {
    const projectionStore = useContext(ProjectionStore);
    const {
        projectionsDTO: projections,
        selectProjection,
        deleteProjection,
        submitting,
        target
    } = projectionStore;
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item >
                        <Item.Image size='tiny' circular src='/assets/categoryImages/projection.png' />
                        <Item.Content>
                            <Item.Header as='a'>{projection.movie.title}</Item.Header>
                            <Item.Meta>Sala: {projection.hall.nameOfHall}</Item.Meta>
                        </Item.Content>
                    </Item>
                </Item.Group>

            </Segment>
            <Segment>
                <Icon name='calendar' /> {projection.dateOfProjection}
            </Segment>
            <Segment>
                <Icon name='clock' /> {projection.timeOfProjection}
            </Segment>
            <Segment clearing>
            <Icon name='unmute' />Synchronization: {+(projection.movie.synchronization)!}
                <Button
                    onClick={() => selectProjection(projection.projectionID)}
                    floated='right'
                    content='View'
                    color='blue'
                />
                <Button
                  name={projection.projectionID}
                loading={+target === projection.projectionID && submitting}
                onClick={(e) => deleteProjection(e, projection.projectionID)}
                floated='right' 
                content='Delete' 
                color='red'
                 />
            </Segment>
        </Segment.Group>

    )
}

export default ProjectionListItem
