import React, { useContext, useState, Fragment } from 'react'
import { Item, Button, Label, Segment, Search } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import ProjectionStore from '../../../app/stores/projectionStore';
import ProjectionListItem from './ProjectionListItem';
import _ from "lodash";
import { IProjectionDTO } from '../../../app/models/Projection/projectionDto';


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

    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState("");
    const [results, setResults] = useState<IProjectionDTO[]>(projectionByDate);

    const handleSearchChange = (e: any, { value }: any) => {
        setIsLoading(true);
        setValue(value);

        setTimeout(() => {
            if (value.length < 1) {
                setIsLoading(false);
                setValue("");
               
                setResults(projectionByDate);
            }

            const re = new RegExp(_.escapeRegExp(value), "i");
            const isMatch = (result: any) => re.test(result.movie.title);

            setIsLoading(false);
            setResults(_.filter(projectionByDate, isMatch));
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
                {/* {projectionByDate.map(projection => ( */}
                {results.map((projection) => (
                    <ProjectionListItem key={projection.projectionID} projection={projection} />
                ))}
            </Item.Group>
        </Fragment>
    )
}

export default observer(ProjectionList);