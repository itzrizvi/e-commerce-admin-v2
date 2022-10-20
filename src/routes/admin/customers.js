import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import AddUser from '../../container/customers/AddUser';
import ListUser from '../../container/customers/AllUser';
import EditUser from '../../container/customers/EditUser';
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
      <Route path={`${path}/edit`} component={EditUser} />
    </Switch>
  );
};

export default ProductRoutes;
