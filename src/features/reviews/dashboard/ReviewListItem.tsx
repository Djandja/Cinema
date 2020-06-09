import React, { useContext } from 'react'
import { Item, Button, Label, Segment, Icon } from 'semantic-ui-react'
import ReviewStore from '../../../app/stores/reviewStore';
import { IProjectionDTO } from '../../../app/models/Projection/projectionDto';
import { IReviewDTO } from '../../../app/models/Review/reviewDto';

const ReviewListItem: React.FC<{ review: IReviewDTO }> = ({ review }) => {
    const reviewStore = useContext(ReviewStore);
    const {
        reviewsDTO: reviews,
        selectReview,
        deleteReview,
        submitting,
        target
    } = reviewStore;
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item >
                        <Item.Image size='tiny' circular src='/assets/reviewShow.png' />
                        <Item.Content>
                            <Item.Header as='a'>{review.actors}</Item.Header>
                            <Item.Meta>Year of publication: {review.yearOfPublication}</Item.Meta>
                            <Item.Description>
                            <Icon name='info' />  {String(review.description)!} 
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>

            </Segment>
            
            <Segment clearing>
                {/* <span>{review.review.description}</span> */}
                <Button
                    onClick={() => selectReview(review.reviewID)}
                    floated='right'
                    content='View'
                    color='blue'
                />
                <Button
                    name={review.reviewID}
                    loading={+target === review.reviewID && submitting}
                    onClick={(e) => deleteReview(e, review.reviewID)}
                    floated='right'
                    content='Delete'
                    color='red'
                />
            </Segment>
        </Segment.Group>

    )
}

export default ReviewListItem
