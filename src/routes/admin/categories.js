import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
const ListCategories = lazy(() => import('../../container/categories/ListCategories'));
const AddCategory = lazy(() => import('../../container/categories/AddCategory'));

const ProductRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={ListCategories} />
      <Route path={`${path}/add`} component={AddCategory} />
    </Switch>
  );
};

export default ProductRoutes;
