import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import ListPO from '../../container/purchase_order/ListPO';
const AddVendor = lazy(() => import('../../container/vendors/AddVendor'));

const PORoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={ListPO} />
      <Route path={`${path}/add`} component={AddVendor} />
    </Switch>
  );
};

export default PORoutes;
