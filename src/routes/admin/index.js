import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Dashboard from './dashboard';
import Products from './products';
import Users from './admin';
import Permission from './permission';
import Categories from './categories';
import RoleListRoutes from './role/role_list';
import withAdminLayout from '../../layout/withAdminLayout';
import BrandRoutes from './brand';
import Pages from './pages';
import Attributes from './Attributes';
import Customers from './customers';
import Banner from './banner';
import Order from './order';
import Vendors from './vendors';
import PORoutes from './purchase_order';
import RPRoutes from './receiving_product';
import ProductCondition from './product_condition';
import ProductAvailabilityStatus from './product_availability_status';
import CompanyInfo from '../../container/companyInfo/companyInfo';
import NotFound403 from '../../container/noFound/403';
import SupportsRoutes from './supports';

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
        <Route path={`${path}`} component={Pages} />
        <Route path={`${path}/products`} component={Products} />
        <Route path={`${path}/users`} component={Users} />
        <Route path={`${path}/roles`} component={RoleListRoutes} />
        <Route path={`${path}/permission`} component={Permission} />
        <Route path={`${path}/admin`} component={Users} />
        <Route path={`${path}/brand`} component={BrandRoutes} />
        <Route path={`${path}/categories`} component={Categories} />
        <Route path={`${path}/attributes`} component={Attributes} />
        <Route path={`${path}/customers`} component={Customers} />
        <Route path={`${path}/supports`} component={SupportsRoutes} />
        <Route path={`${path}/banner`} component={Banner} />
        <Route path={`${path}/order`} component={Order} />
        <Route path={`${path}/vendor`} component={Vendors} />
        <Route path={`${path}/product-condition`} component={ProductCondition} />
        <Route path={`${path}/product-availability-status`} component={ProductAvailabilityStatus} />
        <Route path={`${path}/company-info`} component={CompanyInfo} />
        <Route path={`${path}/po`} component={PORoutes} />
        <Route path={`${path}/rp`} component={RPRoutes} />
        <Route path={`${path}/403`} component={NotFound403} />
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Admin);
