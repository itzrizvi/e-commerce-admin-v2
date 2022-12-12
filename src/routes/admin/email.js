import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
const ListContent = lazy(() => import('../../container/email/ListContent'))
const AddContent = lazy(() => import('../../container/email/AddContent'))
const EditContent = lazy(() => import('../../container/email/EditContent'))
const ListTemplate = lazy(() => import('../../container/email/ListTemplate'))
const AddTemplate = lazy(() => import('../../container/email/AddTemplate'))
const EditTemplate = lazy(() => import('../../container/email/EditTemplate'))
const HeaderFooter = lazy(() => import('../../container/email/HeaderFooter'))
const HeaderFooterAdd = lazy(() => import('../../container/email/HeaderFooterAdd'))
const HeaderFooterEdit = lazy(() => import('../../container/email/HeaderFooterEdit'))

const EmailRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/content/list`} component={ListContent} />
      <Route path={`${path}/content/add`} component={AddContent} />
      <Route path={`${path}/content/edit/:id`} component={EditContent} />
      <Route path={`${path}/template/list`} component={ListTemplate} />
      <Route path={`${path}/template/add`} component={AddTemplate} />
      <Route path={`${path}/template/edit/:id`} component={EditTemplate} />
      <Route path={`${path}/header-footer/list`} component={HeaderFooter} />
      <Route path={`${path}/header-footer/add`} component={HeaderFooterAdd} />
      <Route path={`${path}/header-footer/edit/:id`} component={HeaderFooterEdit} />
    </Switch>
  );
};

export default EmailRoutes;
