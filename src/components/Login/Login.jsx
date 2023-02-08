import React, { useState } from "react";
import Button from "../Button/Button";
import FormInput from "../FormInput/FormInput";
import { BsGoogle } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import './login.styles.scss';

// google- popup
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../utils/firebase";


const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [state, setState] = useState(initialState);

  const { email, password } = state;

  // console.log(state);
  const crearFormFields = () => {
    setState(initialState)
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(response);
      crearFormFields();
    } catch(error){

      switch(error.code){
        case "auth/user-not-found":
          alert('incorect username');
          break;

        case "auth/wrong-password":
          alert("incorrect password");
          break;

        default:
         console.log(error);
      }

    }

  };


  const letTheInitializeGooglePopupButton = async () => {

    const {user} = await signInWithGooglePopup()

    const userDocRef =  await createUserDocumentFromAuth(user);
    console.log(userDocRef);
  }








  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });
    console.log(event.target);
  };

  return (
    <div className="login__container">
      <h2>I alredy have an account</h2>
      <p>Sing in with your email and password !</p>
      <form onSubmit={onSubmitHandler}>
        <FormInput
          label="Email"
          name="email"
          onChange={onChangeHandler}
          required
          value={email}
          type="email"
          placeholder="Email..."
        />

        <FormInput
          label="Passowrd"
          name="password"
          onChange={onChangeHandler}
          required
          value={password}
          type="password"
          placeholder="Password..."
        />

        <div className="buttons-container">
          <Button type="submit" buttonType="google" onClick={letTheInitializeGooglePopupButton}>
            <span>{<BsGoogle />}</span> Google
          </Button>

          <Button type="submit" buttonType="login">
            Sign In
          </Button>

        </div>
      </form>
    </div>
  );
};

export default Login;
