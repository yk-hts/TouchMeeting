import React, { useContext } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonButton,
  IonIcon,
  IonButtons,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import { AuthContext } from "../contexts/Auth";

const SignUp = ({ history }) => {
  const { signup } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    signup(email.value, password.value, history);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>アカウントを作成</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ paddingTop: "10px", paddingRight: "20px" }}>
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
              Sign Up
            </IonButton>
            <IonButton
              type="button"
              style={{ float: "right" }}
              color="light"
              href="/signin"
            >
              キャンセル
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
