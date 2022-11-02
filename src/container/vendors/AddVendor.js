import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Spin, Tabs } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import apolloClient, { customerMutation, customerQuery, vendorMutation } from '../../utility/apollo';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { viewPermission } from '../../utility/utility';
import BillingAdderess from './BillingAdderess';
import ShippingAddress from './ShippingAddress';
const { TextArea } = Input;


const AddVendor = () => {
    viewPermission('vendor');
    const { search } = useLocation();
    const params = queryString.parse(search)
    const history = useHistory();

    const [singleCustomerGroup, setSingleCustomerGroup] = useState({ data: [], isLoading: true })
    const [status, setStatus] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm();
    const maxLength = 30;

    // ============+ for billing START +====================
    const initialData1 = {
        id: new Date().getTime(),
        address1: "",
        address1: "",
        country: "",
        city: "",
        state: "",
        zip_code: "",
        email: "",
        fax: "",
        phone: "",
        status: true,
        // contactPerson: "",
    }
    const [billingAddresses, setBillingAddresses] = useState([initialData1])
    // ============+ for billing END +====================

    // ============+ for billing START +====================
    const initialData2 = {
        id: new Date().getTime(),
        address1: "",
        address1: "",
        country: "",
        city: "",
        state: "",
        zip_code: "",
        email: "",
        fax: "",
        phone: "",
        status: true,
    }
    const [shippingAddresses, setShippingAddresses] = useState([initialData2])
    // ============+ for billing END +====================





    // LOAD SINGLE CUSTOMER GROUP
    useEffect(() => {
        if (!params.id) return;

        apolloClient.query({
            query: customerQuery.GET_SINGLE_CUSTOMER_GROUP,
            variables: { query: { customer_group_uuid: params.id } },
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            const data = res?.data?.getSingleCustomerGroup

            if (!data?.status) return
            setSingleCustomerGroup(s => ({ ...s, data: data?.data, error: '' }))
        }).catch(err => {
            setSingleCustomerGroup(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setSingleCustomerGroup(s => ({ ...s, isLoading: false }))
        })

    }, [])

    const handleSubmit = values => {
        console.log(values)

        // ADD NEW CUSTOMER GROUP
        if (!params.id) {
            const variables = { data: { ...values, status } }
            console.log(variables)

            // validate
            console.log(billingAddresses)
            // billingAddresses.
            const notValidate = billingAddresses.find(item => {
                const { id, address1, country, city, state, zip_code, email, fax, phone, address2 } = item
                const checkFalse = !(id && address1 && country && city && state && zip_code && email && fax && phone && address2)
                return checkFalse
            })
            if (notValidate?.id) return toast.warning("Enter Billing Address Correctly!")

            // billingAddresses.
            const notValidate1 = shippingAddresses.find(item => {
                const { id, address1, country, city, state, zip_code, email, fax, phone, address2 } = item
                const checkFalse = !(id && address1 && country && city && state && zip_code && email && fax && phone && address2)
                return checkFalse
            })
            if (notValidate1?.id) return toast.warning("Enter Shipping Address Correctly!")


            // return;
            setIsLoading(true)
            apolloClient.mutate({
                mutation: vendorMutation.CREATE_VENDOR,
                variables,
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: Cookies.get('psp_t')
                    },
                },
            }).then(res => {
                console.log(res);
                const data = res?.data?.createVendor
                if (!data.status) return toast.error(data.message);

                // add billing address
                const parent_id = data.id
                billingAddresses.forEach((val, index) => {
                    const { id, ...rest } = val
                    apolloClient.mutate({
                        mutation: vendorMutation.ADD_VENDOR_BILLING_ADDRESS,
                        variables: { data: { ...rest, parent_id } },
                        context: {
                            headers: {
                                TENANTID: process.env.REACT_APP_TENANTID,
                                Authorization: Cookies.get('psp_t')
                            },
                        },
                    }).then(res => {
                        console.log(`billing res ${index}:\n`, res);
                        const data = res?.data?.addVendorBillingAddress
                    }).catch(err => {
                        console.log("error on add billing:\n", res)
                        isLoading(false)
                        return toast.error("Something went wrong")
                    })

                })
                // add shipping address
                shippingAddresses.forEach((val, index) => {
                    const { id, ...rest } = val
                    apolloClient.mutate({
                        mutation: vendorMutation.ADD_VENDOR_BILLING_ADDRESS,
                        variables: { data: { ...rest, parent_id } },
                        context: {
                            headers: {
                                TENANTID: process.env.REACT_APP_TENANTID,
                                Authorization: Cookies.get('psp_t')
                            },
                        },
                    }).then(res => {
                        console.log(`Shipping res ${index}:\n`, res);
                        const data = res?.data?.addVendorShippingAddress
                        if (shippingAddresses.length === index + 1) {
                            setTimeout(() => {
                                history.push("/admin/vendor/list");
                                window.location.reload();
                            }, 2000);
                        }
                    }).catch(err => {
                        console.log("error on add billing:\n", res)
                        isLoading(false)
                        return toast.error("Something went wrong")
                    })
                })
            }).catch(err => {
                console.log("got error on addCustomerGroup", err)
                return toast.error('Something Went wrong !!')
            })
            // .finally(() => {
            //     setIsLoading(false)
            // })
        }
        // UPDATE CUSTOMER GROUP
        else {
            const variables = {
                data: {
                    customer_group_uuid: params.id,
                    customer_group_name,
                    customergroup_description,
                    customergroup_sortorder: parseInt(customergroup_sortorder),
                    customergroup_status: status,
                }
            }
            console.log(variables)
            apolloClient.mutate({
                mutation: customerMutation.UPDATE_CUSTOMER_GROUP,
                variables,
                refetchQueries: [
                    {
                        query: customerQuery.GET_ALL_CUSTOMER_GROUPS,
                        context: {
                            headers: {
                                TENANTID: process.env.REACT_APP_TENANTID,
                                Authorization: Cookies.get('psp_t')
                            }
                        }
                    },
                    'getAllCustomerGroups'
                ],
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: Cookies.get('psp_t')
                    },

                },

            }).then(res => {
                const data = res?.data?.updateCustomerGroup
                if (!data.status) return toast.error(data.message);
                history.push("/admin/customers/group");
                window.location.reload()
                toast.success(`${values.customer_group_name} Group Updated successfully`);
            }).catch(err => {
                console.log("got error on addCustomerGroup", err)
                return toast.error('Something Went wrong !!')
            }).finally(() => {
                setIsLoading(false)
            })
        }

    }

    return (
        <>
            <PageHeader
                title={params.id ? `Manage Vendor | Edit (${params.name})` : "Add Vendor"}
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>

                            {params.id && singleCustomerGroup.isLoading ?
                                <div div className="spin">
                                    <Spin />
                                </div>

                                : <Form
                                    style={{ width: '100%' }}
                                    form={form}
                                    name="addVendor"
                                    onFinish={handleSubmit}
                                    onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                                    labelCol={{ span: 4 }}
                                >
                                    <Tabs>


                                        <Tabs.TabPane tab="General" key="general">
                                            <Form.Item
                                                rules={[{ required: true, max: maxLength, message: "Please enter Vendor Company Name" }]}
                                                name="company_name"
                                                label="Company Name"
                                            // initialValue={params.name || ""}
                                            >
                                                <Input placeholder='Enter Vendor Company Name' />
                                            </Form.Item>

                                            <Form.Item
                                                rules={[{ required: true, max: maxLength, message: "Please enter Vendor Contact Person" }]}
                                                label="Contact Person"
                                                name="contact_person"
                                            >
                                                <Input placeholder='Enter Contact Person' />
                                            </Form.Item>

                                            <Form.Item
                                                rules={[{ required: true, max: maxLength, message: "Please enter Email" }]}
                                                name="email" label="Email"
                                            // initialValue={params.name || ""}
                                            >
                                                <Input placeholder='Enter Vendor Email' type='email' />
                                            </Form.Item>


                                            <Form.Item
                                                rules={[{ required: true, max: maxLength, message: "Please enter Phone Number" }]}
                                                name="phone_number" label="Phone"
                                            // initialValue={params.name || ""}
                                            >
                                                <Input placeholder='Enter Vendor Phone Number' />
                                            </Form.Item>
                                            <Form.Item
                                                rules={[{ required: true, max: maxLength, message: "Please enter Fax No" }]}
                                                name="FAX_no" label="Fax"
                                            // initialValue={params.name || ""}
                                            >
                                                <Input placeholder='Enter Vendor Fax' />
                                            </Form.Item>
                                            <Form.Item
                                                rules={[{ required: true, max: maxLength, message: "Please enter EIN No" }]}
                                                name="EIN_no" label="EIN"
                                            // initialValue={params.name || ""}
                                            >
                                                <Input placeholder='Enter Vendor EIN Number' />
                                            </Form.Item>
                                            <Form.Item
                                                rules={[{ required: true, max: maxLength, message: "Please enter Fax Id" }]}
                                                name="TAX_ID" label="Tax Id"
                                            // initialValue={params.name || ""}
                                            >
                                                <Input placeholder='Enter Vendor Tax Id' />
                                            </Form.Item>
                                            <Form.Item
                                                rules={[{ required: true, message: "Please enter Vendor Description" }]}
                                                name="description" label="Description"
                                                initialValue={singleCustomerGroup.data.v_d || ""}
                                            >
                                                <TextArea rows={4} placeholder="Enter Vendor Description" />
                                            </Form.Item>
                                            <Form.Item
                                                label="Vendor Status"
                                            >
                                                <Switch checked={status} onChange={checked => setStatus(checked)} />
                                            </Form.Item>

                                        </Tabs.TabPane>

                                        <Tabs.TabPane tab="Billing Address" key="billing_address">
                                            <BillingAdderess {...{ initialData1, billingAddresses, setBillingAddresses }} />
                                        </Tabs.TabPane>

                                        <Tabs.TabPane tab="Shipping Address" key="shipping_address">
                                            <ShippingAddress {...{ initialData2, shippingAddresses, setShippingAddresses }} />
                                        </Tabs.TabPane>



                                    </Tabs>

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
                                            <Link to="/admin/vendor/list">
                                                <Button
                                                    type='white'
                                                    size="large"
                                                >
                                                    Cancel
                                                </Button>
                                            </Link>
                                        </Form.Item>
                                    </div>


                                </Form>}
                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default AddVendor;
