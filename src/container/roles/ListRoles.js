import { Col, Row } from 'antd'
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import React, { lazy } from 'react'
import { Cards } from '../../components/cards/frame/cards-frame'
import { Main } from '../styled'
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { viewPermission } from '../../utility/utility';
const RoleListTable = lazy(() => import('../../container/pages/overview/RoleListTable'))

export default function ListRoles() {
    viewPermission('role');


    return (
        <>
            <PageHeader
                title="Roles"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Link to="/admin/roles/add">
                            <Button title="Add Role" size="small" type="primary">
                                <FeatherIcon icon="file-plus" />
                            </Button>
                        </Link>
                    </div>
                ]}
            />

            <Main>
                <Row gutter={15}>
                    <Col xs={24}>
                        <Cards headless>
                            <RoleListTable />
                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    )
}
