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
                <Image src={'/assets/review.png'} fluid />
                <Segment basic style={activityImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={review.reviewID}
                                    style={{ color: 'gold' }}
                                />
                                <p> Actors: {review.actors}</p>
                                <p> Publiced: {review.yearOfPublication}</p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment>
                <Item.Description>
                    <div> Description {review.description} </div>
                </Item.Description>
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