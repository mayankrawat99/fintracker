import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db, doc, setDoc } from "../../firebase";
import Login from "./Login";
import Signin from "./Signin";
import { useNavigate } from "react-router-dom";
import { getDoc } from "firebase/firestore";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();
  function signupWithEmail(e) {
    e.preventDefault();
    setLoading(true);
    //authenticate user or basially create a nw account using email and password
    if (name != "" && email != "" && pass != "" && confirmPass != "") {
      if (pass == confirmPass) {
        createUserWithEmailAndPassword(auth, email, pass)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("<<user>>", user);
            setLoading(false);
            setName("");
            setConfirmPass("");
            setEmail("");
            setPass("");
            toast.success("Account created successfully!");
            navigate("/dashboard");

            //Now create a doc with the user id as the following id
            createDoc(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoading(false);
            toast.error(errorMessage);
          });
      } else {
        setLoading(false);
        toast.error("Passwords do not match!");
      }
    } else {
      setLoading(false);
      toast.error("All fields are mandatory!");
    }
  }
  async function createDoc(user) {
    //Make sure the doc created with uid doesn't exist
    //create a doc
    if (!user) return;
    const userRef = doc(db, "user", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "user", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.info("User already exists!");
    }
  }
  function loginUsingEmail(e) {
    e.preventDefault();
    setLoading(true);
    //log in user  using email and password
    if (email != "" && pass != "") {
      signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("<<user>>", user);
          setLoading(false);
          setEmail("");
          setPass("");
          toast.success("Logged in successfully!");
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
    } else {
      setLoading(false);
      toast.error("All fields are mandatory!");
    }
  }
  function googleAuth() {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          createDoc(user);
          setLoading(false);
          navigate("/dashboard");

          toast.success("Logged in successfully!");
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          setLoading(false);
          toast.error(errorMessage);
          // ...
        });
    } catch (error) {
      loading(false);
      toast.error(error.message);
    }
  }

  return (
    <>
      {loginForm ? (
        <>
          <form action="">
            <Login
              loading={loading}
              email={email}
              setEmail={setEmail}
              pass={pass}
              setPass={setPass}
              loginUsingEmail={loginUsingEmail}
              googleAuth={googleAuth}
            />
            <center
              className="click-here"
              onClick={() => setLoginForm(!loginForm)}
            >
              Or Don't Have An Account? Click Here.
            </center>
          </form>
        </>
      ) : (
        <>
          <form>
            <Signin
              name={name}
              setName={setName}
              loading={loading}
              email={email}
              setEmail={setEmail}
              pass={pass}
              setPass={setPass}
              confirmPass={confirmPass}
              setConfirmPass={setConfirmPass}
              signupWithEmail={signupWithEmail}
              googleAuth={googleAuth}
            />

            <center
              onClick={() => setLoginForm(!loginForm)}
              className="click-here"
            >
              Or Have An Account Already? Click Here.
            </center>
          </form>
        </>
      )}
    </>
  );
}
export default Signup;
