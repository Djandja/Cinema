import { observable, action, } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { IUserPostUpdate } from "../models/User/userPostUpdate";
import { IUser } from "../models/User/user";
import {IUserDTO} from "../models/User/userDto"

class UserStore {

  @observable usersDTO: IUserDTO[]=[];
  @observable loadingInitial = false;

  @observable selectedUser: IUserDTO | undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable createMode = false;
  @observable target = "";

 
  @action loadUsers = () => {
    this.loadingInitial = true;
    agent.Users.list()
      .then((userResult) => {
        const users = userResult.map(({ ...selectedUser }) => ({
          ...selectedUser,
        }));

        console.log(users);
        this.usersDTO= users;
      })
      
      .catch((err) => console.log(err))
      .finally(() => (this.loadingInitial = false));
  };

  @action createUser = async (user: IUserPostUpdate) => {
    this.submitting = true;
    try {
      await agent.Users.create(user);

      this.loadUsers();
      this.createMode = false;
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  };

  @action openCreateForm = () => {
    this.createMode = true;
    this.selectedUser = undefined;
  };

  @action openEditForm = (id: number) => {
    this.selectedUser = this.usersDTO.find(
      (a) => a.userID === id
    );
    this.editMode = true;
  };

  @action cancelSelectedUser = () => {
    this.selectedUser = undefined;
  };

  @action cancelCreateFormOpen = () => {
    this.createMode = false;
  };
  @action cancelEditFormOpen = () => {
    this.editMode = false;
  };

  @action selectUser = (id: number) => {
    this.selectedUser = this.usersDTO.find(
      (a) => a.userID === id
    );
    this.editMode = false;
    this.createMode = false;
  };

  @action editUser = async (user: IUser) => {
    this.submitting = true;
    try {
      await agent.Users.update(user);
      this.loadUsers();
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  };

  @action deleteUser = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Users.delete(id);
      this.loadUsers();
      this.submitting = false;
      this.target = "";
    } catch (error) {
      this.submitting = false;
      this.target = "";
      console.log(error);
    }
  };
}

export default createContext(new UserStore());
