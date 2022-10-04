import React from 'react';
import { Row, Col, Table, Input } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { SearchOutlined } from '@ant-design/icons';
import { Button } from '../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';


const columns = [
    {
        title: 'Roles',
        dataIndex: 'roles',
        key: 'email_verified',
        render: (roles) => roles.role,
        sorter: (a, b) => a.roles.role_no - b.roles.role_no,
    },
    {
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
        // filters: [
        //     { text: 'test', value: 'test' },
        //     // { text: 'Female', value: 'female' },
        // ],
        // filterMultiple: false,
    },
    {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
    },
    {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Email Verified',
        dataIndex: 'email_verified',
        key: 'email_verified',
        render: (email_verified) => email_verified.toString(),
        sorter: (a, b) => Number(b.email_verified) - Number(a.email_verified)
    },
    // {
    //     title: 'last_name',
    //     dataIndex: 'last_name',
    //     key: 'last_name',
    // },
]

const dummyUsers = [
    {
        uid: "7a6e0697-869c-459d-aebb-95b4707e382e",
        first_name: "test",
        last_name: "4",
        email: "test4@gmail.com",
        email_verified: false,
        roles: {
            role: "Admin",
            role_no: 1663701101628,
            role_slug: "admin",
            role_uuid: "00defe75-a9a3-4973-a60e-84a669667c7d"
        }
    },
    {
        uid: "9e067926-e35b-4db8-ad44-008622be5f37",
        first_name: "test",
        last_name: "3",
        email: "test3@gmail.com",
        email_verified: false,
        roles: {
            role: "Admin",
            role_no: 1663701101628,
            role_slug: "admin",
            role_uuid: "00defe75-a9a3-4973-a60e-84a669667c7d"
        }
    },
    {
        uid: "28daa294-a43c-4593-bfa4-1096cdad9cce",
        first_name: "test",
        last_name: "2",
        email: "test2@gmail.com",
        email_verified: false,
        roles: {
            role: "Admin",
            role_no: 1663701101628,
            role_slug: "admin",
            role_uuid: "00defe75-a9a3-4973-a60e-84a669667c7d"
        }
    },
    {
        uid: "ca6bc627-9fae-4f59-83eb-b1b77948c12a",
        first_name: "test",
        last_name: "1",
        email: "test1@gmail.com",
        email_verified: false,
        roles: {
            role: "Admin",
            role_no: 1663701101628,
            role_slug: "admin",
            role_uuid: "00defe75-a9a3-4973-a60e-84a669667c7d"
        }
    },
    {
        uid: "492d2f93-5b8a-4daf-8c15-fe63bc4f2479",
        first_name: "Samrat1",
        last_name: "Sumon",
        email: "sumonskys1@gmail.com",
        email_verified: false,
        roles: {
            role: "Admin",
            role_no: 1663701101628,
            role_slug: "admin",
            role_uuid: "00defe75-a9a3-4973-a60e-84a669667c7d"
        }
    },
    {
        uid: "4f988fde-292f-4826-b511-e8c063799c03",
        first_name: "Samrat",
        last_name: "Sumon",
        email: "sumonskys@gmail.com",
        email_verified: false,
        roles: {
            role: "Admin",
            role_no: 1663701101628,
            role_slug: "admin",
            role_uuid: "00defe75-a9a3-4973-a60e-84a669667c7d"
        }
    },
    {
        uid: "88d9b801-649f-4894-9b24-d82db38b5e5d",
        first_name: "Shahriar",
        last_name: "Rizvi",
        email: "shahriar.rizvi02@gmail.com",
        email_verified: true,
        roles: {
            role: "System Admin",
            role_no: 1663700134257,
            role_slug: "system-admin",
            role_uuid: "c195cb11-a24c-49f9-b5c2-9e0ba736dfc8"
        }
    }
]


const BlankPage = () => {
    return (
        <>
            <PageHeader
                title="Users"
            // buttons={[
            //     <div key="1" className="page-header-actions">
            //         <CalendarButtonPageHeader />
            //         <ExportButtonPageHeader />
            //         <ShareButtonPageHeader />
            //         <Button size="small" type="primary">
            //             <FeatherIcon icon="plus" size={14} />
            //             Add New
            //         </Button>
            //     </div>,
            // ]}
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>
                            {/* <Input placeholder="Search user" prefix={<SearchOutlined />} /> */}

                            <Table
                                className="table-responsive"
                                pagination={false}
                                // columns={columnsSort}
                                columns={columns}
                                dataSource={dummyUsers}
                                rowKey={'uid'}
                            // onChange={onChange}
                            />


                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default BlankPage;
