import React, { useContext, useState, Fragment } from 'react'
import { Item, Button, Label, Segment, Search, Dropdown } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import _ from "lodash";
import MovieStore from '../../../app/stores/movieStore';
import { IMovieDTO } from '../../../app/models/Movie/movieDto';
import MovieListItem from './MovieListItem';
import ReactPaginate from "react-paginate";

const MovieList: React.FC = () => {
    const movieStore = useContext(MovieStore);
    const {
        moviesDTO: movies,
        //movie,
        selectMovie,
        deleteMovie,
        submitting,
        target
    } = movieStore;

    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(Math.ceil(movies.length / perPage));

    const [isLoading, setIsLoading] = useState(false);
    const [isSortAsc, setIsSortAsc] = useState(false);
    const [isSortDesc, setIsSortDesc] = useState(false);
    const [value, setValue] = useState("");
    const [results, setResults] = useState<IMovieDTO[]>(movies);

    // Sort

    const resetSort = () => {
        setIsSortAsc(false);
        setIsSortDesc(false);

        const slice = movies.slice(offset, offset + perPage);

        setPageCount(Math.ceil(movies.length / perPage));

        setResults(slice);
    };

    const sortAscHelper = () => {
        const slice = movies
            .sort((a, b) => a.ratings.localeCompare(b.ratings))
            .slice(offset, offset + perPage);
        setPageCount(Math.ceil(movies.length / perPage));

        setResults(slice);
    };
    const sortDescHelper = () => {
        const slice = movies
            .sort((a, b) => a.ratings.localeCompare(b.ratings))
            .reverse()
            .slice(offset, offset + perPage);
        setPageCount(Math.ceil(movies.length / perPage));

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
            slice = movies
                .sort((a, b) => a.ratings.localeCompare(b.ratings))
                .slice(offset, offset + perPage);
        } else if (isSortDesc) {
            slice = movies
                .sort((a, b) => a.ratings.localeCompare(b.ratings))
                .reverse()
                .slice(offset, offset + perPage);
        } else {
            slice = movies.slice(offset, offset + perPage);
        }

        setPageCount(Math.ceil(movies.length / perPage));

        setResults(slice);
    };

    // Search
    const handleSearchChange = (e: any, { value }: any) => {
        setIsLoading(true);
        setValue(value);

        setTimeout(() => {
            if (value.length < 1) {
                setIsLoading(false);
                setValue("");

                setResults(movies);
            }

            const re = new RegExp(_.escapeRegExp(value), "i");
            const isMatch = (result: any) => re.test(result.title);

            setIsLoading(false);
            setResults(_.filter(movies, isMatch));
        }, 300);
    };
    return (
        <Fragment>

            <Dropdown text="Sort" style={{ color: "white" }}>
                <Dropdown.Menu>
                    <Dropdown.Item
                        text="Sort Ascending by rating"
                        onClick={sortReviewsAsc}
                    />
                    <Dropdown.Item
                        text="Sort Descending by rating"
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
                    {/* {movieByDate.map(movie => ( */}
                    {results.map((movie) => (
                        <MovieListItem key={movie.movieID} movie={movie} />
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

export default observer(MovieList);