import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const ListPermission = lazy(() => import('../../container/permission/ListPermission'));
const AddPermission = lazy(() => import('../../container/permission/AddPermission'));

const AdminRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={ListPermission} />
      <Route path={`${path}/add`} component={AddPermission} />
      {/* test changes */}
    </Switch>
  );
};

export default AdminRoutes;
