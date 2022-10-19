import { AutoComplete, Button, Input, Select, Spin, Table, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import FeatherIcon from 'feather-icons-react';
import apolloClient, { attributeQuery } from '../../../utility/apollo';
import Cookies from 'js-cookie';
const { Option } = Select;


const Inputs = () => {
    const [type, setType] = useState('')
    const [file, setFile] = useState([])

    return (
        <>
            <Select
                style={{ width: '100%' }}
                placeholder="Select type"
                onChange={value => setType(value)}
            >
                <Option value="text" >Text</Option>
                <Option value="link" >Link</Option>
                <Option value="file" >File</Option>
            </Select>

            {type === "text" && < Input placeholder="Enter text" style={{ marginTop: '1em' }} />}
            {type === "link" && < Input placeholder="Enter Link" style={{ marginTop: '1em' }} />}
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


const AttributeTab = () => {
    const initalData = [{
        id: new Date().getTime(),
        attribute: '',
        type: '',
        value: ''
    }]
    const [attributes, setAttributes] = useState(initalData)

    const addNewRow = () => {
        const newData = (
            {
                id: new Date().getTime(),
                attribute: '',
                type: '',
                value: ''
            }
        )
        setAttributes(prevState => [...prevState, newData])
    }
    const removeRow = (id) => {
        setAttributes(prevState => {
            return prevState.filter((value) => value.id !== id)
        })
    }

    // List For Table Column
    const column = [
        {
            title: 'Attribute',
            dataIndex: 'Attribute',
            key: 'Attribute',
            width: 300,
            render: (text, record) => {
                const options = attributesData.data.map(item => ({ value: item.attribute_name }))

                return (
                    <AutoComplete
                        style={{
                            width: "100%",
                        }}
                        options={options}
                        placeholder="Attribute name"
                    // filterOption={(inputValue, option) =>
                    //     option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    // }
                    />

                )
            }
        },
        {
            title: 'Values',
            dataIndex: 'value',
            key: 'value',
            render: (text, record) => <Inputs />
        },
        // {
        //     title: 'Sort Order',
        //     dataIndex: 'sort_order',
        //     key: 'sort_order',
        //     width: 150,
        //     render: (text, record) => <Input type="number" placeholder="Sort Order" onChange={(e) => record.sort_order = e.target.value} />
        // },
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

    const [attributesData, setAttributesData] = useState({ data: [], isLoading: true })
    useEffect(() => {
        // return
        apolloClient.query({
            query: attributeQuery.GET_ALL_ATTRIBUTES,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {

            const data = res?.data?.getAllAttributes

            if (!data?.status) return
            setAttributesData(s => ({ ...s, data: data?.data, error: '' }))

        }).catch(err => {
            setAttributesData(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setAttributesData(s => ({ ...s, isLoading: false }))
        })

    }, [])

    if (attributesData.isLoading) return (
        <div className="spin">
            <Spin />
        </div>
    )

    return (

        <>
            <Table
                columns={column}
                dataSource={attributes}
                pagination={false}
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