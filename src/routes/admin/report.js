import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
const OrderReport = lazy(() => import('../../container/report/OrderReport'))

const ReportRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/order-report`} component={OrderReport} />
    </Switch>
  );
};

export default ReportRoutes;
