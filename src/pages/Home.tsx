import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonToast,
  IonButton,
  } from '@ionic/react';
import React, { useState } from 'react';
import './Home.css';
import { InputChangeEventDetail } from '@ionic/core';

interface IProps {
  updateUser: (username: string) => void
}

const HomePage: React.FC<IProps> = (props: IProps) => {

  const [username, setUsername] = useState('');
  const [showUsernameChange, setShowUsernameChange] = useState(false);
  const handleUsernameValueChange = (event: CustomEvent<InputChangeEventDetail>) => {
    const username = event.detail.value;
    console.log(`userchange: ${showUsernameChange}`);
    setUsername(username? username : '');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonToast 
          isOpen={showUsernameChange}
          onDidDismiss={() => setShowUsernameChange(false)}
          duration={3000}
          message={`User changed to ${username}`}
          position="top"
        />
        <IonCard className="welcome-card">
          <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png" alt=""/>
          <IonCardHeader>
            <IonCardSubtitle>Get Started</IonCardSubtitle>
            <IonCardTitle>Welcome to Github page viewer</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Navigate to list to see all projects
            </p>
          </IonCardContent>
        </IonCard>

        <IonCard className="welcome-card">
          <IonCardHeader>
            <IonCardSubtitle>Enter a github username</IonCardSubtitle>
            <form onSubmit={(event) => {
              event.preventDefault();
              props.updateUser(username);
              setShowUsernameChange(true);
            }}>
              <IonItem>
                <IonLabel position="floating">username</IonLabel>
                <IonInput onIonChange={handleUsernameValueChange}/>
              </IonItem>
            </form>
          </IonCardHeader>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
