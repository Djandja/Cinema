import React from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/projection'

interface IProps {
    projections: IActivity[]
    selectProjection: (id: string) => void;
}

const ActivityList: React.FC<IProps> = ({ projections, selectProjection }) => {
    return (
        <Segment clearing>
            <Item.Group divided>
                {projections.map(projection => (
                    <Item key={projection.projectionID}>
                        <Item.Content>
                            <Item.Header as='a'>{projection.movieID}</Item.Header>
                            <Item.Meta>Nesto</Item.Meta>
                            <Item.Description>
                                <div> Vreme prikazivanja {projection.timeOfProjection} </div>
                                <div> Datum prikazivanja {projection.dateOfProjection} </div>
                            </Item.Description>
                            <Item.Extra>
                                <Button
                                onClick={() => selectProjection(projection.projectionID)}
                                floated='right' 
                                content='View' 
                                color='orange'
                                 />
                                <Label basic content='Category' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}



            </Item.Group>
        </Segment>

    )
}

export default ActivityList
