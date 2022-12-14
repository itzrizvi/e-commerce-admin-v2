import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
const AddUser = lazy(() => import('../../container/customers/AddUser'));
const ListUser = lazy(() => import('../../container/customers/AllUser'));
const EditUser = lazy(() => import('../../container/customers/EditUser'));
const ViewUser = lazy(() => import('../../container/customers/ViewUser'));
const CustomerGroups = lazy(() => import('../../container/customers/CustomerGroups'));
const AddCustomerGroup = lazy(() => import('../../container/customers/AddCustomerGroup'));

const ProductRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/group`} component={CustomerGroups} />
      <Route path={`${path}/add-group`} component={AddCustomerGroup} />
      <Route path={`${path}/list`} component={ListUser} />
      <Route path={`${path}/add`} component={AddUser} />
      <Route path={`${path}/edit/:id`} component={EditUser} />
      <Route path={`${path}/view/:id`} component={ViewUser} />
    </Switch>
  );
};

export default ProductRoutes;
