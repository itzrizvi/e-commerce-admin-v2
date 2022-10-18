import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
const Products = lazy(() => import('../../container/products/Products'));
const AddProduct = lazy(() => import('../../container/products/AddProduct'));
const AddProduct1 = lazy(() => import('../../container/products/AddProduct1'));
const ListCoupon = lazy(() => import('../../container/products/ListCoupon'));
const AddCoupon = lazy(() => import('../../container/products/AddCoupon'));

const ProductRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={Products} />
      <Route path={`${path}/add`} component={AddProduct} />
      <Route path={`${path}/coupon`} component={ListCoupon} />
      <Route path={`${path}/add-coupon`} component={AddCoupon} />
    </Switch>
  );
};

export default ProductRoutes;
