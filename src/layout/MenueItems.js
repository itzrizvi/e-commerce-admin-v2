import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';

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
      <Menu.Item key="home">
        <NavLink onClick={toggleCollapsed} to={`${path}`}>
          Dashboard
        </NavLink>
      </Menu.Item>

      <SubMenu key="admin" icon={!topMenu && <FeatherIcon icon="users" />} title="Admin">

        <Menu.Item key="permission">
          <NavLink onClick={toggleCollapsed} to={`${path}/permission/list`}>
            Permissions
          </NavLink>
        </Menu.Item>
        <Menu.Item key="roles">
          <NavLink onClick={toggleCollapsed} to={`${path}/roles/list`}>
            Roles
          </NavLink>
        </Menu.Item>

        <Menu.Item key="users">
          <NavLink onClick={toggleCollapsed} to={`${path}/admin/admins`}>
            Users
          </NavLink>
        </Menu.Item>


        {/* <Menu.Item key="single">
          <NavLink onClick={toggleCollapsed} to={`${path}/email/single/1585118055048`}>
            Read Email
          </NavLink>
        </Menu.Item> */}
      </SubMenu>

      <SubMenu key="products" icon={!topMenu && <FeatherIcon icon="shopping-cart" />} title="Products">
        <Menu.Item key="addproducts">
          <NavLink onClick={toggleCollapsed} to={`${path}/products/list`}>
            Products
          </NavLink>
        </Menu.Item>
        <Menu.Item key="listAttribute">
          <NavLink onClick={toggleCollapsed} to={`${path}/attributes/list`}>
            Attributes
          </NavLink>
        </Menu.Item>
        <Menu.Item key="listAttributegroup">
          <NavLink onClick={toggleCollapsed} to={`${path}/attributes/list-group`}>
            Attribute Group
          </NavLink>
        </Menu.Item>
        <Menu.Item key="listCategory">
          <NavLink onClick={toggleCollapsed} to={`${path}/categories/list`}>
            Category
          </NavLink>
        </Menu.Item>
      </SubMenu>

      {/* <SubMenu key="roles" icon={!topMenu && <FeatherIcon icon="shopping-cart" />} title="Roles">
        <Menu.Item key="roleList">
          <NavLink onClick={toggleCollapsed} to={`${path}/roles/list`}>
            Manage Roles
          </NavLink>
        </Menu.Item>
      </SubMenu> */}

      <SubMenu key="brand" icon={!topMenu && <FeatherIcon icon="aperture" />} title="Manufacture">
        <Menu.Item key="list_brand">
          <NavLink onClick={toggleCollapsed} to={`${path}/brand/list`}>
            Manufacture
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="banner" icon={!topMenu && <FeatherIcon icon="image" />} title="Banner">
        <Menu.Item key="list_banner">
          <NavLink onClick={toggleCollapsed} to={`${path}/banner/list`}>
            Banner
          </NavLink>
        </Menu.Item>
      </SubMenu>

    </Menu>
  );
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
