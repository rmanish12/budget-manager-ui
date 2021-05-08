import _ from "lodash";

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(emailRegex.test(email)) return true;

    return false;
}

export const validatePassword = (password: string): boolean => {
    if(_.isEmpty(password)) return false;

    return true;
}

export const validateFirstName = (firstName: string): boolean => {
    const trimmedValue = _.trim(firstName);

    if(_.isEmpty(trimmedValue)) return false;

    return true;
}

export const comparePassword = (password: string, confirmPassword: string | undefined): boolean => {
    if(_.isEqual(password, confirmPassword)) return true;

    return false;
}