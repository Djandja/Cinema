import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button, Dropdown, Grid, GridColumn, FormField, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ReviewStore from '../../../app/stores/reviewStore';
import { IReviewPostUpdate } from "../../../app/models/Review/reviewPostUpdate";
import { history } from "../../../index";

const CreateReviewForm: React.FC = () => {
    const initializeForm = () => {
        return {
            description: "",
            actors: "",
            yearOfPublication: "",
        };
    };
    const reviewStore = useContext(ReviewStore);
    const {
        createReview,
        cancelCreateFormOpen,
        submitting,
        reviewsDTO
    } = reviewStore;

    const [review, setReview] = useState(initializeForm);
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

        const formValid = reviewDescriptionValid && reviewActorsValid;

        if (formValid) {
            let newReview: IReviewPostUpdate = {
                description: review.description,
                actors: review.actors,
                yearOfPublication: review.yearOfPublication
            };
            createReview(newReview);
        } else {

        }
    };

    const handleUniqueError = (valueRDescription: string) => {
        const existingDescription = reviewsDTO.find((b) => valueRDescription === b.description);

        if (valueRDescription !== undefined) {
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

            // handleUniqueError(value);

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

    const cancelFormOpen = () => {
        history.push("/reviews")
    }
    return (
        <Segment clearing>
            <Grid>
                <Grid.Column width={10}>
                    <Segment clearing>
                        <Form onSubmit={handleSubmit}>
                            <FormField>
                                <Form.Input
                                    onChange={handleInputChange}
                                    label="Description"
                                    placeholder="Review description"
                                    name="description"
                                    error={errorReviewDescription}
                                />
                                {errorReviewDescription && (
                                    <Label
                                        basic
                                        pointing
                                        color="red"
                                        //style={{ marginBottom: 5 }}
                                        content="Description is too long"
                                    />
                                )}
                                {reviewDescriptionRequiredError && (
                                    <Label
                                        basic
                                        color="red"
                                        pointing
                                        content="Please add some description"
                                        style={{ marginBottom: 10 }}
                                    />
                                )}

                                {/* {uniqueError && (
                                    <Label
                                        basic
                                        color="red"
                                        pointing
                                        content="This description already exists"
                                        style={{ marginBottom: 10 }}
                                    />
                                )} */}
                            </FormField>
                            <FormField>
                                <Form.Input
                                    onChange={handleInputChange}
                                    label="Actors"
                                    placeholder="Blake Liveli"
                                    name="actors"
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
                                    type='date'
                                    placeholder="2012"
                                    name="yearOfPublication"
                                />
                            </FormField>

                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button
                                    loading={submitting}
                                    style={{ width: "50%", marginRight: 10 }}
                                    positive
                                    type="submit"
                                    content="Save"
                                // disabled={
                                //   uniqueError ||
                                //   errorTitle ||
                                //   reviewRequiredError ||
                                //   hallRequiredError ||
                                //   dateOfReviewRequiredError ||
                                //   timeOfProjectioRequiredError

                                // }
                                />
                                <Button
                                    onClick={cancelFormOpen}
                                    style={{ width: "50%" }}
                                    type="button"
                                    content="Cancel"
                                />
                            </div>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        </Segment>


    );
};

export default observer(CreateReviewForm);
