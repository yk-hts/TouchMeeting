import React, { useContext } from "react";
import "firebase/auth";
import "firebase/firestore";

import {
  IonContent,
  IonPage,
  IonInput,
  IonItem,
  IonButton,
  IonIcon,
} from "@ionic/react";
import "./Day.css";
import { logoGoogle } from "ionicons/icons";
import { AuthContext } from "../contexts/Auth";

// const SignIn = (props) => {
//   console.log(props);
//   const history = "";
const SignIn = ({ history }) => {
  const title = "Touch Meeting";
  const { signin, signinwithgoogle } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    signin(email.value, password.value, history);
  };

  return (
    <IonPage>
      <IonContent>
        <h1
          className="title"
          style={{ textAlign: "center", paddingTop: "40%", fontSize: "50px" }}
        >
          {title}
        </h1>
        <div style={{ textAlign: "center", paddingTop: "20%" }}>
          <IonButton onClick={signinwithgoogle}>
            Log In With Google
            <IonIcon icon={logoGoogle} style={{ paddingLeft: "5px" }} />
          </IonButton>
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "5%",
          }}
        >
          or
        </div>
        <div style={{ padding: "5% 5% 0 5%", marginTop: "50px" }}>
          <form onSubmit={handleSubmit}>
            <div style={{ padding: "0 5%" }}>
              <IonItem>
                <IonInput placeholder="mail" name="email" type="email" />
              </IonItem>
              <IonItem>
                <IonInput
                  placeholder="password"
                  name="password"
                  type="password"
                />
              </IonItem>
            </div>
            <IonButton type="submit" style={{ float: "right" }}>
              Sign In
            </IonButton>
          </form>
        </div>
        <div style={{ paddingTop: "20%", textAlign: "center" }}>
          初めての方は
          <span style={{ textDecoration: "underline" }}>
            <a href="/signup">サインアップ</a>
          </span>
          へ
        </div>
        <div
          style={{
            textAlign: "center",
            paddingTop: "5%",
            textDecoration: "underline",
          }}
          href="#"
        >
          about this app
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
