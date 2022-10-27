import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
const ListCondition = lazy(() => import('../../container/productCondition/ListCondition'));
const AddCondition = lazy(() => import('../../container/productCondition/AddCondition'));
const UpdateCondition = lazy(() => import('../../container/productCondition/UpdateCondition'));

const ProductCondition = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={ListCondition} />
      <Route path={`${path}/add`} component={AddCondition} />
      <Route path={`${path}/update`} component={UpdateCondition} />
    </Switch>
  );
};

export default ProductCondition;
