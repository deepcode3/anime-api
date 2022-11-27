import { useState } from "react";

import { emailValidator,
         nameValidator,
         passwordValidator,
         confirmPasswordValidator  } from "./validator";

//touchErrors() loops through the object and sets the dirty property of every error object to true. It is used to force validation on all fields when a user tries to submit the form.
const touchErrors = errors => {
  return Object.entries(errors).reduce((acc, [formName, formError]) => {
    acc[formName] = {
      ...formError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const useLoginFormValidator = (user) => {
  const [errors, setErrors] = useState({
    email: {
      dirty: false,
      error: false,
      message: "",
    },
    name: {
        dirty: false,
        error: false,
        message: "",
      },
    password: {
      dirty: false,
      error: false,
      message: "",
    },
    confirmPassword: {
      dirty: false,
      error: false,
      message: "",
    },
  });

  const validateForm = ({ user, formName, errors,forceTouchErrors= false }) => {
    //the formName value is used to check which validator should run every time one input value changes
    let isValid = true;

    // Create a deep copy(do not share the same references) of the errors
  let nextErrors = JSON.parse(JSON.stringify(errors));

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { email,name, password, confirmPassword } = user;

    if (nextErrors.email.dirty && (formName ? formName === "email" : true)) {
      const emailMessage = emailValidator(email);
      nextErrors.email.error = !!emailMessage;
      nextErrors.email.message = emailMessage;
      if (!!emailMessage) isValid = false;
    }

    if (nextErrors.name.dirty && (formName ? formName === "name" : true)) {
      const nameMessage = nameValidator(name);
      nextErrors.name.error = !!nameMessage;
      nextErrors.name.message = nameMessage;
      if (!!nameMessage) isValid = false;
    }

    if (nextErrors.password.dirty && (formName ? formName === "password" : true)) {
      const passwordMessage = passwordValidator(password);
      nextErrors.password.error = !!passwordMessage;
      nextErrors.password.message = passwordMessage;
      if (!!passwordMessage) isValid = false;
    }

    if (
      nextErrors.confirmPassword.dirty &&
      (formName ? formName === "confirmPassword" : true)
    ) {
      const confirmPasswordMessage = confirmPasswordValidator(
        confirmPassword,
        user
      );
      nextErrors.confirmPassword.error = !!confirmPasswordMessage;
      nextErrors.confirmPassword.message = confirmPasswordMessage;
      if (!!confirmPasswordMessage) isValid = false;
    }

    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

//It checks if the field that was blurred is already dirty. If it is, then it returns early,else errors object will be updated accordingly and validation for the field will be triggered.
  const onBlurField = e => {
    const formName = e.target.name;
    const formError = errors[formName];
    if (formError.dirty) return;

    const updatedErrors = {
      ...errors,
      [formName]: {
        ...errors[formName],
        dirty: true,
      },
    };

    validateForm({ user, formName, errors: updatedErrors });
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};
