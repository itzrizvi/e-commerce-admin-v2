import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const ListPermission = lazy(() => import('../../container/permission/ListPermission'));

const AdminRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={ListPermission} />
      {/* test changes */}
    </Switch>
  );
};

export default AdminRoutes;
