import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const AddAdmin = lazy(() => import('../../container/setings/AddAdmin'));

const AdminRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      {/* <Route exact path={path} component={AddAdmin} /> */}
      <Route path={`${path}/add`} component={AddAdmin} />
    </Switch>
  );
};

export default AdminRoutes;
