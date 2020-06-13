import React, { useContext, useState, Fragment } from 'react'
import { Item, Button, Label, Segment, Search, Dropdown } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import _ from "lodash";
import UserStore from '../../../app/stores/userStore';
import { IUserDTO } from '../../../app/models/User/userDto';
import UserListItem from './UserListItem';
import ReactPaginate from "react-paginate";

const UserList: React.FC = () => {
    const userStore = useContext(UserStore);
    const {
        usersDTO: users,
        //user,
        selectUser,
        deleteUser,
        submitting,
        target
    } = userStore;

    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(Math.ceil(users.length / perPage));

    const [isLoading, setIsLoading] = useState(false);
    const [isSortAsc, setIsSortAsc] = useState(false);
    const [isSortDesc, setIsSortDesc] = useState(false);
    const [value, setValue] = useState("");
    const [results, setResults] = useState<IUserDTO[]>(users);



    // Sort

    const resetSort = () => {
        setIsSortAsc(false);
        setIsSortDesc(false);

        const slice = users.slice(offset, offset + perPage);

        setPageCount(Math.ceil(users.length / perPage));

        setResults(slice);
    };

    const sortAscHelper = () => {
        const slice = users
            .sort((a, b) => a.sex.localeCompare(b.sex))
            .slice(offset, offset + perPage);
        setPageCount(Math.ceil(users.length / perPage));

        setResults(slice);
    };
    const sortDescHelper = () => {
        const slice = users
            .sort((a, b) => a.sex.localeCompare(b.sex))
            .reverse()
            .slice(offset, offset + perPage);
        setPageCount(Math.ceil(users.length / perPage));

        setResults(slice);
    };

    const sortUsersAsc = () => {
        setIsSortAsc(true);
        setIsSortDesc(false);

        sortAscHelper();
    };

    const sortUsersDesc = () => {
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
            slice = users
                .sort((a, b) => a.sex.localeCompare(b.sex))
                .slice(offset, offset + perPage);
        } else if (isSortDesc) {
            slice = users
                .sort((a, b) => a.sex.localeCompare(b.sex))
                .reverse()
                .slice(offset, offset + perPage);
        } else {
            slice = users.slice(offset, offset + perPage);
        }

        setPageCount(Math.ceil(users.length / perPage));

        setResults(slice);
    };

    // Search
    const resultRenderer = ({ sex }: any) => <Label content={sex} />;

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
                setResults(users.slice(offset, offset + perPage));
            }
        } else {
            const re = new RegExp(_.escapeRegExp(value), "i");
            const isMatch = (result: any) => re.test(result.sex);

            setIsLoading(false);
            setResults(_.filter(users, isMatch));
        }
    };

    const handleResultSelect = (e: any, { result }: any) =>
        setValue(result.sex);

    return (
        <Fragment>
        <Dropdown text="Sort" style={{color:"white"}}>
          <Dropdown.Menu>
            <Dropdown.Item
              text="Sort all men first"
              onClick={sortUsersAsc}
            />
            <Dropdown.Item
              text="Sort all women first"
              onClick={sortUsersDesc}
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
                {/* {userByDate.map(user => ( */}
                {results.map((user) => (
                    <UserListItem key={user.userID} user={user} />
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

export default observer(UserList);