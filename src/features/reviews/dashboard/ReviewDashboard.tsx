import React, { useContext } from 'react'
import { Grid,  GridColumn } from 'semantic-ui-react'
import ReviewList from './ReviewList'
import ReviewDetails from '../details/ReviewDetails'
import { observer } from 'mobx-react-lite'
import ReviewStore from '../../../app/stores/reviewStore';
import EditReviewForm from '../form/EditReviewForm'
import CreateReviewForm from '../form/CreateReviewForm'


const ReviewDashboard: React.FC = () => {
    const reviewStore = useContext(ReviewStore);
    const {createMode, selectedReview, editMode} = reviewStore
    return (
        <Grid>
            <Grid.Column width={10}>
                <ReviewList />
            </Grid.Column>
            <GridColumn width={6}>
                {selectedReview && !editMode && <ReviewDetails/>}
                {editMode && <EditReviewForm review={selectedReview!}/>}  
                    {/* key={selectedReview && selectedReview.reviewID || 0}
                    review={selectedReview!}      */}
                {createMode && <CreateReviewForm/>}
            </GridColumn>
        </Grid>
    );

};

export default observer(ReviewDashboard);