import React, { SyntheticEvent } from 'react'
import { Grid,  GridColumn } from 'semantic-ui-react'
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
    createProjection: (projection: IActivity) => void;
    editProjection: (projection: IActivity) =>void;
    deleteProjection: (e: SyntheticEvent<HTMLButtonElement>,id: string) => void;
    submitting: boolean
    target:  string
}

const ActivityDashboard: React.FC<IProps> = ({
    projections,
    selectProjection,
    selectedProjection,
    editMode,
    setEditMode,
    setSelectedProjection,
    createProjection,
    editProjection,
    deleteProjection,
    submitting,
    target
}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList 
                projections={projections} 
                selectProjection={selectProjection} 
                deleteProjection={deleteProjection} 
                submitting={submitting}
                target={target}
                />
            </Grid.Column>
            <GridColumn width={6}>
                {selectedProjection && !editMode && ( 
                <ActivityDetails 
                projection={selectedProjection}
                setEditMode={setEditMode}
                setSelectedProjection={setSelectedProjection}
                />
                )}
                {editMode && (
                <ActivityForm  
                key={selectedProjection && selectedProjection.projectionID || 0}
                setEditMode={setEditMode} projection={selectedProjection!}
                createProjection= {createProjection} 
                editProjection={editProjection}
                submitting={submitting}
                />
                )}
            </GridColumn>
        </Grid>
    );

};

export default ActivityDashboard