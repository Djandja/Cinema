import React, { useContext, useState, Fragment } from 'react'
import { Item, Button, Label, Segment, Search } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import ReservationStore from '../../../app/stores/reservationStore';
import ReservationListItem from './ReservationListItem';
import _ from "lodash";
import { IReservationDTO } from '../../../app/models/Reservation/reservationDto';


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
    const [value, setValue] = useState("");
    const [results, setResults] = useState<IReservationDTO[]>(reservationByDate);
    //const [results, setResults] = useState<IReservationDTO[]>(reservationByDate);

    

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
    return (
        <Fragment>
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
        </Fragment>
    )
}

export default observer(ReservationList);