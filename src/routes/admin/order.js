import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
const ListOrder = lazy(() => import('../../container/orders/ListOrder'));
const ViewOrder = lazy(() => import('../../container/orders/ViewOrder'));
const AddOrder = lazy(() => import('../../container/orders/AddOrder'));
const UpdateOrder = lazy(() => import('../../container/orders/UpdateOrder'));

const OrderRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={ListOrder} />
      <Route path={`${path}/view`} component={ViewOrder} />
      <Route path={`${path}/add`} component={AddOrder} />
      <Route path={`${path}/edit/:id`} component={UpdateOrder} />
    </Switch>
  );
};

export default OrderRoutes; 
