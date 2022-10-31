import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
const ListProductAvailabilityStatus = lazy(() => import('../../container/productAvailabilityStatus/ListProductAvailabilityStatus'));
const AddProductAvailabilityStatus = lazy(() => import('../../container/productAvailabilityStatus/AddProductAvailabilityStatus'));
const UpdateProductAvailabilityStatus = lazy(() => import('../../container/productAvailabilityStatus/UpdateProductAvailabilityStatus'));

const ProductAvailabilityStatus = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={ListProductAvailabilityStatus} />
      <Route path={`${path}/add`} component={AddProductAvailabilityStatus} />
      <Route path={`${path}/update`} component={UpdateProductAvailabilityStatus} />
    </Switch>
  );
};

export default ProductAvailabilityStatus;
