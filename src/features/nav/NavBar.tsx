import React from 'react'
import { Menu, Segment, Button, Container } from 'semantic-ui-react'

interface IProps {
    openCreateForm: ()=> void;
}

const NavBar: React.FC<IProps> = ({openCreateForm}) => {
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
                    <Button onClick={openCreateForm} color='orange' content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>


    )
}
export default NavBar
