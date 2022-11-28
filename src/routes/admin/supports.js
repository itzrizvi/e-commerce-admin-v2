import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
const Messages = lazy(() => import('../../container/supports/Messages'));
const ViewSingleMessage = lazy(() => import('../../container/supports/ViewSingleMessage'));

const SupportsRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={Messages} />
      <Route path={`${path}/message`} component={ViewSingleMessage} />
    </Switch>
  );
};

export default SupportsRoutes;
