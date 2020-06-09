import React, { useContext } from 'react'
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react'
import { IReviewDTO } from '../../../app/models/Review/reviewDto';
import { observer } from 'mobx-react-lite';
import ReviewStore from '../../../app/stores/reviewStore';

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'gold'
};

const ReviewDetailedHeader: React.FC<{ review: IReviewDTO }> = ({ review }) => {
    const reviewStore = useContext(ReviewStore);
    const { selectedReview, openEditForm, cancelSelectedReview } = reviewStore;

    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={'/assets/reviewTime.png'} fluid />
                <Segment basic style={activityImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Item.Header as='a'>{review.reviewID}</Item.Header>
                                <Item.Meta>glumci{review.actors}</Item.Meta>
                                <Item.Meta>{review.yearOfPublication}</Item.Meta>
                                <Item.Description>
                                    <div> Description {review.description} </div>
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button onClick={cancelSelectedReview}>
                    Cancel
           </Button>
                <Button
                    onClick={() => openEditForm(review!.reviewID)}
                    color='blue' floated='right'>
                    Edit Review
                </Button>
            </Segment>
        </Segment.Group>
    )
}
export default observer(ReviewDetailedHeader);