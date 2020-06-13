import React, { useContext } from 'react'
import { Grid,  GridColumn } from 'semantic-ui-react'
import UserList from './UserList'
import UserDetails from '../details/UserDetails'
import { observer } from 'mobx-react-lite'
import UserStore from '../../../app/stores/userStore';
import EditUserForm from '../form/EditUserForm'
import CreateUserForm from '../form/CreateUserForm'


const UserDashboard: React.FC = () => {
    const userStore = useContext(UserStore);
    const {createMode, selectedUser, editMode} = userStore
    return (
        <Grid>
            <Grid.Column width={10}>
                <UserList />
            </Grid.Column>
            <GridColumn width={6}>
                {selectedUser && !editMode && <UserDetails/>}
                {editMode && <EditUserForm user={selectedUser!}/>}  
                    {/* key={selectedUser && selectedUser.userID || 0}
                    user={selectedUser!}      */}
                {createMode && <CreateUserForm/>}
            </GridColumn>
        </Grid>
    );

};

export default observer(UserDashboard);