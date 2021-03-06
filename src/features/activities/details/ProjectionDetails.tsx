import React, { useContext } from 'react'
import { Card, Image, Button, Grid, GridColumn } from 'semantic-ui-react'
import ProjectionStore from '../../../app/stores/projectionStore';
import { observer } from 'mobx-react-lite'
import ProjectionDetailedHeader from './ProjectionDetailedHeader';
import ProjectionDetailedInfo from './ProjectionDetailedInfo';


const ProjectionDetails: React.FC = () => {
    const projectionStore = useContext(ProjectionStore);
    const { selectedProjection: projection, openEditForm, cancelSelectedProjection } = projectionStore;
    return (
        <Grid>
            <GridColumn width={16}>
                <ProjectionDetailedHeader projection={projection!}/>
                <ProjectionDetailedInfo projection={projection!}/>
            </GridColumn>
        </Grid>
        // <Card fluid>
        //     <Image src={'/assets/categoryImages/cinema.png'} wrapped ui={false} />
        //     <Card.Content>
        //         <Card.Header>Film {projection!.movie.title}
        //         </Card.Header>
        //         <Card.Meta>
        //             <span >{projection!.dateOfProjection}</span>
        //         </Card.Meta>
        //         <Card.Meta>
        //             <span >{projection!.timeOfProjection}</span>
        //         </Card.Meta>
        //         <Card.Meta>
        //             <span>{projection!.hall.nameOfHall}</span>
        //         </Card.Meta>
        //         <Card.Description>
        //             Opis
        //         </Card.Description>
        //     </Card.Content>
        //     <Card.Content extra>
        //         <Button.Group widths={2}>
        //             <Button onClick={() => openEditForm(projection!.projectionID)}
        //                 round
        //                 color='grey'
        //                 content='Edit'
        //             />
        //             <Button onClick={cancelSelectedProjection}
        //                 round
        //                 color='grey'
        //                 content='Cancel'
        //             />
        //         </Button.Group>
        //     </Card.Content>
        // </Card>
    )
}

export default observer(ProjectionDetails);