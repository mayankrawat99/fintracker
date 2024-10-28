import React from "react";
import Input from "../Input/input";
import Button from "../Button/Button";
function Login({ loading, email, setEmail, pass, setPass, loginUsingEmail, googleAuth}) {
  return (
    <>
      <Input
        label={"Email"}
        state={email}
        setState={setEmail}
        placeholder={"Enter Email"}
        type={'email'}
      />
      <Input
        label={"Password"}
        state={pass}
        setState={setPass}
        placeholder={"Enter Password"}
        type={'password'}
      />
      <Button
        disabled={loading}
        onClick={loginUsingEmail}
        text={loading ? "Loading..." : "Log in with Email and Password"}
      />
      <center style={{ fontSize: "0.8rem" }}>or</center>
      <Button disabled={loading} onClick={googleAuth}
        text={loading ? "Loading..." : "Log in with Google"}
        blue={true}
      />
    </>
  );
}

export default Login;
