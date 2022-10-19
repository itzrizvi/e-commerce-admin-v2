import React from 'react';
import { Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { Link } from 'react-router-dom';

const Products = () => {
    return (
        <>
            <PageHeader
                title="Products"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Link to="/admin/products/add">
                            <Button size="small" title="Add Product" type="primary">
                                <FeatherIcon icon="file-plus" />
                            </Button>
                        </Link>
                    </div>
                ]}
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>
                            <h3>List of products</h3>
                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default Products;