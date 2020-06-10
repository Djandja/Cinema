import React, { useContext } from 'react'
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react'
import { IReservationDTO } from '../../../app/models/Reservation/reservationDto';
import { observer } from 'mobx-react-lite';
import ReservationStore from '../../../app/stores/reservationStore';

const activityImageStyle = {
  filter: 'brightness(30%)'
};

const activityImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'black',
};

const ReservationDetailedHeader: React.FC<{ reservation: IReservationDTO }> = ({ reservation }) => {
  const reservationStore = useContext(ReservationStore);
  const { selectedReservation, openEditForm, cancelSelectedReservation } = reservationStore;

  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image src={'/assets/reservation.png'} fluid />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <p> <strong>Reservation date {reservation.startDate}</strong></p>
                <p> <strong>Exparation date {reservation.exparationDateTime} </strong></p>

              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment>
        <p> Seat no: {reservation.seatNo}</p>
        <p> Row no: {reservation.rowNo}</p>
        <p>Projection <strong>{reservation.projection.projectionID}</strong></p>
        <p> <strong>{reservation.user.firstName}</strong></p>
        <p> <strong>{reservation.user.lastName}</strong></p>
        <p> <strong>{reservation.user.email}</strong></p>
      </Segment>
      <Segment clearing attached='bottom'>
        <Button onClick={cancelSelectedReservation}>
          Cancel
           </Button>
        <Button
          onClick={() => openEditForm(reservation!.reservationID)}
          color='blue' floated='right'>
          Edit Reservation
                </Button>
      </Segment>
    </Segment.Group>
  )
}
export default observer(ReservationDetailedHeader);