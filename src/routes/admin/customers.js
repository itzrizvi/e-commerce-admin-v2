import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
const CustomerGroups = lazy(() => import('../../container/customers/CustomerGroups'));
const AddCustomerGroup = lazy(() => import('../../container/customers/AddCustomerGroup'));

const ProductRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/group`} component={CustomerGroups} />
      <Route path={`${path}/add-group`} component={AddCustomerGroup} />
    </Switch>
  );
};

export default ProductRoutes;
