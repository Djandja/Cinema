import React, { useContext } from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import ProjectionStore from '../../../app/stores/projectionStore';


const ProjectionList: React.FC = () => {
    const projectionStore = useContext(ProjectionStore);
    const {
        projectionsDTO: projections,
        projectionByDate,
        selectProjection, 
        deleteProjection, 
        submitting, 
        target
    }= projectionStore;
    return (
        <Segment clearing>
            <Item.Group divided>
                {/* {projectionByDate.map(projection => ( */}
                {projections.map((projection) => (
                    <Item key={projection.projectionID}>
                        <Item.Content>
                            <Item.Header as='a'>{projection.movie.title}</Item.Header>
                            <Item.Meta>Ime sale{projection.hall.nameOfHall}</Item.Meta>
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
                                loading={+target === projection.projectionID && submitting}
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

export default observer (ProjectionList);
