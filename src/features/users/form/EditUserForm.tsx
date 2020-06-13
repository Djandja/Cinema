import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button, Dropdown, Label, FormField } from "semantic-ui-react";
import UserStore from "../../../app/stores/userStore";
import { observer } from "mobx-react-lite";
import { IUserDTO } from "../../../app/models/User/userDto";
interface IProps {
    user: IUserDTO;
}

const EditUserForm: React.FC<IProps> = ({ user: initialFormState }) => {
    const userStore = useContext(UserStore);
    const { editUser, submitting, usersDTO, cancelEditFormOpen } = userStore;

    const [user, setUser] = useState(initialFormState);
    const [uniqueError, setUniqueError] = useState(false);
    const [userNameRequiredError, setUserNameRequiredError] = useState(false);
    const [userSurnameRequiredError, setUserSurnameRequiredError] = useState(false);
    const [userNoTelephoneRequiredError, setUserNoTelephoneRequiredError] = useState(false);
    const [userEmailRequiredError, setUserEmailRequiredError] = useState(false);
    const [userPasswordRequiredError, setUserPasswordRequiredError] = useState(false);

    const handleSubmit = () => {
        const userNameRequiredError = user.firstName !== "";
        if (!userNameRequiredError) {
            setUserNameRequiredError(true);
        }
        const userSurnameRequiredError = user.lastName !== "";
        if (!userSurnameRequiredError) {
            setUserSurnameRequiredError(true);
        }
        const userNoTelephoneRequiredError = user.noTelephone !== "";
        if (!userNoTelephoneRequiredError) {
            setUserSurnameRequiredError(true);
        }
        const userEmailRequiredError = user.email !== "";
        if (!userEmailRequiredError) {
            setUserEmailRequiredError(true);
        }
        const userPasswordRequiredError = user.password !== "";
        if (!userPasswordRequiredError) {
            setUserPasswordRequiredError(true);
        }

        const formValid = !uniqueError && userNameRequiredError &&
            userSurnameRequiredError && userNoTelephoneRequiredError &&
            userEmailRequiredError && userPasswordRequiredError;

        if (formValid) {
            editUser({
                userID: user.userID,
                firstName: user.firstName,
                lastName: user.lastName,
                sex: user.sex,
                noTelephone: user.noTelephone,
                email: user.email,
                password: user.password
            });
        }
    };

    const handleUniqueError = (valueEmail: string) => {
        const existingDescription = usersDTO.find((b) => valueEmail === b.email);

        if (valueEmail !== undefined) {
            setUniqueError(true);
        } else {
            setUniqueError(false);
        }
    };

    const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        if (name === "firstName") {

            if (value === "") {
                setUserNameRequiredError(true);
            } else {
                setUserNameRequiredError(false);
            }
        }
        if (name === "lastName") {
            if (value === "") {
                setUserSurnameRequiredError(true);
            } else {
                setUserSurnameRequiredError(false);
            }
        }
        if (name === "noTelephone") {
            if (value === "") {
                setUserNoTelephoneRequiredError(true);
            } else {
                setUserNoTelephoneRequiredError(false);
            }
        }
        if (name === "email") {
            if (value === "") {
                setUserEmailRequiredError(true);
            } else {
                setUserEmailRequiredError(false);
            }
        }
        if (name === "password") {
            if (value === "") {
                setUserPasswordRequiredError(true);
            } else {
                setUserPasswordRequiredError(false);
            }
        }

        setUser({ ...user, [name]: value });
    };
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <FormField>
                    <Form.Input
                        onChange={handleInputChange}
                        label="First Name"
                        placeholder="Andjela"
                        name="firstName"
                        value={user.firstName}
                    />
                    {userNameRequiredError && (
                        <Label
                            basic
                            color="red"
                            pointing
                            content="Please enter your name"
                            style={{ marginBottom: 10 }}
                        />
                    )}
                </FormField>

                <FormField>
                    <Form.Input
                        onChange={handleInputChange}
                        label="Last Name"
                        placeholder="Milicevic"
                        name="lastName"
                        value={user.lastName}
                    />
                    {userSurnameRequiredError && (
                        <Label
                            basic
                            color="red"
                            pointing
                            content="Please enter your last name"
                            style={{ marginBottom: 10 }}
                        />
                    )}
                </FormField>

                <FormField>
                    <Form.Input
                        onChange={handleInputChange}
                        label="Telephone number"
                        placeholder="0603366996"
                        name="noTelephone"
                        value={user.noTelephone}
                    />
                    {userNoTelephoneRequiredError && (
                        <Label
                            basic
                            color="red"
                            pointing
                            content="Please enter your telephone number"
                            style={{ marginBottom: 10 }}
                        />
                    )}
                </FormField>

                <FormField>
                            <Form.Input
                                    onChange={handleInputChange}
                                    label="Sex"
                                    placeholder="M/F"
                                    name="sex"
                                    value={user.sex}
                                />
                            </FormField>

                <FormField>
                    <Form.Input
                        onChange={handleInputChange}
                        label="Email adress"
                        placeholder="andjela@gmail.com"
                        name="email"
                        value={user.email}
                    />
                    {userEmailRequiredError && (
                        <Label
                            basic
                            color="red"
                            pointing
                            content="Please enter your email"
                            style={{ marginBottom: 10 }}
                        />
                    )}

                    {uniqueError && (
                        <Label
                            basic
                            color="red"
                            pointing
                            content="This email adress exists"
                            style={{ marginBottom: 10 }}
                        />
                    )}
                </FormField>

                <FormField>
                    <Form.Input
                        onChange={handleInputChange}
                        label="Password"
                        placeholder="123ABC"
                        name="password"
                        value={user.password}
                    />
                    {userPasswordRequiredError && (
                        <Label
                            basic
                            color="red"
                            pointing
                            content="Please enter password"
                            style={{ marginBottom: 10 }}
                        />
                    )}
                </FormField>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button
                        loading={submitting}
                        style={{ width: "50%", marginRight: 10 }}
                        positive
                        type="submit"
                        content="Save"
                    />
                    <Button
                        onClick={() => cancelEditFormOpen()}
                        style={{ width: "50%" }}
                        type="button"
                        content="Cancel"
                    />
                </div>
            </Form>
        </Segment>
    );
};

export default observer(EditUserForm);