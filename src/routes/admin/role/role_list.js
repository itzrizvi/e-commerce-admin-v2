import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
const ListRoles = lazy(() => import('../../../container/roles/ListRoles'));

const RoleListRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={ListRoles} />
    </Switch>
  );
};

export default RoleListRoutes;
