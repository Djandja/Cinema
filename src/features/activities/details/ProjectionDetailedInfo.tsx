import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { IProjectionDTO } from '../../../app/models/Projection/projectionDto'

 const ProjectionDetailedInfo : React.FC<{projection :IProjectionDTO}> = ({projection}) => {
    return (
        <Segment.Group>
              <Segment attached='top'>
                <Grid>
                  <Grid.Column width={1}>
                    <Icon size='large' color='teal' name='info' />
                  </Grid.Column>
                  <Grid.Column width={9}>
                    <p>{'Review'}</p>
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment attached>
                <Grid verticalAlign='middle'>
                  <Grid.Column width={1}>
                    <Icon name='pencil' size='large' color='teal' />
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <span>{'Reditelj'}</span>
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment attached>
                <Grid verticalAlign='middle'>
                  <Grid.Column width={1}>
                    <Icon name='star' size='large' color='teal' />
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <span>{'Ocena'}</span>
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment attached>
                <Grid verticalAlign='middle'>
                  <Grid.Column width={1}>
                    <Icon name='unmute' size='large' color='teal' />
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <span>{'Sinhronizacija'}</span>
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment attached>
                <Grid verticalAlign='middle'>
                  <Grid.Column width={1}>
                    <Icon name='time' size='large' color='teal' />
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <span>{'Trajanje minutaza'}</span>
                  </Grid.Column>
                </Grid>
              </Segment>
            </Segment.Group>

    )
}
export default ProjectionDetailedInfo
