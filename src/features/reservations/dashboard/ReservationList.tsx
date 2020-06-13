import React, { useContext, useState, Fragment } from 'react'
import { Item, Button, Label, Segment, Search, Dropdown } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import ReservationStore from '../../../app/stores/reservationStore';
import ReservationListItem from './ReservationListItem';
import _ from "lodash";
import { IReservationDTO } from '../../../app/models/Reservation/reservationDto';
import ReactPaginate from "react-paginate";


const ReservationList: React.FC = () => {
    const reservationStore = useContext(ReservationStore);
    const {
        reservationsDTO: reservations,
        //reservationByDate,
        selectReservation,
        deleteReservation,
        reservationByDate,
        submitting,
        target
    } = reservationStore;

    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(Math.ceil(reservations.length / perPage));

    const [isLoading, setIsLoading] = useState(false);
    const [isSortAsc, setIsSortAsc] = useState(false);
    const [isSortDesc, setIsSortDesc] = useState(false);
    const [value, setValue] = useState("");
    const [results, setResults] = useState<IReservationDTO[]>(reservationByDate);
    //const [results, setResults] = useState<IReservationDTO[]>(reservationByDate);

    // Sort

    const resetSort = () => {
        setIsSortAsc(false);
        setIsSortDesc(false);

        const slice = reservations.slice(offset, offset + perPage);

        setPageCount(Math.ceil(reservations.length / perPage));

        setResults(slice);
    };

    const sortAscHelper = () => {
        const slice = reservations
            .sort((a, b) => a.startDate.localeCompare(b.startDate))
            .slice(offset, offset + perPage);
        setPageCount(Math.ceil(reservations.length / perPage));

        setResults(slice);
    };
    const sortDescHelper = () => {
        const slice = reservations
            .sort((a, b) => a.startDate.localeCompare(b.startDate))
            .reverse()
            .slice(offset, offset + perPage);
        setPageCount(Math.ceil(reservations.length / perPage));

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
            slice = reservations
                .sort((a, b) => a.startDate.localeCompare(b.startDate))
                .slice(offset, offset + perPage);
        } else if (isSortDesc) {
            slice = reservations
                .sort((a, b) => a.startDate.localeCompare(b.startDate))
                .reverse()
                .slice(offset, offset + perPage);
        } else {
            slice = reservations.slice(offset, offset + perPage);
        }

        setPageCount(Math.ceil(reservations.length / perPage));

        setResults(slice);
    };




    return (
        <Fragment>
            <Dropdown text="Sort" style={{ color: "white" }}>
                <Dropdown.Menu>
                    <Dropdown.Item
                        text="Sort Ascending by startDate"
                        onClick={sortReviewsAsc}
                    />
                    <Dropdown.Item
                        text="Sort Descending by startDate"
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
                loading={isLoading}
                onSearchChange={_.debounce(handleSearchChange, 500, {
                    leading: true,
                })}
                results={results}
                value={value}
            
            /> */}
                <Item.Group divided>
                    {/* {reservationByDate.map(reservation => ( */}
                    {results.map((reservation) => (
                        <ReservationListItem key={reservation.reservationID} reservation={reservation} />
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

export default observer(ReservationList);

// const handleSearchChange = (e: any, { value }: any) => {
    //     setIsLoading(true);
    //     setValue(value);

    //     setTimeout(() => {
    //         if (value.length < 1) {
    //             setIsLoading(false);
    //             setValue("");

    //             //setResults(reservationByDate);
    //             setResults(reservations);
    //         }

    //         const re = new RegExp(_.escapeRegExp(value), "i");
    //         const isMatch = (result: any) => re.test(result.movie.title);

    //         setIsLoading(false);
    //         //setResults(_.filter(reservationByDate, isMatch));
    //         setResults(_.filter(reservations, isMatch));

    //     }, 300);
    //};