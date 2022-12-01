import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import EditRP from '../../container/receiving_product/EditRP';
import ListRP from '../../container/receiving_product/ListRP';

const RPRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={ListRP} />
      <Route path={`${path}/edit`} component={EditRP} />
    </Switch>
  );
};

export default RPRoutes;
