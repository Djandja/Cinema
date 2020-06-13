import React, { useContext } from 'react'
import { Card, Image, Button, Grid, GridColumn } from 'semantic-ui-react'
import UserStore from '../../../app/stores/userStore';
import { observer } from 'mobx-react-lite'
import UserDetailedHeader from './UserDetailedHeader';


const UserDetails: React.FC = () => {
    const userStore = useContext(UserStore);
    const { selectedUser: user, openEditForm, cancelSelectedUser } = userStore;
    return (
        <Grid>
            <GridColumn width={16}>
                <UserDetailedHeader user={user!}/>
            </GridColumn>
        </Grid>
    )
}

export default observer(UserDetails);