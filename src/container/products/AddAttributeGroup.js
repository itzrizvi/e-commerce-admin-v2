import React, { useState } from 'react';
import { Row, Col, Form, Input, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import apolloClient, { attributeMutation, attributeQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { viewPermission } from '../../utility/utility';

const AddAttributeGroup = () => {
    viewPermission('attribute-group');
    const { search } = useLocation();
    const params = queryString.parse(search)
    const history = useHistory();

    const [groupStatus, setGroupStatus] = useState(params.status ? params.status === "true" : true);
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm();
    const maxLength = 30;

    const handleSubmit = values => {
        const { attr_group_name, attrgroup_sortorder } = values;

        setIsLoading(true)
        if (!params.id) { // Create Attribute group
            const variables = { data: { attr_group_name, attrgroup_sortorder: parseInt(attrgroup_sortorder), attrgroup_status: groupStatus } }
            apolloClient.mutate({
                mutation: attributeMutation.CREATE_ATTR_GROUP,
                variables,
                refetchQueries: [
                    {
                        query: attributeQuery.GET_ALL_ATTR_GROUPS,
                        context: {
                            headers: {
                                TENANTID: process.env.REACT_APP_TENANTID,
                                Authorization: Cookies.get('psp_t')
                            }
                        }
                    },
                    'getAllAttrGroups'
                ],
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: Cookies.get('psp_t')
                    },
                },

            }).then(res => {
                const data = res?.data?.createAttrGroup
                if (!data.status) return toast.error(data.message);
                history.push("/admin/attributes/list-group");
                window.location.reload()
                toast.success(`${values.attr_group_name} updated successfully`);
            }).catch(err => {
                console.log("got error on addPermission", err)
                return toast.error('Something Went wrong !!')
            }).finally(() => {
                setIsLoading(false)
            })
        }

        else { // Update  Attribute group
            const variables = { data: { attr_group_id: parseInt(params.id), attr_group_name, attrgroup_sortorder: parseInt(attrgroup_sortorder), attrgroup_status: groupStatus } }
            console.log(variables)
            // return;
            apolloClient.mutate({
                mutation: attributeMutation.UPDATE_ATTR_GROUP,
                variables,
                refetchQueries: [
                    {
                        query: attributeQuery.GET_ALL_ATTR_GROUPS,
                        context: {
                            headers: {
                                TENANTID: process.env.REACT_APP_TENANTID,
                                Authorization: Cookies.get('psp_t')
                            }
                        }
                    },
                    'getAllAttrGroups'
                ],
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: Cookies.get('psp_t')
                    },
                },

            }).then(res => {
                const data = res?.data?.updateAttrGroup
                if (!data.status) return toast.error(data.message);
                history.push("/admin/attributes/list-group");
                toast.success(`${values.attr_group_name} updated successfully`);
                window.location.reload()
            }).catch(err => {
                console.log("got error on addPermission", err)
                return toast.error('Something Went wrong !!')
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }

    return (
        <>
            <PageHeader
                title={params.id ? `Manage Group | Edit (${params.name})` : "Add Attribute Group"}
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>

                            <Form
                                style={{ width: '100%' }}
                                form={form}
                                name="addRole"
                                onFinish={handleSubmit}
                                onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                                labelCol={{ span: 4 }}
                            >
                                <Form.Item
                                    rules={[{ required: true, max: maxLength, message: "Please enter Attribute Group Name" }]}
                                    name="attr_group_name" label="Group Name"
                                    initialValue={params.name || ""}
                                >
                                    <Input placeholder='Enter Attribute Group Name' />
                                </Form.Item>
                                <Form.Item
                                    rules={[{ required: true, max: maxLength, message: "Please enter Role Name" }]}
                                    name="attrgroup_sortorder" label="Sort order"
                                    initialValue={params.s || ""}
                                >
                                    <Input type='number' placeholder='Enter sort order' />
                                </Form.Item>
                                <Form.Item
                                    name="attrgroup_status"
                                    label="Status"
                                >
                                    <Switch checked={groupStatus} onChange={checked => setGroupStatus(checked)} />
                                </Form.Item>

                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        marginTop: '3em'
                                    }}
                                >
                                    <Form.Item>
                                        <Button loading={isLoading} size="default" htmlType="submit" type="primary" raised>
                                            {isLoading ? 'Processing' : 'Save'}
                                        </Button>
                                        <Link to="/admin/attributes/list-group">
                                            <Button
                                                type='white'
                                                size="large"
                                            >
                                                Cancel
                                            </Button>
                                        </Link>
                                    </Form.Item>
                                </div>


                            </Form>
                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default AddAttributeGroup;
