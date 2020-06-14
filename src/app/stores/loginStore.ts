import { action, observable } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { IUser } from "../models/User/user";
import { IUserDTO } from "../models/User/userDto";
import { IUserPostUpdate } from "../models/User/userPostUpdate";
import { history } from "../../index";

class LoginStore {
  @observable authUser: IUser | undefined;
  @observable isUserAuth: boolean = false;

  @action loginUser = (username: string, password: string) => {
    agent.Login.login(username, password)
      .then((user) => {
        if(user.data.length === 0){
          console.log("no")
          this.isUserAuth = false;
        }
       else{
          this.isUserAuth = true;
          this.authUser = user.data["0"];
          history.push("/")
         // this.isUserAuth = true;
         /*  if (history.location.pathname === "/login") {
            history.push("/");
          } */
        }
       
      })
      .catch((err) => {
        console.log(err);
        history.push("/login");
      });
  };
}

export default createContext(new LoginStore());