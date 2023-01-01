import { AutoComplete, Button, Input, Select, Spin, Table, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import FeatherIcon from 'feather-icons-react';
import apolloClient, { attributeQuery } from '../../../utility/apollo';
import Cookies from 'js-cookie';
const { Option } = Select;

// Component for Value column
const Inputs = ({ index, setAttributesTableData, attribute_type, attribute_value }) => {
    const [type, setType] = useState('')
    const [file, setFile] = useState([])

    const handleOnBlur = e => {
        setAttributesTableData(state => {
            let data = state[index];
            const copy = [...state];
            copy[index] = { ...data, attribute_value: e.target.value }
            return copy;
        })
    }

    return (
        <>
            <Select
                style={{ width: '10em', marginRight: "1em" }}
                placeholder="Select type"
                defaultValue={attribute_type || null}
                onChange={value => {
                    setType(value)
                    setAttributesTableData(arr => {
                        let data = arr[index];
                        const copy = [...arr];
                        copy[index] = { ...data, attribute_type: value }
                        return copy;
                    })
                }}
            >
                <Option value="text" >Text</Option>
                <Option value="link" >Link</Option>
                <Option value="file" >File</Option>
                <Option value="none" >None</Option>
            </Select>

            {type === "text"
                && < Input
                    placeholder="Enter text"
                    style={{ width: 'calc(100% - 12em)' }}
                    size="middle"
                    onBlur={handleOnBlur}
                    defaultValue={attribute_value}
                />
            }
            {type === "link"
                && < Input placeholder="Enter Link" style={{ width: 'calc(100% - 12em)' }} size="middle" onBlur={handleOnBlur}
                    defaultValue={attribute_value}
                />
            }
            {type === "file"
                && <Upload
                    // style={{ marginTop: "2em" }}

                    beforeUpload={(file) => {
                        setFile([file]);
                        return false;
                    }
                    }
                    onRemove={() => setFile([])}
                    fileList={file}
                >
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
            }
        </>
    )
}

const AttributeTab = ({ attributesTableData, setAttributesTableData }) => {


    const addNewRow = () => {
        const newData = {
            id: new Date().getTime(),
            attr_group_id: "",
            attribute_id: '',
            attribute_type: '',
            attribute_value: ''
        }
        setAttributesTableData(prevState => [...prevState, newData])
        console.log(attributesTableData)
    }
    const removeRow = (id) => {
        setAttributesTableData(prevState => {
            return prevState.filter((value) => value.id !== id)
        })
    }


    const [attributeGroups, setAttributeGroups] = useState({ data: [], isLoading: true })
    const [selectedGroup, setSelectedGroup] = useState({})
    const handleAttrGroupSelect = (val, item, index) => {
        console.log(item)
        setSelectedGroup(item)

        setAttributesTableData(arr => {
            let data = arr[index];
            const copy = [...arr];
            copy[index] = { ...data, attr_group_id: val }
            return copy;
        })
    }
    const handleAttributeSelect = (val, item, index) => {
        console.log(val)
        setAttributesTableData(arr => {
            let data = arr[index];
            const copy = [...arr];
            copy[index] = { ...data, attribute_id: val }
            return copy;
        })
    }

    // load ATTRIBUTE GROUPS
    useEffect(() => {
        // return
        apolloClient.query({
            query: attributeQuery.GET_ALL_ATTR_GROUPS_FOR_ADD_PROD,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {

            const data = res?.data?.getAllAttrGroups

            if (!data?.status) return
            setAttributeGroups(s => ({ ...s, data: data?.data, error: '' }))
        }).catch(err => {
            setAttributeGroups(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setAttributeGroups(s => ({ ...s, isLoading: false }))
        })

    });

    // List For Table Column
    const column = [
        {
            title: 'Attribute Group',
            dataIndex: 'attr_group_id',
            key: 'attr_group_id',
            width: 200,
            render: (val, record, index) => <Select
                style={{ width: "100%" }}
                placeholder={attributeGroups.isLoading ? 'Loading...' : "Select Group..."}
                defaultValue={val || null}
                options={attributeGroups.data.map(item => ({
                    label: item.attr_group_name,
                    value: item.id,
                    attributes: item.attributes
                }))}
                onSelect={(val, item) => handleAttrGroupSelect(val, item, index)}
            />
        },
        {
            title: 'Attribute',
            dataIndex: 'attribute_id',
            key: 'attribute_id',
            width: 200,
            render: (val, record, index) => <Select
                style={{ width: "100%" }}
                disabled={!selectedGroup.value}
                defaultValue={val || null}
                placeholder={attributeGroups.isLoading ? 'Loading...'
                    : "Select Group..."
                }
                options={selectedGroup?.attributes?.map(item => ({
                    label: item.attribute_name,
                    value: item.id,
                }))}
                onSelect={(val, item) => handleAttributeSelect(val, item, index)}
            // onSelect={val => {
            //     console.log(val)
            //     setSelectedAttribute(val)
            // }}
            />
        },
        {
            title: 'Values',
            dataIndex: 'value',
            key: 'value',
            render: (text, record, index) => <Inputs {...{ index, setAttributesTableData, attribute_type: record.attribute_type, attribute_value: record.attribute_value }} />
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 90,
            align: "right",
            render: (text, record) => <Button size="" title="Remove" type="danger"
                onClick={() => removeRow(record.id)}
            ><FeatherIcon icon="minus" size={15} /></Button>
        },
    ];



    return (

        <>
            <Table
                columns={column}
                dataSource={attributesTableData}
                pagination={false}
                rowKey="id"
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginBottom: '10px', marginRight: '1em' }}>
                <Button title="Add Banner" htmlType="button" type="primary" onClick={addNewRow}>
                    <FeatherIcon icon="plus" size={15} />
                </Button>
            </div>
        </>
    );
};

export default AttributeTab;