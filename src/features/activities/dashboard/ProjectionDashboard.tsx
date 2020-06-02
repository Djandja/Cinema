import React, { useContext } from 'react'
import { Grid,  GridColumn } from 'semantic-ui-react'
import ProjectionList from './ProjectionList'
import ProjectionDetails from '../details/ProjectionDetails'
import { observer } from 'mobx-react-lite'
import ProjectionStore from '../../../app/stores/projectionStore';
import EditProjectionForm from '../form/EditProjectionForm'
import CreateProjectionForm from '../form/CreateProjectionForm'


const ProjectionDashboard: React.FC = () => {
    const projectionStore = useContext(ProjectionStore);
    const {createMode, selectedProjection, editMode} = projectionStore
    return (
        <Grid>
            <Grid.Column width={10}>
                <ProjectionList />
            </Grid.Column>
            <GridColumn width={6}>
                {selectedProjection && !editMode && <ProjectionDetails/>}
                {editMode && <EditProjectionForm projection={selectedProjection!}/>}  
                    {/* key={selectedProjection && selectedProjection.projectionID || 0}
                    projection={selectedProjection!}      */}
                {createMode && <CreateProjectionForm/>}
            </GridColumn>
        </Grid>
    );

};

export default observer(ProjectionDashboard);