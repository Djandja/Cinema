import { observable, action, } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { IReviewPostUpdate } from "../models/Review/reviewPostUpdate";
import { IReview } from "../models/Review/review";
import {IReviewDTO} from "../models/Review/reviewDto"

class ReviewStore {

  @observable reviewsDTO: IReviewDTO[]=[];
  @observable loadingInitial = false;

  @observable selectedReview: IReviewDTO | undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable createMode = false;
  @observable target = "";

 
  @action loadReviews = () => {
    this.loadingInitial = true;
    agent.Reviews.list()
      .then((reviewResult) => {
        const reviews = reviewResult.map(({ ...selectedReview }) => ({
          ...selectedReview,
        }));
        console.log(reviews);
        //this.reviewsDTO= reviews;
      })
      .catch((err) => console.log(err))
      .finally(() => (this.loadingInitial = false));
  };

  @action createReview = async (review: IReviewPostUpdate) => {
    this.submitting = true;
    try {
      await agent.Reviews.create(review);

      this.loadReviews();
      this.createMode = false;
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  };

  @action openCreateForm = () => {
    this.createMode = true;
    this.selectedReview = undefined;
  };

  @action openEditForm = (id: number) => {
    this.selectedReview = this.reviewsDTO.find(
      (a) => a.reviewID === id
    );
    this.editMode = true;
  };

  @action cancelSelectedReview = () => {
    this.selectedReview = undefined;
  };

  @action cancelCreateFormOpen = () => {
    this.createMode = false;
  };
  @action cancelEditFormOpen = () => {
    this.editMode = false;
  };

  @action selectReview = (id: number) => {
    this.selectedReview = this.reviewsDTO.find(
      (a) => a.reviewID === id
    );
    this.editMode = false;
    this.createMode = false;
  };

  @action editReview = async (review: IReview) => {
    this.submitting = true;
    try {
      await agent.Reviews.update(review);
      this.loadReviews();
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  };

  @action deleteReview = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Reviews.delete(id);
      this.loadReviews();
      this.submitting = false;
      this.target = "";
    } catch (error) {
      this.submitting = false;
      this.target = "";
      console.log(error);
    }
  };
}

export default createContext(new ReviewStore());
