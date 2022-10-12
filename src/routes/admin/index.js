import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Dashboard from './dashboard';
import Products from './products';
import Users from './admin';
import Permission from './permission';
import RoleListRoutes from './role/role_list';
import withAdminLayout from '../../layout/withAdminLayout';
import BrandRoutes from './brand';

const Admin = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route path={path} component={Dashboard} />
        <Route path={`${path}/products`} component={Products} />
        <Route path={`${path}/users`} component={Users} />
        <Route path={`${path}/roles`} component={RoleListRoutes} />
        <Route path={`${path}/permission`} component={Permission} />
        <Route path={`${path}/admin`} component={Users} />
        <Route path={`${path}/brand`} component={BrandRoutes} />
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Admin);
