import "date-fns";
import React, {
  useState,
  useLayoutEffect,
  useRef,
  ChangeEvent,
  FormEvent,
  MouseEvent,
} from "react";
import _ from "lodash";
import moment from "moment";
import axios from "axios";
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
import DialogBox, { DialogBoxPropsI } from "../../dialogBox/DialogBox";
import "../../App.css";
interface UserDetails {
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

const initialFormFieldValues: UserDetails = {
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

const initialDialogBoxProps: DialogBoxPropsI = {
  show: false,
  heading: "",
  variant: "success",
  body: "",
};

const Register: React.FC<RegisterPropsI> = (props) => {
  // function to switch to login and register screen
  const { switchLoginWindow } = props;

  // using ref for referencing the first name input
  const firstNameInput = useRef<HTMLInputElement>(null);

  // defining state for user details
  const [userDetails, setUserDetails] = useState<UserDetails>(
    _.cloneDeep(initialFormFieldValues)
  );

  // defining state for checking validation status of each field to be checked
  const [
    validatedFields,
    setValidatedFields,
  ] = useState<RegistrationValidationError>(
    _.cloneDeep(initialValidationState)
  );

  // defining state for content in dialog DialogBox
  const [dialogBoxProps, setDialogBoxProps] = useState<DialogBoxPropsI>(
    _.cloneDeep(initialDialogBoxProps)
  );

  // use layout effect to focus first name input
  useLayoutEffect(() => {
    if (firstNameInput && firstNameInput.current) {
      firstNameInput.current.focus();
    }
  }, []);

  // handler for date change for Material-UI date picker
  const handleDateChange = (date: Date | null) => {
    setUserDetails({
      ...userDetails,
      dateOfBirth: date,
    });
  };

  // handler to set different values to user details from the form
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  // select handler for setting gender from the form
  const onSelectHandler = (e: ChangeEvent<{ value: unknown }>) => {
    setUserDetails({
      ...userDetails,
      gender: e.target.value as string,
    });
  };

  // handler to perform operations when the form is submitted
  // also called when user presses ENTER button
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValidatedFields(_.cloneDeep(initialValidationState)); // NOT WORKING

    if (validateFormFields()) {
      const URL = "/user/register";
      const body = _.omit(userDetails, ["confirmPassword"]);
      console.log("body: ", body)
      try {
        const res = await axios.post(URL, body);
        setDialogBoxProps({
          show: true,
          heading: "Registeration Success",
          variant: "success",
          body: res.data.message,
        })
      } catch (err) {
        const error = err.response.data.message;
        setDialogBoxProps({
          show: true,
          heading: "Registeration Error",
          variant: "error",
          body: error,
        })
      }

    } else {
      console.log("invalid fields");
    }
  };

  // function to validate different form fields
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

  // handler to reset form fields
  const onResetFormFields = (e: FormEvent<HTMLFormElement>) => {
    const userDetails = _.clone(initialFormFieldValues);
    setUserDetails(userDetails);
  };

  // handler to switch to login screen
  const onSwitchToLoginWindow = (e: MouseEvent<HTMLDivElement>) => {
    switchLoginWindow(true);
  };

  // handler to hide the dialog box
  const onHide = (e: MouseEvent<HTMLButtonElement>) => {
    const dialogBoxProps = _.clone(initialDialogBoxProps);
    setDialogBoxProps(dialogBoxProps);
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
            inputRef={firstNameInput}
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

      <DialogBox
        {...dialogBoxProps}
        onHide={onHide}
      />
    </>
  );
};

export default Register;
