import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Table, Spin, Switch, message } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { SearchOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import apolloClient, { attributeMutation, attributeQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import { viewPermission } from '../../utility/utility';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';

const AttributeGroup = () => {
  viewPermission('attribute-group');
  // const dummyData = [...Array(10).keys()].map(i => ({ g_n: `Group ${i + 1}`, g_s: i + 1 }))
  const [attributeGroups, setAttributeGroups] = useState({ data: [], isLoading: true });
  const [filteredAttributeGroups, setFilteredAttributeGroups] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    apolloClient
      .query({
        query: attributeQuery.GET_ALL_ATTR_GROUPS,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.getAllAttrGroups;

        if (!data?.status) return InternalErrorMessage();
        setAttributeGroups(s => ({ ...s, data: data?.data, error: '' }));
      })
      .finally(() => {
        setAttributeGroups(s => ({ ...s, isLoading: false }));
      });
  }, []);

  const columns = [
    {
      title: 'Group Name',
      dataIndex: 'attr_group_name',
      key: 'attr_group_name',
      sorter: (a, b) => (a.attr_group_name.toUpperCase() > b.attr_group_name.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Sort Order',
      dataIndex: 'attrgroup_sortorder',
      key: 'attrgroup_sortorder',
      sorter: (a, b) => (a.attrgroup_sortorder === b.attrgroup_sortorder ? 0 : a.attrgroup_sortorder ? -1 : 1),
    },
    {
      title: 'Status',
      dataIndex: 'attrgroup_status',
      key: 'attrgroup_status',
      align: 'right',
      sorter: (a, b) => (a.attrgroup_status === b.attrgroup_status ? 0 : a.attrgroup_status ? -1 : 1),
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
      onFilter: (value, record) => record.attrgroup_status === value,
      render: (value, record) => (
        <Switch defaultChecked={value} title="Status" onChange={checked => handleStatusChange(record, checked)} />
      ),
    },

    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      width: 70,
      align: 'right',
      render: (value, record) => (
        <>
          <Link to={`/admin/attributes/add-group?id=${value}`}>
            {/* <Button size="default" type="white" title='Edit'> */}
            <FontAwesome name="edit" style={{ margin: '.5em 1em' }} />
            {/* </Button> */}
          </Link>
        </>
      ),
    },
  ];

  const onChangeSearch = e => {
    const value = e.target.value;
    setSearchText(value);
    setFilteredAttributeGroups(
      attributeGroups.data.filter(attr => attr?.g_n.toLowerCase().includes(value.toLowerCase())),
    );
  };

  const handleStatusChange = (record, checked) => {
    const variables = { data: { attr_group_id: record.id, attrgroup_status: checked } };
    console.log(variables);
    // return;
    apolloClient
      .mutate({
        mutation: attributeMutation.UPDATE_ATTR_GROUP,
        variables,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.updateAttrGroup;
        if (!data?.status) return InternalErrorMessage();
        message.success(`${record.attr_group_name} status updated successfully`);
      });
  };

  return (
    <>
      <PageHeader
        title="Attribute Groups"
        buttons={[
          <div key="1" className="page-header-actions">
            <Link to="/admin/attributes/add-group">
              <Button size="small" title="Add Attribute Group" type="primary">
                <FeatherIcon icon="file-plus" />
              </Button>
            </Link>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {attributeGroups.isLoading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : (
                <>
                  <Input
                    placeholder="Search Attribute Groups..."
                    prefix={<SearchOutlined />}
                    onChange={onChangeSearch}
                  />
                  <br />
                  <br />

                  <span className={'psp_list'}>
                    <Table
                      className="table-responsive"
                      columns={columns}
                      rowKey={'g_s'}
                      size="small"
                      dataSource={searchText ? filteredAttributeGroups : attributeGroups.data}
                      rowClassName={(record, index) => (index % 2 === 0 ? '' : 'altTableClass')}
                      // pagination={false}
                      // pagination={{
                      //     defaultPageSize: config.PERMISSIONS_PER_PAGE,
                      //     total: searchText ? filteredPermissions.length : permissions.length,
                      //     showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                      // }}
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

export default AttributeGroup;
