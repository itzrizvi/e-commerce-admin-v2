import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Spin, Select, DatePicker, InputNumber } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import apolloClient, { couponMutation, couponQuery, customerMutation, customerQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import moment from 'moment';
import { viewPermission } from '../../utility/utility';
const { TextArea } = Input;


const AddCoupon = () => {
    viewPermission('coupon');
    const { search } = useLocation();
    const params = queryString.parse(search)
    const history = useHistory();

    // const [singleCustomerGroup, setSingleCustomerGroup] = useState({ data: [], isLoading: true })
    const [singleCoupon, setSingleCoupon] = useState({ data: [], isLoading: true })
    const [coupon_type, setCoupon_type] = useState("");
    const [coupon_status, setCoupon_status] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm();
    const maxLength = 30;


    // LOAD SINGLE CUSTOMER GROUP
    useEffect(() => {
        if (!params.id) return;

        apolloClient.query({
            query: couponQuery.GET_SINGLE_COUPON,
            variables: { query: { coupon_uuid: params.id } },
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            const data = res?.data?.getSingleCoupon

            if (!data?.status) return
            setSingleCoupon(s => ({ ...s, data: data?.data, error: '' }))
            setCoupon_type(data.data.coupon_type)
        }).catch(err => {
            setSingleCoupon(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setSingleCoupon(s => ({ ...s, isLoading: false }))
        })

    }, [])

    const handleSubmit = values => {
        // const { customer_group_name, customergroup_description, customergroup_sortorder } = values
        const { coupon_startdate, coupon_enddate, coupon_maxamount, coupon_minamount, coupon_amount, coupon_sortorder, ...rest } = values
        const data = {
            ...rest,
            coupon_startdate: new Date(coupon_startdate).toGMTString(),
            coupon_enddate: new Date(coupon_enddate).toGMTString(),
            coupon_status,
            coupon_type,
            coupon_maxamount: parseInt(coupon_maxamount),
            coupon_minamount: parseInt(coupon_minamount),
            coupon_amount: parseInt(coupon_amount),
            coupon_sortorder: parseInt(coupon_sortorder),
        }
        console.log(data)

        // return;
        // ADD NEW CUSTOMER GROUP
        if (!params.id) {
            const variables = { data }


            console.log(variables)
            apolloClient.mutate({
                mutation: couponMutation.CREATE_COUPON,
                variables,
                // refetchQueries: [
                //     {
                //         query: customerQuery.GET_ALL_CUSTOMER_GROUPS,
                //         context: {
                //             headers: {
                //                 TENANTID: process.env.REACT_APP_TENANTID,
                //                 Authorization: Cookies.get('psp_t')
                //             }
                //         }
                //     },
                //     'getAllCustomerGroups'
                // ],
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: Cookies.get('psp_t')
                    },

                },

            }).then(res => {
                const data = res?.data?.createCoupon
                if (!data.status) return toast.error(data.message);
                history.push("/admin/products/coupon");
                window.location.reload()
                toast.success(`${values.coupon_name} coupon added successfully`);
            }).catch(err => {
                console.log("got error on addCustomerGroup", err)
                return toast.error('Something Went wrong !!')
            }).finally(() => {
                setIsLoading(false)
            })
        }
        // UPDATE Coupon
        else {
            const variables = {
                data: { coupon_uuid: params.id, ...data }
            }
            console.log(variables)
            apolloClient.mutate({
                mutation: couponMutation.UPDATE_COUPON,
                variables,
                // refetchQueries: [
                //     {
                //         query: customerQuery.GET_ALL_CUSTOMER_GROUPS,
                //         context: {
                //             headers: {
                //                 TENANTID: process.env.REACT_APP_TENANTID,
                //                 Authorization: Cookies.get('psp_t')
                //             }
                //         }
                //     },
                //     'getAllCustomerGroups'
                // ],
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: Cookies.get('psp_t')
                    },
                },

            }).then(res => {
                const data = res?.data?.updateCoupon
                if (!data.status) return toast.error(data.message);
                history.push("/admin/products/coupon");
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
                title={params.id ? `Manage Coupon | Edit (${params.name})` : "Add Coupon"}
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>

                            {/* {params.id && singleCustomerGroup.isLoading ? */}
                            {params.id && singleCoupon.isLoading ?
                                <div div className="spin">
                                    <Spin />
                                </div>

                                : <Form
                                    style={{ width: '100%' }}
                                    form={form}
                                    name="addRole"
                                    onFinish={handleSubmit}
                                    onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                                    labelCol={{ span: 4 }}
                                >
                                    <Form.Item
                                        rules={[{ required: true, max: maxLength, message: "Please enter Coupon Name" }]}
                                        name="coupon_name" label="Coupon Name"
                                        initialValue={params.name || ""}
                                    >
                                        <Input placeholder='Enter Coupon Name' />
                                    </Form.Item>

                                    <Form.Item
                                        rules={[{ required: true, message: "Please enter Coupon Description" }]}
                                        name="coupon_description" label="Description"
                                        initialValue={singleCoupon.data.coupon_description || ""}
                                    >
                                        <TextArea rows={4} placeholder="Enter Coupon Description" />
                                    </Form.Item>
                                    <Form.Item
                                        rules={[{ required: true, max: maxLength, message: "Please enter Coupon CODE" }]}
                                        name="coupon_code" label="CODE"
                                        initialValue={singleCoupon.data.coupon_code || ""}
                                    >
                                        <Input placeholder='Enter Coupon CODE' />
                                    </Form.Item>
                                    <Form.Item
                                        rules={[{ required: true, max: maxLength, message: "Please enter Coupon Type" }]}
                                        // name="customer_group_name"
                                        label="Type"
                                    >
                                        <Select value={coupon_type} onChange={value => setCoupon_type(value)} placeholder="Select Coupon type" >
                                            <Select.Option key={1} value={"percentage"} >Percentage</Select.Option>
                                            <Select.Option key={2} value={"flat"} >Flat</Select.Option>

                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        rules={[{ required: true, message: "Please enter Coupon Amount" }]}
                                        name="coupon_amount" label="Amount"
                                        initialValue={singleCoupon.data.coupon_amount || ""}
                                    >
                                        <Input type='number' placeholder='Enter Coupon Amount' />
                                    </Form.Item>
                                    <Form.Item
                                        rules={[{ required: true, message: "Please enter Minimum Amount" }]}
                                        name="coupon_minamount" label="Minimum Amount"
                                        initialValue={singleCoupon.data.coupon_minamount || ""}
                                    >
                                        <Input type='number' placeholder='Enter Minimum Amount' />
                                    </Form.Item>
                                    <Form.Item
                                        rules={[{ required: true, message: "Please enter Maximum Amount" }]}
                                        name="coupon_maxamount" label="Maximum Amount"
                                        initialValue={singleCoupon.data.coupon_maxamount || ""}
                                    >
                                        <Input type='number' placeholder='Enter Maximum Amount' />
                                    </Form.Item>

                                    <Form.Item
                                        rules={[{ required: true, message: "Please enter Start Date" }]}
                                        name="coupon_startdate"
                                        label="Start Date"
                                    // initialValue={moment(parseInt(singleCoupon.data.coupon_startdate)) || this.initialValue}
                                    // init

                                    >
                                        <DatePicker />
                                    </Form.Item>
                                    <Form.Item
                                        rules={[{ required: true, message: "Please enter End Date" }]}
                                        name="coupon_enddate"
                                        label="End Date"
                                    // initialValue={moment(parseInt(singleCoupon.data.coupon_enddate)) || ""}
                                    // initialValue={""}
                                    >
                                        <DatePicker />
                                    </Form.Item>

                                    <Form.Item
                                        rules={[{ required: true, message: "Please enter Sort order" }]}
                                        name="coupon_sortorder" label="Sort order"
                                        initialValue={singleCoupon.data.coupon_sortorder || ""}

                                    >
                                        <Input type='number' placeholder='Enter sort order' />
                                    </Form.Item>


                                    <Form.Item
                                        label="Coupon Status"
                                    >
                                        <Switch checked={coupon_status} onChange={checked => setCoupon_status(checked)} />
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
                                            <Link to="/admin/customers/group">
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

export default AddCoupon;
