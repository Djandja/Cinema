import React, { useContext } from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import ProjectionStore from '../../../app/stores/projectionStore';
import ProjectionListItem from './ProjectionListItem';


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
            <Item.Group divided>
                {/* {projectionByDate.map(projection => ( */}
                {projectionByDate.map((projection) => (
                   <ProjectionListItem key={projection.projectionID} projection={projection}/>
                ))}
            </Item.Group>

    )
}

export default observer (ProjectionList);