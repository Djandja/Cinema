import React, { useContext } from 'react'
import { Menu, Segment, Button, Container } from 'semantic-ui-react'
import ProjectionStore from '../../app/stores/projectionStore';
import { observer } from 'mobx-react-lite'



const NavBar: React.FC = () => {
    const projectionStore = useContext(ProjectionStore);
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src="/assets/categoryImages/logo.png" alt="logo" style={{marginRight: 10}} />
                        Reactivities
                    </Menu.Item>

                <Menu.Item
                    name='Activities'
                />
                <Menu.Item>
                    <Button onClick={projectionStore.openCreateForm} color='orange' content='Create Projection' />
                </Menu.Item>
            </Container>
        </Menu>


    )
}
export default observer (NavBar);
