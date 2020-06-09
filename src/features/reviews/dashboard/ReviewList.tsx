import React, { useContext, useState, Fragment } from 'react'
import { Item, Button, Label, Segment, Search } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import _ from "lodash";
import ReviewStore from '../../../app/stores/reviewStore';
import {IReviewDTO} from '../../../app/models/Review/reviewDto';
import ReviewListItem from './ReviewListItem';

const ReviewList: React.FC = () => {
    const reviewStore = useContext(ReviewStore);
    const {
        reviewsDTO: reviews,
        //review,
        selectReview,
        deleteReview,
        submitting,
        target
    } = reviewStore;

    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(Math.ceil(reviews.length / perPage));

    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState("");
    const [results, setResults] = useState<IReviewDTO[]>(reviews);

    

    const handleSearchChange = (e: any, { value }: any) => {
        setIsLoading(true);
        setValue(value);

        setTimeout(() => {
            if (value.length < 1) {
                setIsLoading(false);
                setValue("");

                setResults(reviews);
            }

            const re = new RegExp(_.escapeRegExp(value), "i");
            const isMatch = (result: any) => re.test(result.review.title);

            setIsLoading(false);
            setResults(_.filter(reviews, isMatch));
        }, 300);
    };
    return (
        <Fragment>
            <Search
                loading={isLoading}
                //onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(handleSearchChange, 500, {
                    leading: true,
                })}
                results={results}
                value={value}
            //resultRenderer={resultRenderer}
            // {...this.props}
            />
            <Item.Group divided>
                {/* {reviewByDate.map(review => ( */}
                {results.map((review) => (
                    <ReviewListItem key={review.reviewID} review={review} />
                ))}
            </Item.Group>
        </Fragment>
    )
}

export default observer(ReviewList);