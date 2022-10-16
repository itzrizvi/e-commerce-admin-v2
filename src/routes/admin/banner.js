import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
const ListBanner = lazy(() => import('../../container/banner/ListBanner'));
const AddBanner = lazy(() => import('../../container/banner/AddBanner'));
const UpdateBanner = lazy(() => import('../../container/banner/UpdateBanner'));

const BannerRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={ListBanner} />
      <Route path={`${path}/add`} component={AddBanner} />
      <Route path={`${path}/edit`} component={UpdateBanner} />
    </Switch>
  );
};

export default BannerRoutes;
