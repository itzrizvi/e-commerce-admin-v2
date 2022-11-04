import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const AddAdmin = lazy(() => import('../../container/admin/AddAdmin'));
const AllAdmin = lazy(() => import('../../container/admin/AllAdmins'));

const AdminRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/add-admin`} component={AddAdmin} />
      <Route path={`${path}/admins`} component={AllAdmin} />
    </Switch>
  );
};

export default AdminRoutes;
