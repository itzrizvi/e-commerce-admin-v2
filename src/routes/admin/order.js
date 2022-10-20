import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
const ListOrder = lazy(() => import('../../container/orders/ListOrder'));

const OrderRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={ListOrder} />
    </Switch>
  );
};

export default OrderRoutes;
