import React, { useContext } from 'react'
import { Card, Image, Button, Grid, GridColumn } from 'semantic-ui-react'
import ReviewStore from '../../../app/stores/reviewStore';
import { observer } from 'mobx-react-lite'
import ReviewDetailedHeader from './ReviewDetailedHeader';


const ReviewDetails: React.FC = () => {
    const reviewStore = useContext(ReviewStore);
    const { selectedReview: review, openEditForm, cancelSelectedReview } = reviewStore;
    return (
        <Grid>
            <GridColumn width={16}>
                <ReviewDetailedHeader review={review!}/>
            </GridColumn>
        </Grid>
    )
}

export default observer(ReviewDetails);