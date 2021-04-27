import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import _ from "lodash";
import { TextField, Button, Select, MenuItem } from "@material-ui/core";
import "../../App.css";

interface RegisterationField {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  dateOfBirth: Date | null;
  gender: string;
}

interface RegistrationValidationError {
  isFirstNameValid: boolean;
  isEmailValid: boolean;
  isPasswordValid: boolean;
  isConfirmPasswordValid: boolean;
  isFormValid: boolean;
}

const initialFormFieldValues: RegisterationField = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  dateOfBirth: null,
  gender: "",
};

const initialValidationState: RegistrationValidationError = {
  isFirstNameValid: true,
  isEmailValid: true,
  isPasswordValid: true,
  isConfirmPasswordValid: true,
  isFormValid: false,
};

const Register = () => {
  const [userDetails, setUserDetails] = useState<RegisterationField>(
    _.cloneDeep(initialFormFieldValues)
  );

  const [
    validatedFields,
    setValidatedFields,
  ] = useState<RegistrationValidationError>(
    _.cloneDeep(initialValidationState)
  );

  useEffect(() => {
    console.log("inside useEffect:", validatedFields);
  }, [validatedFields]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const onSelectHandler = (e: ChangeEvent<{ value: unknown }>) => {
    setUserDetails({
      ...userDetails,
      gender: e.target.value as string,
    });
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateFormValidityState("isFormValid", false);
    validateFormFields();

    if (validatedFields.isFormValid) {
      console.log("fields valid");
    } else {
      console.log("fields invalid");
    }

    console.log(userDetails);
  };

  const updateFormValidityState = (
    key: keyof RegistrationValidationError,
    value: boolean
  ) => {
    const validitystate: RegistrationValidationError = _.clone(validatedFields);
    validatedFields[key] = value;
    console.log('key, value: ', key, value);
    console.log(validitystate)
    setValidatedFields(validitystate);
  };

  const validateFormFields = () => {
    const { firstName, email, password, confirmPassword } = userDetails;

    console.log(firstName, email, password, confirmPassword);
    console.log(validatedFields);
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (
      !_.isEmpty(firstName) &&
      emailRegex.test(email) &&
      !_.isEmpty(password) &&
      _.isEqual(password, confirmPassword)
    ) {
      updateFormValidityState("isFormValid", true);
    } else {
      console.log(_.isEmpty(firstName));
      if (_.isEmpty(firstName)) {
        updateFormValidityState("isFirstNameValid", false);
      }
      console.log(!emailRegex.test(email));
      if (!emailRegex.test(email)) {
        updateFormValidityState("isEmailValid", false);
      }
      console.log(_.isEmpty(password));
      if (_.isEmpty(password)) {
        updateFormValidityState("isPasswordValid", false);
      }
      console.log(!_.isEqual(password, confirmPassword));
      if (!_.isEqual(password, confirmPassword)) {
        updateFormValidityState("isConfirmPasswordValid", false);
      }

      console.log(validatedFields);
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <div>
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            type="text"
            variant="outlined"
            className="form-field"
            error={!validatedFields.isFirstNameValid}
            value={userDetails.firstName}
            onChange={onChangeHandler}
          />
        </div>

        <div>
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            variant="outlined"
            className="form-field"
            value={userDetails.lastName}
            onChange={onChangeHandler}
          />
        </div>

        <div>
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            className="form-field"
            error={!validatedFields.isEmailValid}
            value={userDetails.email}
            onChange={onChangeHandler}
          />
        </div>

        <div>
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            className="form-field"
            error={!validatedFields.isPasswordValid}
            value={userDetails.password}
            onChange={onChangeHandler}
          />
        </div>

        <div>
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            className="form-field"
            error={!validatedFields.isConfirmPasswordValid}
            value={userDetails.confirmPassword}
            onChange={onChangeHandler}
          />
        </div>

        <div>
          <TextField
            id="dateOfBirth"
            name="dateOfBirth"
            label="Date Of Birth"
            type="date"
            variant="outlined"
            className="form-field"
            defaultValue="1990-01-01"
            value={userDetails.dateOfBirth}
            onChange={onChangeHandler}
          />
        </div>

        <div>
          <Select
            id="gender"
            name="gender"
            label="Gender"
            className="form-field"
            variant="outlined"
            value={userDetails.gender}
            onChange={onSelectHandler}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
          </Select>
        </div>

        <Button className="login-button" type="submit">
          CREATE ACCOUNT
        </Button>

        <Button className="login-button" type="reset">
          RESET
        </Button>
      </form>

      <div className="error">
        <ul>
          {!validatedFields.isFirstNameValid && (
            <li>First Name is not valid</li>
          )}
          {!validatedFields.isEmailValid && <li>Email is not valid</li>}
          {!validatedFields.isPasswordValid && <li>Password is not valid</li>}
          {!validatedFields.isConfirmPasswordValid && (
            <li>Passwords does not match</li>
          )}
        </ul>
      </div>

      <div className="forgot-password-div">
        <span className="forgot-password">Already Registered? Sign In</span>
      </div>
    </>
  );
};

export default Register;
