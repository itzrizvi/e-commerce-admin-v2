import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
const ListVendor = lazy(() => import('../../container/vendors/ListVendor'));
const AddVendor = lazy(() => import('../../container/vendors/AddVendor'));

const VendorRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={ListVendor} />
      <Route path={`${path}/add`} component={AddVendor} />
    </Switch>
  );
};

export default VendorRoutes;
