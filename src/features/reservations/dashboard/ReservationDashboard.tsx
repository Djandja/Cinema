import React, { useContext } from 'react'
import { Grid,  GridColumn } from 'semantic-ui-react'
import ReservationList from './ReservationList'
import ReservationDetails from '../details/ReservationDetails'
import { observer } from 'mobx-react-lite'
import ReservationStore from '../../../app/stores/reservationStore';
import EditReservationForm from '../form/EditReservationForm'
import CreateReservationForm from '../form/CreateReservationForm'


const ReservationDashboard: React.FC = () => {
    const reservationStore = useContext(ReservationStore);
    const {createMode, selectedReservation, editMode} = reservationStore
    return (
        <Grid>
            <Grid.Column width={10}>
                <ReservationList />
            </Grid.Column>
            <GridColumn width={6}>
                {selectedReservation && !editMode && <ReservationDetails/>}
                {editMode && <EditReservationForm reservation={selectedReservation!}/>}  
                    {/* key={selectedReservation && selectedReservation.reservationID || 0}
                    reservation={selectedReservation!}      */}
                {createMode && <CreateReservationForm/>}
            </GridColumn>
        </Grid>
    );

};

export default observer(ReservationDashboard);