/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';

import HomePage from './containers/HomePage';
import AnalisysPage from './containers/AnalisysPage';

// Lazily load routes and code split with webpacck
const LazyCounterPage = React.lazy(() =>
  import(/* webpackChunkName: "CounterPage" */ './containers/CounterPage')
);

const CounterPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyCounterPage {...props} />
  </React.Suspense>
);

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route exact path={routes.HOME} component={HomePage} />
        <Route exact path={routes.NO_SELECT_ANALISYS} component={HomePage} />
        <Route path={routes.ANALISYS} component={AnalisysPage} />
        <Route exact path={routes.COUNTER} component={CounterPage} />
      </Switch>
    </App>
  );
}
