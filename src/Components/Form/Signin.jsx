import React from "react";
import Input from "../Input/input";
import Button from "../Button/Button";

function Signin({
  name,
  setName,
  pass,
  setPass,
  confirmPass,
  setConfirmPass,
  setEmail,
  email,
  loading,
  signupWithEmail,
  googleAuth
}) {
  return (
    <>
      <Input
        label={"Full Name"}
        state={name}
        setState={setName}
        placeholder={"Enter your full name"}
      />
      <Input
        label={" Email"}
        type={"email"}
        state={email}
        setState={setEmail}
        placeholder={"you@example.com"}
      />
      <Input
        label={"Password"}
        type={"password"}
        state={pass}
        setState={setPass}
        placeholder={"Choose a secure password"}
      />
      <Input
        label={"Confirm password"}
        type={"password"}
        state={confirmPass}
        setState={setConfirmPass}
        placeholder={"Repeat your password"}
      />
      <Button
        disabled={loading}
        onClick={signupWithEmail}
        text={loading ? "Loading..." : "Sign Up with Email and Password"}
      />
      <center style={{ fontSize: "0.8rem" }}>or</center>
      <Button disabled={loading}
      onClick={googleAuth}
        text={loading ? "Loading..." : "Sign Up with Google"}
        blue={true}
      />
    </>
  );
}

export default Signin;
