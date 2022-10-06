import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
const AddProduct = lazy(() => import('../../container/products/AddProduct'));

const ProductRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/add`} component={AddProduct} />
    </Switch>
  );
};

export default ProductRoutes;
