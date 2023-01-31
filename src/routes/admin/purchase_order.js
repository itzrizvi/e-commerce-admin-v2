import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
const ListPO = lazy(() => import('../../container/purchase_order/ListPO'));
const PrintPO = lazy(() => import('../../container/purchase_order/PrintPO'));
const ViewPO = lazy(() => import('../../container/purchase_order/ViewPO'));
const PO = lazy(() => import('../../container/purchase_order/PO'));

const PORoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={ListPO} />
      <Route path={`${path}/po-print/:id`} component={PrintPO} />
      <Route path={`${path}/view-po/:id`} component={ViewPO} />
      <Route path={`${path}/:id?`} component={PO} />
    </Switch>
  );
};

export default PORoutes;
