import React from 'react';
import { Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';

const AddAdmin = () => {
    return (
        <>
            <PageHeader
                ghost
                title="Add Admin"
            // buttons={[
            //     <div key="6" className="page-header-actions">
            //         <CalendarButtonPageHeader key="1" />
            //         <ExportButtonPageHeader key="2" />
            //         <ShareButtonPageHeader key="3" />
            //         <Button size="small" key="4" type="primary">
            //             <FeatherIcon icon="plus" size={14} />
            //             Add New
            //         </Button>
            //     </div>,
            // ]}
            />
            <Main>
                <Row gutter={25}>
                    <Col lg={24} xs={24}>
                        <Cards headless>
                            <div style={{ minHeight: 'calc(100vh - 320px)' }}>
                                <h2>Welcome to Prime Server Parts</h2>
                                <h3>add admin</h3>
                            </div>
                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default AddAdmin;
