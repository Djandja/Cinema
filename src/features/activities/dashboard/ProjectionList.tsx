import React, { useContext, useState, Fragment } from 'react'
import { Item, Button, Label, Segment, Search, Dropdown } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import ProjectionStore from '../../../app/stores/projectionStore';
import ProjectionListItem from './ProjectionListItem';
import _ from "lodash";
import { IProjectionDTO } from '../../../app/models/Projection/projectionDto';
import ReactPaginate from "react-paginate";


const ProjectionList: React.FC = () => {
    const projectionStore = useContext(ProjectionStore);
    const {
        projectionsDTO: projections,
        projectionByDate,
        selectProjection,
        deleteProjection,
        submitting,
        target
    } = projectionStore;

    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(Math.ceil(projections.length / perPage));

    const [isLoading, setIsLoading] = useState(false);
    const [isSortAsc, setIsSortAsc] = useState(false);
    const [isSortDesc, setIsSortDesc] = useState(false);
    const [value, setValue] = useState("");
    const [results, setResults] = useState<IProjectionDTO[]>(projectionByDate);



    // Sort

    const resetSort = () => {
        setIsSortAsc(false);
        setIsSortDesc(false);

        const slice = projections.slice(offset, offset + perPage);

        setPageCount(Math.ceil(projections.length / perPage));

        setResults(slice);
    };

    const sortAscHelper = () => {
        const slice = projections
            .sort((a, b) => a.dateOfProjection.localeCompare(b.dateOfProjection))
            .slice(offset, offset + perPage);
        setPageCount(Math.ceil(projections.length / perPage));

        setResults(slice);
    };
    const sortDescHelper = () => {
        const slice = projections
            .sort((a, b) => a.dateOfProjection.localeCompare(b.dateOfProjection))
            .reverse()
            .slice(offset, offset + perPage);
        setPageCount(Math.ceil(projections.length / perPage));

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
            slice = projections
                .sort((a, b) => a.dateOfProjection.localeCompare(b.dateOfProjection))
                .slice(offset, offset + perPage);
        } else if (isSortDesc) {
            slice = projections
                .sort((a, b) => a.dateOfProjection.localeCompare(b.dateOfProjection))
                .reverse()
                .slice(offset, offset + perPage);
        } else {
            slice = projections.slice(offset, offset + perPage);
        }

        setPageCount(Math.ceil(projections.length / perPage));

        setResults(slice);
    };

    // Search
    const resultRenderer = ({ title }: any) => <Label content={title} />;

    const handleSearchChange = (e: any, { value }: any) => {
        setIsLoading(true);
        setValue(value);

        const noValue = value.length < 1;

        if (noValue) {
            setIsLoading(false);
            setValue("");
            if (isSortAsc) {
                sortAscHelper();
            } else if (isSortDesc) {
                sortDescHelper();
            } else {
                setResults(projections.slice(offset, offset + perPage));
            }
        } else {
            const re = new RegExp(_.escapeRegExp(value), "i");
            const isMatch = (result: any) => re.test(result.movie.title);

            setIsLoading(false);
            setResults(_.filter(projections, isMatch));
        }
    };

    const handleResultSelect = (e: any, { result }: any) =>
        setValue(result.movie.title);

    return (
        <Fragment>
            <Dropdown text="Sort" style={{ color: "white" }}>
                <Dropdown.Menu>
                    <Dropdown.Item
                        text="Sort Ascending by dateOfProjection"
                        onClick={sortReviewsAsc}
                    />
                    <Dropdown.Item
                        text="Sort Descending by dateOfProjection"
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
                />
                <Item.Group divided>
                    {/* {projectionByDate.map(projection => ( */}
                    {results.map((projection) => (
                        <ProjectionListItem key={projection.projectionID} projection={projection} />
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

export default observer(ProjectionList);