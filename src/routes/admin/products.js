import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
const Products = lazy(() => import('../../container/products/Products'));
const AddProduct = lazy(() => import('../../container/products/AddProduct'));
const ListCoupon = lazy(() => import('../../container/products/ListCoupon'));
const AddCoupon = lazy(() => import('../../container/products/AddCoupon'));
const ProdDetails = lazy(() => import('../../container/products/ProdDetails'));
const QuoteList = lazy(() => import('../../container/products/quote/QuoteList'));
const EditQuote = lazy(() => import('../../container/products/quote/EditQuote'));

const ProductRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={Products} />
      <Route path={`${path}/add`} component={AddProduct} />
      <Route path={`${path}/edit`} component={AddProduct} />
      <Route path={`${path}/coupon`} component={ListCoupon} />
      <Route path={`${path}/add-coupon`} component={AddCoupon} />
      <Route path={`${path}/quote/edit/:id`} component={EditQuote} />
      <Route path={`${path}/quote`} component={QuoteList} />
      <Route path={`${path}/view`} component={ProdDetails} />
    </Switch>
  );
};

export default ProductRoutes;
