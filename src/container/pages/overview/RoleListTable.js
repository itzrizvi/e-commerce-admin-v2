import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { TableWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { useDispatch, useSelector } from 'react-redux';
import { rolesDataRead } from '../../../redux/roles/actionCreator';
import Moment from 'react-moment';


const RoleListTable = () => {
  const dispatch = useDispatch();
  const { rolesData } = useSelector(state => {
    return {
      rolesData: state.roles.data ?? []
    };
  });



  let rolesTableData = [];

  const [tableData, setTableData] = useState([])
  const [isFilter, setIsFilter] = useState(false)

  rolesData.map(roles => {
    const { role_uuid, role, createdAt } = roles;

    return rolesTableData.push({
      key: role_uuid,
      name: role,
      createdAt: createdAt,
      dateTime: <span className={"status-text"}>{<Moment format="DD MMMM  YYYY ">{parseInt(createdAt)}</Moment>}</span>,
      action: (
        <div className="table-actions">
          <>
            <Button className="btn-icon" type="info" to="#" shape="circle">
              <FeatherIcon icon="edit" size={16} />
            </Button>
          </>
        </div>
      ),
    });
  });

  useEffect(() => {
    dispatch(rolesDataRead());
  }, [dispatch])

  const rolesTableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Date Time',
      dataIndex: 'dateTime',
      key: 'dateTime',
      sorter: (a, b) => parseInt(a.createdAt) - parseInt(b.createdAt),
      sortDirections: ['descend'],
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action'
    },
  ];

  const filterHandler = (val, type) => {
    setIsFilter(true);
    if (type === 'name') {
      setTableData(rolesTableData.filter(roles => roles.name.includes(val)))
    }
  }



  return (
    <Cards headless>
      {/* <Row gutter={25} style={{ marginBottom: 20 }}>
        <Col xl={8} lg={10} md={12} xs={24}>
          <Input prefix={<FeatherIcon icon="search" size={14} />} placeholder="Search by Role" onChange={(e) => filterHandler(e.target.value, 'name')} />
          </Col>
        </Row> */}

      <Input prefix={<FeatherIcon icon="search" size={14} />} placeholder="Search by Role" onChange={(e) => filterHandler(e.target.value, 'name')} style={{ marginBottom: '1em' }} />
      <TableWrapper className="table-responsive">

        <Table
          dataSource={isFilter ? tableData : rolesTableData}
          columns={rolesTableColumns}
          size="small"
          rowClassName={(record, index) => (index % 2 == 0 ? "" : "altTableClass")}
          pagination={{
            defaultPageSize: 10,
            total: isFilter ? tableData.length : rolesTableData.length,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
        // bordered
        // loading={false}
        />
      </TableWrapper>
    </Cards>
  );
};

export default RoleListTable;
