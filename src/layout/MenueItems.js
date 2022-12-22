import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { menuPermission } from '../utility/utility';

const { SubMenu } = Menu;

const MenuItems = ({ darkMode, toggleCollapsed, topMenu }) => {
  const { path } = useRouteMatch();
  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');
  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = keys => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = item => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
            `${mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
            }`,
          ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >
      {menuPermission('dashboard') && (
        <Menu.Item key="home" icon={!topMenu && <FeatherIcon icon="pie-chart" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}`}>
            Dashboard
          </NavLink>
        </Menu.Item>
      )}

      {(menuPermission('permission') || menuPermission('role') || menuPermission('users')) && (
        <SubMenu key="admin" icon={!topMenu && <FeatherIcon icon="users" />} title="Admin">
          {menuPermission('permission') && (
            <Menu.Item key="permission">
              <NavLink onClick={toggleCollapsed} to={`${path}/permission/list`}>
                Permissions
              </NavLink>
            </Menu.Item>
          )}

          {menuPermission('role') && (
            <Menu.Item key="roles">
              <NavLink onClick={toggleCollapsed} to={`${path}/roles/list`}>
                Roles
              </NavLink>
            </Menu.Item>
          )}

          {menuPermission('user') && (
            <Menu.Item key="users">
              <NavLink onClick={toggleCollapsed} to={`${path}/admin/admins`}>
                Users
              </NavLink>
            </Menu.Item>
          )}
        </SubMenu>
      )}
      {(menuPermission('product') ||
        menuPermission('quote') ||
        menuPermission('coupon') ||
        menuPermission('attribute') ||
        menuPermission('attribute-group') ||
        menuPermission('category') ||
        menuPermission('product') ||
        menuPermission('product-availability-status') ||
        menuPermission('product-condition')) && (
          <SubMenu key="products" icon={!topMenu && <FeatherIcon icon="shopping-cart" />} title="Products">
            {menuPermission('quote') && (
              <Menu.Item key="listQuote">
                <NavLink onClick={toggleCollapsed} to={`${path}/products/quote`}>
                  Quote
                </NavLink>
              </Menu.Item>
            )}
            {menuPermission('coupon') && (
              <Menu.Item key="listCoupon">
                <NavLink onClick={toggleCollapsed} to={`${path}/products/coupon`}>
                  Coupons
                </NavLink>
              </Menu.Item>
            )}
            {menuPermission('attribute') && (
              <Menu.Item key="listAttribute">
                <NavLink onClick={toggleCollapsed} to={`${path}/attributes/list`}>
                  Attributes
                </NavLink>
              </Menu.Item>
            )}
            {menuPermission('attribute-group') && (
              <Menu.Item key="listAttributegroup">
                <NavLink onClick={toggleCollapsed} to={`${path}/attributes/list-group`}>
                  Attribute Groups
                </NavLink>
              </Menu.Item>
            )}
            {menuPermission('category') && (
              <Menu.Item key="listCategory">
                <NavLink onClick={toggleCollapsed} to={`${path}/categories/list`}>
                  Category
                </NavLink>
              </Menu.Item>
            )}
            {menuPermission('product') && (
              <Menu.Item key="products_list">
                <NavLink onClick={toggleCollapsed} to={`${path}/products/list`}>
                  Products
                </NavLink>
              </Menu.Item>
            )}

            {menuPermission('product-condition') && (
              <Menu.Item key="product_condition">
                <NavLink onClick={toggleCollapsed} to={`${path}/product-condition/list`}>
                  Product Conditions
                </NavLink>
              </Menu.Item>
            )}
            {menuPermission('product-availability-status') && (
              <Menu.Item key="product-availability-status">
                <NavLink onClick={toggleCollapsed} to={`${path}/product-availability-status/list`}>
                  Product Availability Statuses
                </NavLink>
              </Menu.Item>
            )}
          </SubMenu>
        )}

      {(menuPermission('customer') || menuPermission('customer-group')) && (
        <SubMenu key="customers" icon={!topMenu && <FeatherIcon icon="user" />} title="Customers">
          {menuPermission('customer') && (
            <Menu.Item key="customer_list">
              <NavLink onClick={toggleCollapsed} to={`${path}/customers/list`}>
                Customers
              </NavLink>
            </Menu.Item>
          )}
          {menuPermission('customer-group') && (
            <Menu.Item key="customers_group">
              <NavLink onClick={toggleCollapsed} to={`${path}/customers/group`}>
                Customer Groups
              </NavLink>
            </Menu.Item>
          )}
        </SubMenu>
      )}

      {menuPermission('manufacture') && (
        <SubMenu key="brand" icon={!topMenu && <FeatherIcon icon="aperture" />} title="Manufacture">
          <Menu.Item key="list_brand">
            <NavLink onClick={toggleCollapsed} to={`${path}/brand/list`}>
              Manufacture
            </NavLink>
          </Menu.Item>
        </SubMenu>
      )}

      {menuPermission('banner') && (
        <SubMenu key="banner" icon={!topMenu && <FeatherIcon icon="image" />} title="Banner">
          <Menu.Item key="list_banner">
            <NavLink onClick={toggleCollapsed} to={`${path}/banner/list`}>
              Banner
            </NavLink>
          </Menu.Item>
        </SubMenu>
      )}

      {menuPermission('order') && (
        <SubMenu key="orders" icon={!topMenu && <FeatherIcon icon="shopping-bag" />} title="Orders">
          <Menu.Item key="list_orders">
            <NavLink onClick={toggleCollapsed} to={`${path}/order/list`}>
              Orders
            </NavLink>
          </Menu.Item>
        </SubMenu>
      )}

      {menuPermission('vendor') && (
        <SubMenu key="vendor" icon={!topMenu && <FeatherIcon icon="archive" />} title="Vendors">
          <Menu.Item key="list_vendor">
            <NavLink onClick={toggleCollapsed} to={`${path}/vendor/list`}>
              Vendors
            </NavLink>
          </Menu.Item>
        </SubMenu>
      )}

      {menuPermission('purchase-order') && (
        <SubMenu key="purchase-order" icon={!topMenu && <FeatherIcon icon="cpu" />} title="Purchase Order">
          <Menu.Item key="purchase-order-sub">
            <NavLink onClick={toggleCollapsed} to={`${path}/po/list`}>
              Purchase Order
            </NavLink>
          </Menu.Item>
        </SubMenu>
      )}

      {menuPermission('receiving-product') && (
        <SubMenu key="receiving-product" icon={!topMenu && <FeatherIcon icon="anchor" />} title="Receiving Product">
          <Menu.Item key="receiving-product-sub">
            <NavLink onClick={toggleCollapsed} to={`${path}/rp/list`}>
              Receiving Product
            </NavLink>
          </Menu.Item>
        </SubMenu>
      )}

      {menuPermission('report') && (
        <SubMenu key="report" icon={!topMenu && <FeatherIcon icon="file-text" />} title="Reports">
          {menuPermission('report') && (
            <>
              <Menu.Item key="order-report">
                <NavLink onClick={toggleCollapsed} to={`${path}/report/order-report/`}>
                  Order Report
                </NavLink>
              </Menu.Item>
            </>
          )}
        </SubMenu>
      )}

      {menuPermission('company-info') && (
        <SubMenu key="supports-sub" icon={!topMenu && <FeatherIcon icon="message-circle" />} title="Supports">
          {menuPermission('company-info') && (
            <Menu.Item key="supports">
              <NavLink onClick={toggleCollapsed} to={`${path}/supports/list`}>
                Messages
              </NavLink>
            </Menu.Item>
          )}
        </SubMenu>
      )}
      {menuPermission('company-info') && (
        <SubMenu key="settings" icon={!topMenu && <FeatherIcon icon="settings" />} title="Settings">
          {menuPermission('company-info') && (
            <Menu.Item key="company_info">
              <NavLink onClick={toggleCollapsed} to={`${path}/company-info`}>
                Company Info
              </NavLink>
            </Menu.Item>
          )}
        </SubMenu>
      )}
      {menuPermission('email-template') && (
        <SubMenu key="email-template" icon={!topMenu && <FeatherIcon icon="at-sign" />} title="Email Template">
          {menuPermission('email-template') && (
            <>
              <Menu.Item key="header/footer">
                <NavLink onClick={toggleCollapsed} to={`${path}/email/header-footer/list`}>
                  Header/Footer
                </NavLink>
              </Menu.Item>
              <Menu.Item key="email-template-content">
                <NavLink onClick={toggleCollapsed} to={`${path}/email/content/list`}>
                  Content
                </NavLink>
              </Menu.Item>
              <Menu.Item key="template-list">
                <NavLink onClick={toggleCollapsed} to={`${path}/email/template/list`}>
                  Template List
                </NavLink>
              </Menu.Item>
            </>
          )}
        </SubMenu>
      )}
    </Menu>
  );
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
