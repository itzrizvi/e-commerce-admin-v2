import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Input, Table, Switch, Checkbox, message } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import apolloClient, { productMutation, productQuery } from '../../utility/apollo';
import config from '../../config/config';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { errorImageSrc, renderImage } from '../../utility/images';
import Cookies from 'js-cookie';
import { viewPermission } from '../../utility/utility';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';

const ListCategories = () => {
  viewPermission('category');
  const [categories, setCategories] = useState([]);
  const [categoriesData, setCategoriesData] = useState({ data: [], loading: true });
  const [filteredCategoryData, setFilteredCategoryData] = useState([]);

  const [isFilter, setIsFilter] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  // Load category
  useEffect(() => {
    apolloClient
      .query({
        query: productQuery.GET_ALL_CATEGORIES,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getAllCategories;
        if (!data?.status) return InternalErrorMessage();
        setCategories(data.categories);
        // console.log("list Category UseEffect:\n", data.categories);
      })
  }, []);

  // organize category
  useEffect(() => {
    if (!categories.length) return;
    let arrData = [];

    categories.forEach(item => {
      const parent = item.cat_name;
      const cat_sort_order = item.cat_sort_order;

      arrData.push({
        cat_name: parent,
        id: item.id,
        cat_sort_order,
        cat_des: item.cat_description,
        cat_isFeatured: item.is_featured,
        cat_status: item.cat_status,
        img: item.image,
      });
      if (item.subcategories) {
        item.subcategories.forEach(subCat => {
          const sub = subCat.cat_name;
          arrData.push({
            cat_name: `${parent} > ${sub}`,
            id: subCat.id,
            cat_des: subCat.cat_description,
            cat_isFeatured: subCat.is_featured,
            cat_status: subCat.cat_status,
            img: subCat.image,
          });
          if (subCat.subsubcategories) {
            subCat.subsubcategories.forEach(subSubCat => {
              const subSub = subSubCat.cat_name;
              arrData.push({
                cat_name: `${parent} > ${sub} > ${subSub}`,
                id: subSubCat.id,
                cat_des: subSubCat.cat_description,
                cat_isFeatured: subSubCat.is_featured,
                cat_status: subSubCat.cat_status,
                img: subSubCat.image,
              });
            });
          }
        });
      }
    });

    setCategoriesData({ data: arrData, loading: false });
  }, [categories]);

  const handleStatusChange = (record, checked) => {
    const variables = { data: { cat_id: record.id, cat_status: checked } };

    apolloClient
      .mutate({
        mutation: productMutation.UPDATE_CATEGORY,
        variables,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.updateCategory;
        if (!data?.status) return message.error(data?.message);
        message.success(`${record.cat_name} Category Status updated successfully.`);
      });
  };
  const handleIsFeaturesChange = (record, checked) => {
    const variables = { data: { cat_id: record.id, is_featured: checked } };

    apolloClient
      .mutate({
        mutation: productMutation.UPDATE_CATEGORY,
        variables,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.updateCategory;
        if (!data?.status) return InternalErrorMessage();
        message.success(`${record.cat_name} Category isFeatured Status updated.`);
      });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      ellipsis: true,
      sorter: (a, b) => (a.id.toUpperCase() > b.id.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Logo',
      dataIndex: 'id',
      key: 'id',
      width: 70,
      // render: (text, record) => (<img src={require('../../static/img/avatar/NoPath (3).png')} alt="" />),
      render: (text, record) => (
        <LazyLoadImage
          effect="blur"
          width="40"
          src={renderImage(record.id, record.img, 'category', '128x128')}
          onError={errorImageSrc}
          onL
          alt={record.id}
        />
      ),
    },
    {
      title: 'Category Name',
      dataIndex: 'cat_name',
      ellipsis: true,
      key: 'cat_name',
      sorter: (a, b) => (a.cat_name.toUpperCase() > b.cat_name.toUpperCase() ? 1 : -1),
    },
    // {
    //     title: 'Description',
    //     dataIndex: 'cat_des',
    //     key: 'cat_des',
    //     ellipsis: true,
    //     sorter: (a, b) => a.cat_des.toUpperCase() > b.cat_des.toUpperCase() ? 1 : -1,
    // },
    {
      title: 'Featured',
      dataIndex: 'cat_isFeatured',
      width: 110,
      align: 'center',
      key: 'cat_isFeatured',
      sorter: (a, b) => (a.cat_isFeatured === b.cat_isFeatured ? 0 : a.cat_isFeatured ? -1 : 1),
      filters: [
        {
          text: 'Featured',
          value: true,
        },
        {
          text: 'Not Featured',
          value: false,
        },
      ],
      onFilter: (value, record) => record.cat_isFeatured === value,
      render: (value, record) => (
        <Checkbox defaultChecked={value} onChange={e => handleIsFeaturesChange(record, e.target.checked)} />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'cat_status',
      width: 90,
      key: 'cat_status',
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
      onFilter: (value, record) => record.cat_status === value,
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
          <Link to={`/admin/categories/add?id=${record.id}`}>
            {/* <Button size="default" type="white" title='Edit'> */}
            <FontAwesome name="edit" style={{ margin: '.5em 1em' }} />
            {/* </Button> */}
          </Link>
        </>
      ),
      key: 'last_name',
    },
  ];

  const onChangeSearch = e => {
    const value = e.target.value;
    console.log('🚀 ~ file: ListCategories.js ~ line 216 ~ onChangeSearch ~ value', value);
    setSearchText(value);
    setFilteredCategoryData(
      categoriesData.data.filter(category =>
        (category?.cat_name + category?.cat_des + category?.id + category?.cat_sort_order)
          .toLowerCase()
          .includes(value.toLowerCase()),
      ),
    );
  };

  // Search & filter
  // useEffect(() => { });

  return (
    <>
      <PageHeader
        title="Categories"
        buttons={[
          <div key="1" className="page-header-actions">
            {/* <Button
                            size="small"
                            onClick={() => setIsFilter(state => !state)}
                            outlined
                            type="white"
                        >
                            <FeatherIcon icon="filter" />
                            filter
                        </Button> */}
            <Link to="/admin/categories/add">
              <Button size="small" title="Add Category" type="primary">
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
              {/* TEST CODES */}
              {/* <p>{JSON.stringify(categoriesData.data.map(item => item.cat_name))}</p> */}

              {categoriesData.loading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : (
                <>
                  <Input placeholder="Search Categories..." prefix={<SearchOutlined />} onChange={onChangeSearch} />{' '}
                  <br /> <br />
                  {/* {isFilter &&
                                        <div style={{
                                            marginBottom: '1.5em',
                                            display: 'flex',
                                            gap: "2em"
                                        }}
                                        >
                                            <Checkbox >Is Featured</Checkbox>
                                            <span>Status:  <Switch>Status</Switch>
                                            </span>

                                        </div>} */}
                  <span className={'psp_list'}>
                    <Table
                      className="table-responsive"
                      columns={columns}
                      rowKey={'id'}
                      size="small"
                      // dataSource={categoriesData.data}
                      dataSource={searchText ? filteredCategoryData : categoriesData.data}
                      rowClassName={(record, index) => (index % 2 === 0 ? '' : 'altTableClass')}
                      // pagination={false}
                      pagination={{
                        defaultPageSize: config.CATEGORY_PER_PAGE,
                        total: searchText ? filteredCategoryData.length : categoriesData.data.length,
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

export default ListCategories;
