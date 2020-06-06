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
                            <Item.Description>
                                {/* <div> Vreme prikazivanja {projection.timeOfProjection} </div>
                            <div> Datum prikazivanja {projection.dateOfProjection} </div> */}
                            </Item.Description>
                            <Item.Extra>

                                {/* <Button
                  name={projection.projectionID}
                loading={+target === projection.projectionID && submitting}
                onClick={(e) => deleteProjection(e, projection.projectionID)}
                floated='right' 
                content='Delete' 
                color='red'
                 /> */}
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>

            </Segment>
            <Segment>
                <Icon name='calendar' /> {projection.dateOfProjection}
                <Icon name='clock' /> {projection.timeOfProjection}
            </Segment>
            <Segment secondary>
                nesto ide ovde
            </Segment>
            <Segment clearing>
                <span> opis</span>
                <Button
                    onClick={() => selectProjection(projection.projectionID)}
                    floated='right'
                    content='View'
                    color='blue'
                />
            </Segment>
        </Segment.Group>

    )
}

export default ProjectionListItem
