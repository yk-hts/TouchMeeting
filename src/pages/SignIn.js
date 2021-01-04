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
import { logoGoogle } from "ionicons/icons";
import { AuthContext } from "../contexts/Auth";

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
          style={{ textAlign: "center", fontSize: "50px", paddingTop: "150px" }}
        >
          {title}
        </h1>
        <div style={{ textAlign: "center", paddingTop: "100px" }}>
          <IonButton onClick={signinwithgoogle}>
            Log In With Google
            <IonIcon icon={logoGoogle} style={{ paddingLeft: "5px" }} />
          </IonButton>
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "50px 0",
          }}
        >
          or
        </div>
        <div style={{ padding: "20px 0", paddingRight: " 20px" }}>
          <form onSubmit={handleSubmit}>
            <div>
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
        <div style={{ textAlign: "center", paddingTop: "70px" }}>
          初めての方は
          <span style={{ textDecoration: "underline" }}>
            <a href="/signup">サインアップ</a>
          </span>
          へ
        </div>
        <div
          style={{
            textAlign: "center",
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
