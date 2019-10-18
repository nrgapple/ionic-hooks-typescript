import React, {useState, useEffect} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AppPage } from './declarations';

import Menu from './components/Menu';
import Home from './pages/Home';
import List from './pages/List';
import { home, list } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { User } from './types/User';
import { url } from 'inspector';

const defaultAppPages: AppPage[] = [
  {
    id: 1,
    title: 'Home',
    url: '/home',
    icon: home
  },
  {
    id: 2,
    title: 'List',
    url: '/home/list/nrgapple',
    icon: list
  }
];

const App: React.FC = () => {
  const [user, setUser] = useState({username: 'nrgapple'});
  const [appPages, setPages] = useState(defaultAppPages)

  const updateUser = (username?: string) => {
    const currentName = username? username : user.username;
    setUser({username: currentName});
    console.log(currentName);
    setPages(defaultAppPages.map(page => page.id === 2? {
      ...page, 
      title: `${currentName}'s packages`,
      url: `/home/list/${currentName}`
      } : page
    ));
    console.log(appPages);
  };

  useEffect(() => {
    updateUser();
  }, [])

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu appPages={appPages} />
          <IonRouterOutlet id="main">
            <Route path="/home" render={() => <Home updateUser={updateUser}/>} exact={true} />
            <Route path="/home/list/:username" component={List} exact={true} />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
