import React from 'react'
import ActivityList from '../dashboard/ActivityList'
import ActivityDashboard from '../dashboard/ActivityDashboard'
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/projection'

interface IProps {
    projection: IActivity
    setEditMode: (editMode: boolean) => void;
    setSelectedProjection: (projection: IActivity | null) => void;
}

const ActivityDetails: React.FC<IProps> = ({projection, setEditMode,setSelectedProjection}) => {
    return (
        <Card fluid>
            <Image src={'/assets/categoryImages/placeholder.png'} wrapped ui={false} />
            <Card.Content>
                <Card.Header>Title</Card.Header>
                <Card.Meta>
                    <span >{projection.dateOfProjection}</span>
                    <span >{projection.timeOfProjection}</span>
                </Card.Meta>
                <Card.Description>
                    Opis
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button onClick={()=> setEditMode(true)}
                    round 
                    color='grey' 
                    content='Edit' 
                    />
                    <Button onClick={() => setSelectedProjection(null)}
                    round 
                    color='grey' 
                    content='Cancel' 
                    />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default ActivityDetails