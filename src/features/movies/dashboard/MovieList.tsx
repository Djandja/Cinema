import React, { useContext, useState, Fragment } from 'react'
import { Item, Button, Label, Segment, Search } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import _ from "lodash";
import MovieStore from '../../../app/stores/movieStore';
import {IMovieDTO} from '../../../app/models/Movie/movieDto';
import MovieListItem from './MovieListItem';

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
    const [value, setValue] = useState("");
    const [results, setResults] = useState<IMovieDTO[]>(movies);

    

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
        </Fragment>
    )
}

export default observer(MovieList);