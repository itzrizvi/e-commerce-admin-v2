import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
const ListRoles = lazy(() => import('../../../container/roles/ListRoles'));
const AddRoles = lazy(() => import('../../../container/roles/AddRole'));
const UpdateRole = lazy(() => import('../../../container/roles/UpdateRole'));

const RoleListRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={ListRoles} />
      <Route path={`${path}/add`} component={AddRoles} />
      <Route path={`${path}/update`} component={UpdateRole} />
    </Switch>
  );
};

export default RoleListRoutes;
