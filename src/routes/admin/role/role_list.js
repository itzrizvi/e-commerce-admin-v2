import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
const ListRoles = lazy(() => import('../../../container/roles/ListRoles'));
const AddRoles = lazy(() => import('../../../container/roles/AddRole'));

const RoleListRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={ListRoles} />
      <Route path={`${path}/add`} component={AddRoles} />
    </Switch>
  );
};

export default RoleListRoutes;
