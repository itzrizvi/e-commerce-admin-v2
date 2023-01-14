import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import AddPO from '../../container/purchase_order/AddPO';
import EditPO from '../../container/purchase_order/EditPO';
import ListPO from '../../container/purchase_order/ListPO';

const PORoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={ListPO} />
      <Route path={`${path}/add`} component={AddPO} />
      <Route path={`${path}/edit/:id`} component={EditPO} />
    </Switch>
  );
};

export default PORoutes;
