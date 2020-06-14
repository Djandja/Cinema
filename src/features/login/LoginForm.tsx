
import React, { useContext, useState, FormEvent } from "react";
import '../../app/layout/styles.css';
import {
  Segment,
  Form,
  Label,
  Dropdown,
  Button,
  Grid,
  Image,
  GridColumn,
} from "semantic-ui-react";

import LoginStore from "../../app/stores/loginStore";

const LoginForm = () => {
  const initializeForm = () => {
    return {
      email: "",
      password: "",
    };
  };


  const loginStore = useContext(LoginStore);
  const { loginUser, authUser } = loginStore;

  const [user, setUser] = useState(initializeForm);
  const [wrongUsername, setWrongUsername] = useState(false);

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    if (true) {
      loginUser(user.email, user.password);
      console.log("user"+ user.password)
      if(authUser?.email === undefined || authUser?.password === undefined){
        setWrongUsername(true)
      } else {
        setWrongUsername(false)
      }
    } else {
    }
  };

  
  return (
    <Grid className="masthead">
      <Grid.Row centered style={{ marginTop: 200 }}>
        <Grid.Column width={5}>
      <Image size='medium' src={'/assets/camera6.gif'} fluid />
        </Grid.Column>
        <Grid.Column width={5}>
          <Form onSubmit={handleSubmit}>
          <label style={{ color: 'white' }}>Username *</label>
            <Form.Input
              onChange={handleInputChange}
              //label="Username *"
              placeholder="andjela@gmail.com"
              name="email"
            />
            <label style={{ color: 'white' }}>Password *</label>
            <Form.Input 
              onChange={handleInputChange}
              //label="Password *"
              placeholder="******"
              name="password"
              type="password"
            />
            {wrongUsername && (
            <Label
              basic
              pointing
              color="red"
              //style={{ marginBottom: 5 }}
              content="Wrong username or password. Please try again."
            />
          )}
            

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
              className="buttonSave"
                style={{ width: "50%", marginRight: 10 } }
                positive
                type="submit"
                content="Login"
              />
            </div>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default LoginForm;