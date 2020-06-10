import React, { useContext } from 'react'
import { Card, Image, Button, Grid, GridColumn } from 'semantic-ui-react'
import ReservationStore from '../../../app/stores/reservationStore';
import { observer } from 'mobx-react-lite'
import ReservationDetailedHeader from './ReservationDetailedHeader';
import ReservationDetailedInfo from './ReservationDetailedInfo';


const ReservationDetails: React.FC = () => {
    const reservationStore = useContext(ReservationStore);
    const { selectedReservation: reservation, openEditForm, cancelSelectedReservation } = reservationStore;
    return (
        <Grid>
            <GridColumn width={16}>
                <ReservationDetailedHeader reservation={reservation!}/>
                <ReservationDetailedInfo reservation={reservation!}/>
            </GridColumn>
        </Grid>
    )
}

export default observer(ReservationDetails);