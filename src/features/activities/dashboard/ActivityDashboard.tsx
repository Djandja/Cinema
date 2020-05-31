import React from 'react'
import { Grid, List, GridColumn } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/projection'
import ActivityList from './ActivityList'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'

interface IProps {
    projections: IActivity[]
    selectProjection: (id: string) => void;
    selectedProjection: IActivity | null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedProjection: (projection: IActivity | null) => void;
}

const ActivityDashboard: React.FC<IProps> = ({
    projections,
    selectProjection,
    selectedProjection,
    editMode,
    setEditMode,
    setSelectedProjection
}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList projections={projections} selectProjection={selectProjection} />
            </Grid.Column>
            <GridColumn width={6}>
                {selectedProjection && !editMode && ( 
                <ActivityDetails 
                projection={selectedProjection}
                setEditMode={setEditMode}
                setSelectedProjection={setSelectedProjection}
                />
                )}
                {editMode && 
                <ActivityForm  setEditMode={setEditMode} projection={selectedProjection!}/>}
            </GridColumn>
        </Grid>
    );

};

export default ActivityDashboard