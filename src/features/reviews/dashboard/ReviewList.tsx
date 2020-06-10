import React, { useContext, useState, Fragment } from 'react'
import { Item, Button, Label, Segment, Search, Dropdown } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import _ from "lodash";
import ReviewStore from '../../../app/stores/reviewStore';
import { IReviewDTO } from '../../../app/models/Review/reviewDto';
import ReviewListItem from './ReviewListItem';
import ReactPaginate from "react-paginate";

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
    const [isSortAsc, setIsSortAsc] = useState(false);
    const [isSortDesc, setIsSortDesc] = useState(false);
    const [value, setValue] = useState("");
    const [results, setResults] = useState<IReviewDTO[]>(reviews);



    // Sort

    const resetSort = () => {
        setIsSortAsc(false);
        setIsSortDesc(false);

        const slice = reviews.slice(offset, offset + perPage);

        setPageCount(Math.ceil(reviews.length / perPage));

        setResults(slice);
    };

    const sortAscHelper = () => {
        const slice = reviews
            .sort((a, b) => a.yearOfPublication.localeCompare(b.yearOfPublication))
            .slice(offset, offset + perPage);
        setPageCount(Math.ceil(reviews.length / perPage));

        setResults(slice);
    };
    const sortDescHelper = () => {
        const slice = reviews
            .sort((a, b) => a.yearOfPublication.localeCompare(b.yearOfPublication))
            .reverse()
            .slice(offset, offset + perPage);
        setPageCount(Math.ceil(reviews.length / perPage));

        setResults(slice);
    };

    const sortReviewsAsc = () => {
        setIsSortAsc(true);
        setIsSortDesc(false);

        sortAscHelper();
    };

    const sortReviewsDesc = () => {
        setIsSortDesc(true);
        setIsSortAsc(false);

        sortDescHelper();
    };

    //Pagination
    const handlePageClick = (e: any) => {
        const selectedPage = e.selected;

        const offset = selectedPage * perPage;

        setCurrentPage(selectedPage);
        setOffset(offset);

        let slice;
        //setData();
        if (isSortAsc) {
            slice = reviews
                .sort((a, b) => a.yearOfPublication.localeCompare(b.yearOfPublication))
                .slice(offset, offset + perPage);
        } else if (isSortDesc) {
            slice = reviews
                .sort((a, b) => a.yearOfPublication.localeCompare(b.yearOfPublication))
                .reverse()
                .slice(offset, offset + perPage);
        } else {
            slice = reviews.slice(offset, offset + perPage);
        }

        setPageCount(Math.ceil(reviews.length / perPage));

        setResults(slice);
    };

    // // Search
    // const resultRenderer = ({ yearOfPublication }: any) => <Label content={yearOfPublication} />;

    // const handleSearchChange = (e: any, { value }: any) => {
    //     setIsLoading(true);
    //     setValue(value);

    //     const noValue = value.length < 1;

    //     if (noValue) {
    //         setIsLoading(false);
    //         setValue("");
    //         if (isSortAsc) {
    //             sortAscHelper();
    //         } else if (isSortDesc) {
    //             sortDescHelper();
    //         } else {
    //             setResults(reviews.slice(offset, offset + perPage));
    //         }
    //     } else {
    //         const re = new RegExp(_.escapeRegExp(value), "i");
    //         const isMatch = (result: any) => re.test(result.yearOfPublication);

    //         setIsLoading(false);
    //         setResults(_.filter(reviews, isMatch));
    //     }
    // };

    // const handleResultSelect = (e: any, { result }: any) =>
    //     setValue(result.yearOfPublication);

    return (
        <Fragment>
        <Dropdown text="Sort" style={{color:"white"}}>
          <Dropdown.Menu>
            <Dropdown.Item
              text="Sort Ascending by yearOfPublication"
              onClick={sortReviewsAsc}
            />
            <Dropdown.Item
              text="Sort Descending by yearOfPublication"
              onClick={sortReviewsDesc}
            />
            <Dropdown.Item text="Default" onClick={resetSort} />
          </Dropdown.Menu>
        </Dropdown>
        <div
          style={{
            justifyContent: "center",
          }}
        >
          {/* <Search
            fluid
            input={{ fluid: true }}
            loading={isLoading}
            onResultSelect={handleResultSelect}
            onSearchChange={_.debounce(handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            resultRenderer={resultRenderer}
          /> */}
            <Item.Group divided>
                {/* {reviewByDate.map(review => ( */}
                {results.map((review) => (
                    <ReviewListItem key={review.reviewID} review={review} />
                ))}
            </Item.Group>
            <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          //subContainerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </Fragment>
    )
}

export default observer(ReviewList);