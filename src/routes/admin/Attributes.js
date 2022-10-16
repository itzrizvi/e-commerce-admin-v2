import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
const ListAttributes = lazy(() => import('../../container/products/ListAttributes'));
const AddAttribute = lazy(() => import('../../container/products/AddAttribute'));
const AttributeGroup = lazy(() => import('../../container/products/AttributeGroup'));
const AddAttributeGroup = lazy(() => import('../../container/products/AddAttributeGroup'));

const AttributesRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={ListAttributes} />
      <Route path={`${path}/add`} component={AddAttribute} />
      <Route path={`${path}/list-group`} component={AttributeGroup} />
      <Route path={`${path}/add-group`} component={AddAttributeGroup} />
    </Switch>
  );
};

export default AttributesRoutes;
