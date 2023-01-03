import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Input, Table, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { SearchOutlined } from '@ant-design/icons';
import config from '../../config/config';
import apolloClient, { customerMutation, customerQuery, vendorQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { viewPermission } from '../../utility/utility';

const ListVendor = () => {
  viewPermission('vendor');

  const [vendors, setVendors] = useState({ data: [], isLoading: true });

  const [filteredVendors, setFilteredVendors] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleStatusChange = (record, checked) => {
    const variables = {
      data: {
        customer_group_id: record.customer_group_id,
        customergroup_status: checked,
      },
    };
    apolloClient
      .mutate({
        mutation: customerMutation.UPDATE_CUSTOMER_GROUP,
        variables,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.updateCustomerGroup;
        if (!data.status) return toast.error(data.message);
        toast.success(`${record.customer_group_name} Group Status Updated successfully`);
      })
      .catch(err => {
        console.log('got error on updateStatus', err);
        return toast.error('Something Went wrong !!');
      });
  };

  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'company_name',
      key: 'company_name',
      ellipsis: true,
      sorter: (a, b) => (a.company_name.toUpperCase() > b.company_name.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
      sorter: (a, b) => (a.email.toUpperCase() > b.email.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Phone',
      dataIndex: 'phone_number',
      key: 'phone_number',
      // width: 200,
      ellipsis: true,
      sorter: (a, b) => (a.phone_number.toUpperCase() > b.phone_number.toUpperCase() ? 1 : -1),
    },
    {
      title: 'EIN',
      dataIndex: 'EIN_no',
      key: 'EIN_no',
      ellipsis: true,
      sorter: (a, b) => (a.EIN_no.toUpperCase() > b.EIN_no.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Fax',
      dataIndex: 'FAX_no',
      key: 'FAX_no',
      ellipsis: true,
      sorter: (a, b) => (a.FAX_no.toUpperCase() > b.FAX_no.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      // width: 200,
      ellipsis: true,
      sorter: (a, b) => (a.description.toUpperCase() > b.description.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 100,
      sorter: (a, b) => (a.status === b.status ? 0 : a.status ? -1 : 1),
      filters: [
        {
          text: 'Active',
          value: true,
        },
        {
          text: 'Inactive',
          value: false,
        },
      ],
      onFilter: (value, record) => record.status === value,
      render: (value, record) => (
        <Switch defaultChecked={value} title="Status" onChange={checked => handleStatusChange(record, checked)} />
      ),
    },

    {
      title: 'Action',
      dataIndex: 'action',
      width: 70,
      align: 'right',
      render: (text, record) => (
        <>
          <Link to={`/admin/vendor/add?id=${record.id}`}>
            {/* <Button size="default" type="white" title='Edit'> */}
            <FontAwesome name="edit" style={{ margin: '.5em 1em' }} />
            {/* </Button> */}
          </Link>
        </>
      ),
      key: 'last_name',
    },
  ];

  // LOAD CUSTOMER GROUPS
  useEffect(() => {
    // return;
    apolloClient
      .query({
        query: vendorQuery.GET_ALL_VENDOR,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.getAllVendor;

        if (!data?.status) return;
        setVendors(s => ({ ...s, data: data?.data, error: '' }));
      })
      .catch(err => {
        setVendors(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setVendors(s => ({ ...s, isLoading: false }));
      });
  });

  const onChangeSearch = e => {
    const value = e.target.value;
    setSearchText(value);
    setFilteredVendors(
      vendors.data.filter(group =>
        (group?.customer_group_name + group?.customergroup_description + group.customergroup_sortorder)
          .toLowerCase()
          .includes(value.toLowerCase()),
      ),
    );
  };

  return (
    <>
      <PageHeader
        title="Vendors"
        buttons={[
          <div key="1" className="page-header-actions">
            <Link to="/admin/vendor/add">
              <Button size="small" title="Add Vendors" type="primary">
                <FeatherIcon icon="plus" />
              </Button>
            </Link>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {vendors.isLoading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : (
                <>
                  <Input placeholder="Search Vendor..." prefix={<SearchOutlined />} onChange={onChangeSearch} />
                  <br />
                  <br />

                  <span className={'psp_list'}>
                    <Table
                      className="table-responsive"
                      columns={columns}
                      rowKey={'g_s'}
                      size="small"
                      dataSource={searchText ? filteredVendors : vendors.data}
                      rowClassName={(record, index) => (index % 2 === 0 ? '' : 'altTableClass')}
                      // pagination={false}
                      pagination={{
                        defaultPageSize: config.VENDOR_PER_PAGE,
                        total: searchText ? filteredVendors.length : vendors.data.length,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                      }}
                    />
                  </span>
                </>
              )}
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default ListVendor;
