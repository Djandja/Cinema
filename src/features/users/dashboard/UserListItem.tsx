import React, { useContext } from 'react'
import { Item, Button, Label, Segment, Icon, ItemContent } from 'semantic-ui-react'
import UserStore from '../../../app/stores/userStore';
import { IProjectionDTO } from '../../../app/models/Projection/projectionDto';
import { IUserDTO } from '../../../app/models/User/userDto';

const UserListItem: React.FC<{ user: IUserDTO }> = ({ user }) => {
    const userStore = useContext(UserStore);
    const {
        usersDTO: users,
        selectUser,
        deleteUser,
        submitting,
        target
    } = userStore;
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item >
                        <Item.Image size='small' src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as='a'>{user.firstName}</Item.Header>
                            <Item.Header as='a'>{}</Item.Header>
                            <Item.Header as='a'> {user.lastName}</Item.Header>
                            <Item.Description>
                        <Icon size='big' name='transgender' />  {user.sex}
                    </Item.Description>
                        </Item.Content>
                    </Item>                    
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='phone' /> {user.noTelephone}
               </Segment>
            <Segment>
                <Icon name='at' /> {user.email}
            </Segment>
            <Segment>
                <Icon name='key' />{'#######'}
            </Segment>

            <Segment clearing>
                {/* <span>{user.user.description}</span> */}
                <Button
                    onClick={() => selectUser(user.userID)}
                    floated='right'
                    content='View'
                    color='blue'
                />
                <Button
                    name={user.userID}
                    loading={+target === user.userID && submitting}
                    onClick={(e) => deleteUser(e, user.userID)}
                    floated='right'
                    content='Delete'
                    color='red'
                />
            </Segment>
        </Segment.Group>

    )
}

export default UserListItem
