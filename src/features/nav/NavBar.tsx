import React, { useContext, Fragment } from 'react'
import { Menu, Segment, Button, Container, Label, Input, Dropdown } from 'semantic-ui-react'
import ProjectionStore from '../../app/stores/projectionStore';
import { observer } from 'mobx-react-lite'
import { Link, NavLink } from 'react-router-dom';



const NavBar: React.FC = () => {
    const projectionStore = useContext(ProjectionStore);
    return (
        <Fragment>
            <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item header as={NavLink} exact to='/'>
                        <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
                        Movies
                    </Menu.Item>

                    <Menu.Item
                        name='Projections' as={NavLink} to='/projections'
                    />
                    <Menu.Item
                        name='Movies' as={NavLink} to='/movies'
                    />
                    <Menu.Item
                        name='Reviews' as={NavLink} to='/reviews'
                    />
                     <Menu.Item
                        name='Reservations' as={NavLink} to='/reservations'
                    />
                    {/* <Menu.Item>
                        <Button
                            as={NavLink} to='/createProjection'
                            color='teal' content='Create Projection' />
                        <Button
                            as={NavLink} to='/createMovie'
                            color='teal' content='Create Movie' />
                    </Menu.Item> */}
                    <Dropdown.Item>
                        <Dropdown text='Create'>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                <Button
                                    as={NavLink} to='/createProjection'
                                    color='teal' content='Create Projection' />
                                </Dropdown.Item>
                                <Dropdown.Item>
                                <Button
                                    as={NavLink} to='/createMovie'
                                    color='teal' content='Create Movie' />
                                </Dropdown.Item>
                                <Dropdown.Item>
                                <Button
                                    as={NavLink} to='/createReview'
                                    color='teal' content='Create Review' />
                                </Dropdown.Item>
                                <Dropdown.Item>
                                <Button
                                    as={NavLink} to='/createReservation'
                                    color='teal' content='Create Reservation' />
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Dropdown.Item>
                </Container>
            </Menu>

        </Fragment>

    )
}
export default observer(NavBar);