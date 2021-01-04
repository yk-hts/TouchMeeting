import React, { useState, useEffect } from "react";
import {
  IonModal,
  IonPage,
  IonLabel,
  IonButton,
  IonInput,
  IonItem,
  IonDatetime,
  IonSelectOption,
  IonSelect,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { withRouter } from "react-router";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/ja";
import { auth, db } from "../firebase";

const localizer = momentLocalizer(moment);

const CalendarPage = ({ history }) => {
  const WeekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [eventList, setEventList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    name: "",
    begin: new Date(),
    finish: new Date(),
    url: "",
    date: "",
    docid: "",
  });
  // console.log(eventDetails.begin);
  const handleClick = (event) => {
    setEventDetails({
      name: event.title,
      begin: event.start,
      finish: event.end,
      url: event.url,
      date: event.date,
      docid: event.docid,
    });
    setShowModal(true);
    // console.log(eventDetails.date);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const { name, url, begin, finish, date } = e.target.elements;
    console.log(eventDetails.docid);
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("schedules")
      .doc(eventDetails.docid)
      .update({
        name: name.value,
        date: date.value,
        begin: begin.value,
        finish: finish.value,
        url: url.value,
      });
    setShowModal(false);
    history.push("/week");
  };

  const getDateDetails = (d) => {
    const toDoubleDigits = (num) => {
      num += "";
      if (num.length === 1) {
        num = "0" + num;
      }
      return num;
    };

    let year = d.getFullYear();
    let month = d.getMonth();
    let date = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();

    return (
      year +
      "-" +
      toDoubleDigits(month) +
      "-" +
      toDoubleDigits(date) +
      "T" +
      toDoubleDigits(hour) +
      ":" +
      toDoubleDigits(minute)
    );
  };

  const handleDelete = () => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("schedules")
      .doc(eventDetails.docid)
      .delete();
    setShowModal(false);
    history.push("/week");
  };
  const formats = {
    dateFormat: "D",
    dayFormat: "ddd",
    dayHeaderFormat: "ddd",
  };

  useEffect(() => {
    console.log();
    const unsubscribe = db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("schedules")
      .onSnapshot((snapshot) => {
        // console.log(snapshot);
        setEventList(
          snapshot.docs.map((doc, i) => {
            const docData = doc.data();
            // console.log(doc.id);
            return {
              sat: docData.date,
              url: docData.url,
              docid: doc.id,
              id: i - 1,
              title: docData.name,
              allDay: false,
              start: new Date(
                docData.begin.slice(0, 10) + " " + docData.begin.slice(11, 16)
              ),
              end: new Date(
                docData.finish.slice(0, 10) + " " + docData.finish.slice(11, 16)
              ),
            };
          })
        );
      });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <IonPage>
      <IonContent>
        <IonModal isOpen={showModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>詳細</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <form onSubmit={handleUpdate}>
              <IonItem>
                <IonLabel position="stacked">名前</IonLabel>
                <IonInput name="name" value={eventDetails.name} type="text" />
                {/* {console.log(eventDetails.name)} */}
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">曜日</IonLabel>
                <IonSelect
                  name="date"
                  okText="Okay"
                  cancelText="Dismiss"
                  value={WeekDay[eventDetails.begin.getDay()]}
                >
                  <IonSelectOption value="Mon">月曜日</IonSelectOption>
                  <IonSelectOption value="Tue">火曜日</IonSelectOption>
                  <IonSelectOption value="Wed">水曜日</IonSelectOption>
                  <IonSelectOption value="Thu">木曜日</IonSelectOption>
                  <IonSelectOption value="Fri">金曜日</IonSelectOption>
                  <IonSelectOption value="Sat">土曜日</IonSelectOption>
                  <IonSelectOption value="Sun">日曜日</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">開始時間</IonLabel>
                {/* {console.log(eventDetails.begin)} */}
                <IonDatetime
                  displayFormat="H:mm"
                  minuteValues="0,10,20,30,40,50,60"
                  name="begin"
                  value={getDateDetails(eventDetails.begin)}
                ></IonDatetime>
                {console.log(eventDetails.begin)}
                {console.log(eventDetails.begin.getDate())}
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">終了時間</IonLabel>
                <IonDatetime
                  displayFormat="H:mm"
                  minuteValues="0,10,20,30,40,50,60"
                  name="finish"
                  value={getDateDetails(eventDetails.finish)}
                ></IonDatetime>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">URL</IonLabel>
                <IonInput name="url" value={eventDetails.url} type="url" />
              </IonItem>
              <IonButton type="submit" style={{ float: "right" }}>
                編集
              </IonButton>
              <IonButton
                type="button"
                style={{ float: "right" }}
                color="danger"
                onClick={(docid) => handleDelete(docid)}
              >
                削除
              </IonButton>
              <IonButton
                type="button"
                style={{ float: "right" }}
                color="light"
                href="/week"
              >
                戻る
              </IonButton>
            </form>
          </IonContent>
        </IonModal>
        <Calendar
          localizer={localizer}
          events={eventList}
          timeslots={1}
          defaultView={Views.WEEK}
          onSelectEvent={(event) => handleClick(event)}
          views={["week"]}
          formats={formats}
          style={{ height: window.height }}
        />
      </IonContent>
      {/* {console.log(eventList)} */}
    </IonPage>
  );
};

export default withRouter(CalendarPage);
