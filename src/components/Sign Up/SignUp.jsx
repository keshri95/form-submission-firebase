import React, { useState } from "react";
import Button from "../Button/Button";
import FormInput from "../FormInput/FormInput";
import "./signup.styles.scss";

import { createAuthUserWithEmailAndPassword ,createUserDocumentFromAuth  } from "../utils/firebase";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [state, setState] = useState(initialState);

  const { displayName, email, password, confirmPassword } = state;
  // console.log(state);

  const crearFormFields = () => {
    setState(initialState)
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword){
      alert("password not match");
      return;
    }

    try{

      const {user} = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, {displayName});
      // console.log(response);

      crearFormFields();
    } catch(error){
      if(error.code === 'auth/email-already-in-use'){
        alert("email alredy in use try another user");
      } else{
        console.log(error);
      }
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });
    console.log(event.target);
  };

  return (
    <div className="signup__container">
      <h2>Don't have an account ?</h2>
      <p>Sing up the form here !</p>
      <form onSubmit={onSubmitHandler}>
        <FormInput
          label="Name"
          type="name"
          value={displayName}
          onChange={onChangeHandler}
          name="displayName"
          placeholder="Name"
          required
        />
        <FormInput
          label="Email"
          name="email"
          onChange={onChangeHandler}
          required
          value={email}
          type="email"
          placeholder="Email"
        />

        <FormInput
          label="Passowrd"
          name="password"
          onChange={onChangeHandler}
          required
          value={password}
          type="password"
          placeholder="Password"
        />
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          onChange={onChangeHandler}
          required
          value={confirmPassword}
          type="password"
          placeholder="Confirm Password"
        />

        <div className="buttons-container">
          <Button type="submit" buttonType="signup">
             Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
