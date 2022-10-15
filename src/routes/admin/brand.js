import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
const ListBrand = lazy(() => import('../../container/brand/ListBrand'));
const AddBrand = lazy(() => import('../../container/brand/AddBrand'));
const UpdateBrand = lazy(() => import('../../container/brand/UpdateBrand'));

const BrandRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={ListBrand} />
      <Route path={`${path}/add`} component={AddBrand} />
      <Route path={`${path}/edit`} component={UpdateBrand} />
    </Switch>
  );
};

export default BrandRoutes;
