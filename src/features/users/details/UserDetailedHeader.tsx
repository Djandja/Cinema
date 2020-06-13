import React, { useContext } from 'react'
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react'
import { IUserDTO } from '../../../app/models/User/userDto';
import { observer } from 'mobx-react-lite';
import UserStore from '../../../app/stores/userStore';

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'dark grey'
};


const UserDetailedHeader: React.FC<{ user: IUserDTO }> = ({ user }) => {
    const userStore = useContext(UserStore);
    const { selectedUser, openEditForm, cancelSelectedUser } = userStore;

    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>

                <Image src={'/assets/goldUser.png'} fluid />

                <Segment basic style={activityImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={user.email}
                                    style={{ color: 'black' }}
                                />
                                <p> Name: {user.firstName}</p>
                                <p> Lastname: {user.lastName}</p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment>
                <Item.Description>
                    <div> {user.noTelephone} </div>
                    <div> {user.sex} </div>
                </Item.Description>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button onClick={cancelSelectedUser}>
                    Cancel
           </Button>
                <Button
                    onClick={() => openEditForm(user!.userID)}
                    color='blue' floated='right'>
                    Edit User
                </Button>
            </Segment>
        </Segment.Group>
    )
}
export default observer(UserDetailedHeader);