import React, { SyntheticEvent } from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/projection'

interface IProps {
    projections: IActivity[]
    selectProjection: (id: string) => void;
    deleteProjection: (event: SyntheticEvent<HTMLButtonElement>,id: string) => void;
    submitting: boolean
    target: string
}

const ActivityList: React.FC<IProps> = ({ 
    projections, 
    selectProjection, 
    deleteProjection,
    submitting,
    target
}) => {
    return (
        <Segment clearing>
            <Item.Group divided>
                {projections.map(projection => (
                    <Item key={projection.projectionID}>
                        <Item.Content>
                            <Item.Header as='a'>film id{projection.movieID}</Item.Header>
                            <Item.Meta>Sala id{projection.hallID}</Item.Meta>
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
                                  <Button
                                  name={projection.projectionID}
                                loading={target === projection.projectionID && submitting}
                                onClick={(e) => deleteProjection(e, projection.projectionID)}
                                floated='right' 
                                content='Delete' 
                                color='red'
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
