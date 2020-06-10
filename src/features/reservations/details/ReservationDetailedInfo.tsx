import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { IReservationDTO } from '../../../app/models/Reservation/reservationDto'

const ReservationDetailedInfo: React.FC<{ reservation: IReservationDTO }> = ({ reservation }) => {
  return (
    <Segment.Group>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon name='time' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{reservation.projection.timeOfProjection}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{reservation.projection.dateOfProjection}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='heart' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={10}>
            <span>Movie: {reservation.projection.movieID}</span>
            <span>Hall: {reservation.projection.hallID}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      {/* <Segment attached>
                <Grid verticalAlign='middle'>
                  <Grid.Column width={1}>
                    <Icon name='calendar' size='large' color='teal' />
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <span>Year of publication: {reservation.review.yearOfPublication}</span>
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment attached>
                <Grid verticalAlign='middle'>
                <Grid.Column width={1}>
                    <Icon size='large' color='teal' name='info' />
                  </Grid.Column>
                  <Grid.Column width={9}>
                    <p>{reservation.review.description}</p>
                  </Grid.Column>
                </Grid>
              </Segment> */}
    </Segment.Group>

  )
}
export default ReservationDetailedInfo
