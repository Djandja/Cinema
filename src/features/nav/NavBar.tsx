import React, { useContext } from 'react'
import { Menu, Segment, Button, Container } from 'semantic-ui-react'
import ProjectionStore from '../../app/stores/projectionStore';
import { observer } from 'mobx-react-lite'
import { Link, NavLink } from 'react-router-dom';



const NavBar: React.FC = () => {
    const projectionStore = useContext(ProjectionStore);
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header as={NavLink} exact to='/'>
                    <img src="/assets/categoryImages/logo.png" alt="logo" style={{marginRight: 10}} />
                        Reactivities
                    </Menu.Item>

                <Menu.Item
                    name='Activities' as={NavLink} to='/projections'
                />
                <Menu.Item>
                    <Button 
                    as={NavLink} to='/createProjection' 
                    color='orange' content='Create Projection' />
                </Menu.Item>
            </Container>
        </Menu>


    )
}
export default observer (NavBar);