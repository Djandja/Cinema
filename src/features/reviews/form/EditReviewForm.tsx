import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button, Dropdown, Label, FormField } from "semantic-ui-react";
import ReviewStore from "../../../app/stores/reviewStore";
import { observer } from "mobx-react-lite";
import { IReviewDTO } from "../../../app/models/Review/reviewDto";
interface IProps {
    review: IReviewDTO;
}

const EditReviewForm: React.FC<IProps> = ({ review: initialFormState }) => {
    const reviewStore = useContext(ReviewStore);
    const { editReview, submitting, reviewsDTO } = reviewStore;

    const [review, setReview] = useState<IReviewDTO>(initialFormState);
    const [errorReviewDescription, setErrorReviewDescription] = useState(false);
    const [uniqueError, setUniqueError] = useState(false);
    const [reviewDescriptionRequiredError, setReviewDescriptionRequiredError] = useState(false);
    const [reviewActorsRequiredError, setReviewActorsRequiredError] = useState(false);


    const handleSubmit = () => {
        const reviewDescriptionValid = review.description !== "";
        if (!reviewDescriptionValid) {
            setReviewDescriptionRequiredError(true);
        }
        const reviewActorsValid = review.description !== "";
        if (!reviewDescriptionValid) {
            setReviewActorsRequiredError(true);
        }

        const formValid = !uniqueError && reviewDescriptionValid && reviewActorsValid;

        if (formValid) {
            editReview({
                reviewID: review.reviewID,
                description: review.description,
                actors: review.actors,
                yearOfPublication: review.yearOfPublication
            });
        }
    };

    const handleUniqueError = (valueGDescription: string) => {
        const existingReview = reviewsDTO.find((b) => valueGDescription === b.description);

        if (existingReview !== undefined) {
            setUniqueError(true);
        } else {
            setUniqueError(false);
        }
    };

    const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        if (name === "description") {
            if (value.length > 3000) {
                setErrorReviewDescription(true);
            } else {
                setErrorReviewDescription(false);
            }

            handleUniqueError(value);

            if (value === "") {
                setReviewDescriptionRequiredError(true);
            } else {
                setReviewDescriptionRequiredError(false);
            }
        }
        if (name === "actors") {
            if (value === "") {
                setReviewActorsRequiredError(true);
            } else {
                setReviewActorsRequiredError(false);
            }
        }


        setReview({ ...review, [name]: value });
    };

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <Form.Input
                        onChange={handleInputChange}
                        label="Review Description *"
                        placeholder="Description..."
                        value={review.description}
                        name="description"
                        error={errorReviewDescription}
                    />
                    {errorReviewDescription && (
                        <Label
                            basic
                            pointing
                            color="red"
                            //style={{ marginBottom: 5 }}
                            content="Review description is too long"
                        />
                    )}
                    {reviewDescriptionRequiredError && (
                        <Label
                            basic
                            color="red"
                            pointing
                            content="Please add Review Description"
                            style={{ marginBottom: 10 }}
                        />
                    )}

                    {uniqueError && (
                        <Label
                            basic
                            color="red"
                            pointing
                            content="Review with given name already exists"
                            style={{ marginBottom: 10 }}
                        />
                    )}
                </Form.Field>

                <FormField>
                    <Form.Input
                        onChange={handleInputChange}
                        label="Actors"
                        placeholder="Blake Liveli"
                        name="actors"
                        value={review.actors}
                    />
                    {reviewActorsRequiredError && (
                        <Label
                            basic
                            color="red"
                            pointing
                            content="Please add an Actor"
                            style={{ marginBottom: 10 }}
                        />
                    )}
                </FormField>
                <FormField>
                    <Form.Input
                        onChange={handleInputChange}
                        label="Publication"
                        placeholder="2012"
                        name="yearOfPublication"
                        value={review.yearOfPublication}
                    />
                </FormField>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button
                        loading={submitting}
                        style={{ width: "50%", marginRight: 10 }}
                        positive
                        type="submit"
                        content="Save"
                    />
                    {/*     <Button
            onClick={() => cancelCreateFormOpen()}
            style={{ width: "50%" }}
            type="button"
            content="Cancel"
          /> */}
                </div>
            </Form>
        </Segment>
    );
};

export default observer(EditReviewForm);