import React, { useContext } from 'react'
import { Item, Button, Label, Segment, Icon } from 'semantic-ui-react'
import ReservationStore from '../../../app/stores/reservationStore';
import { IProjectionDTO } from '../../../app/models/Projection/projectionDto';
import { IReservationDTO } from '../../../app/models/Reservation/reservationDto';

const ReservationListItem: React.FC<{ reservation: IReservationDTO }> = ({ reservation }) => {
    const reservationStore = useContext(ReservationStore);
    const {
        reservationsDTO: reservations,
        selectReservation,
        deleteReservation,
        submitting,
        target
    } = reservationStore;
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item >
                        <Item.Image size='small' src='/assets/seats1.png' />
                        <Item.Content>
                            <Item.Header as='a'>{reservation.startDate}</Item.Header>
                            <Item.Meta> {reservation.exparationDateTime} Exparation date</Item.Meta>
                            <Item.Description>
                                <div>Seat No: <strong>{reservation.seatNo} </strong> </div>
                                <div>Row No: <strong>{reservation.rowNo} </strong> </div>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>

            </Segment>
            <Segment>
                <Icon name='info' /> Movie: {reservation.projection.movieID}
                <Icon name='info' /> Projection: {reservation.projection.projectionID}
                <Icon name='time' /> {reservation.projection.timeOfProjection}
                <Icon name='calendar' /> {reservation.projection.dateOfProjection}

            </Segment>
            <Segment>
                <Icon name='user' /> {reservation.user.firstName}
                <Icon /> {reservation.user.lastName}
                
            </Segment>
            <Segment>
            <Icon name='mail' /> {reservation.user.email}
            </Segment>
            <Segment clearing>
                {/* <span>{reservation.review.description}</span> */}
                <Button
                    onClick={() => selectReservation(reservation.reservationID)}
                    floated='right'
                    content='View'
                    color='blue'
                />
                <Button
                    name={reservation.reservationID}
                    loading={+target === reservation.reservationID && submitting}
                    onClick={(e) => deleteReservation(e, reservation.reservationID)}
                    floated='right'
                    content='Delete'
                    color='red'
                />
            </Segment>
        </Segment.Group>

    )
}

export default ReservationListItem
