import React, {useState, ChangeEvent} from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/projection';

interface IProps {
    setEditMode: (editMode: boolean) => void;
    projection: IActivity
}

const ActivityForm: React.FC<IProps> = ({ setEditMode, projection: initialFormState }) => {
    
    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState
        } else {
            return {
                projectionID: '',
                timeOfProjection: '',
                dateOfProjection: '',
                movieID: '',
                hallID: ''
            };
        }
    };

    const [projection, setProjection] = useState<IActivity>(initializeForm)

const handleSubmit = () => {
    console.log(projection);
}

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget;
        setProjection({...projection,[name]: value});
        };

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChange} name='movieID' placeholder='Forma za dodavanje projekcije' value={projection.movieID} />
                <Form.Input onChange={handleInputChange} name='genreID' placeholder='Genre id' />
                <Form.Input onChange={handleInputChange} name='date' type='date' placeholder='Datum' value={projection.dateOfProjection} />
                <Form.Input onChange={handleInputChange} name='time' type='time' placeholder='Vreme' value={projection.timeOfProjection} />
                <Form.Input placeholder='Zanr' />
                <Form.TextArea placeholder='Za opis filma' />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={() => setEditMode(false)} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    );
};

export default ActivityForm