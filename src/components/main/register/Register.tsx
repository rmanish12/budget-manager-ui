import "date-fns";
import React, { useState, ChangeEvent, FormEvent, MouseEvent } from "react";
import _ from "lodash";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  validateEmail,
  validatePassword,
  validateFirstName,
  comparePassword,
} from "../../../helper/validator";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
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
}

interface RegisterPropsI {
  switchLoginWindow: (value: boolean) => void;
}

const initialFormFieldValues: RegisterationField = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  dateOfBirth: new Date(moment().format("MM/DD/YYYY")),
  gender: "",
};

const initialValidationState: RegistrationValidationError = {
  isFirstNameValid: true,
  isEmailValid: true,
  isPasswordValid: true,
  isConfirmPasswordValid: true,
};

const Register: React.FC<RegisterPropsI> = (props) => {

  const { switchLoginWindow } = props;

  const [userDetails, setUserDetails] = useState<RegisterationField>(
    _.cloneDeep(initialFormFieldValues)
  );

  const [
    validatedFields,
    setValidatedFields,
  ] = useState<RegistrationValidationError>(
    _.cloneDeep(initialValidationState)
  );

  const handleDateChange = (date: Date | null) => {
    setUserDetails({
      ...userDetails,
      dateOfBirth: date
    })
  };

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

    setValidatedFields(_.cloneDeep(initialValidationState)); // NOT WORKING

    if (validateFormFields()) {
      console.log("valid fields");
    } else {
      console.log("invalid fields");
    }
  };

  const validateFormFields = (): boolean => {
    const { firstName, email, password, confirmPassword } = userDetails;

    if (
      validateEmail(email) &&
      validatePassword(password) &&
      comparePassword(password, confirmPassword) &&
      validateFirstName(firstName)
    ) {
      return true;
    } else {
      const validatationState = _.clone(validatedFields);

      if (!validateEmail(email)) {
        validatationState.isEmailValid = false;
      }

      if (!validatePassword(password)) {
        validatationState.isPasswordValid = false;
      }

      if (!comparePassword(password, confirmPassword)) {
        validatationState.isConfirmPasswordValid = false;
      }

      if (!validateFirstName(firstName)) {
        validatationState.isFirstNameValid = false;
      }

      setValidatedFields(validatationState);

      return false;
    }
  };

  const onResetFormFields = (e: FormEvent<HTMLFormElement>) => {
    console.log("clicked");
    const userDetails = _.clone(initialFormFieldValues);
    setUserDetails(userDetails);
  }

  const onSwitchToLoginWindow = (e: MouseEvent<HTMLDivElement>) => {
    switchLoginWindow(true);
  }

  return (
    <>
      <form onSubmit={onSubmitHandler} onReset={onResetFormFields}>
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="dateOfBirth"
              name="dateOfBirth"
              label="Date Of Birth"
              format="MM/dd/yyyy"
              className="form-field"
              value={userDetails.dateOfBirth}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider>
        </div>

        <div>
          <FormControl variant="outlined" className="form-field">
            <InputLabel>Gender</InputLabel>
            <Select
              id="gender"
              name="gender"
              label="Gender"
              value={userDetails.gender}
              onChange={onSelectHandler}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </Select>
          </FormControl>
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

      <div className="forgot-password-div" onClick={onSwitchToLoginWindow}>
        <span className="forgot-password">Already Registered? Sign In</span>
      </div>
    </>
  );
};

export default Register;
