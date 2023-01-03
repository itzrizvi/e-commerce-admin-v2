import React, { useEffect, useState } from 'react';
import { Row, Col, Spin } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import apolloClient from '../../apollo';
import { contactUsQueries } from '../../apollo/contactUs';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'
import { renderImage } from '../../utility/images';

const ViewSingleMessage = () => {
    const { search } = useLocation();
    const params = queryString.parse(search)

    const [singleMessage, setSingleMessage] = useState({ data: {}, isLoading: true })
    useEffect(() => {
        apolloClient
            .query({
                query: contactUsQueries.GET_SINGLE_CONTACT_US_MSG,
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: Cookies.get('psp_t'),
                    },
                },
                variables: { query: { id: parseInt(params.id) } }
            })
            .then(res => {
                const data = res?.data?.getSingleContactUsMsg;
                if (!data.status) toast.error(data.message)
                setSingleMessage({ data: data.data, isLoading: false })

            })
            .catch(err => {
                console.log('Error on get single message', err);
                setSingleMessage({ data: {}, isLoading: false })
            })
            .finally(() => {

            });

    });


    return (
        <>
            <PageHeader
                title={`Messege by ${singleMessage.isLoading ? '....' : `(${singleMessage.data.email})`}`}
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>
                            {singleMessage.isLoading ?
                                <div className="spin">
                                    <Spin />
                                </div>
                                :
                                <>

                                    <table style={{ width: "100%" }}>
                                        <tbody>

                                            <tr>
                                                <td style={{ width: "100px" }}><b>Name :</b></td>
                                                <td>{singleMessage?.data?.name}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Email :</b></td>
                                                <td><a href={`mailto:${singleMessage?.data?.email}`} >{singleMessage?.data?.email}</a></td>
                                            </tr>
                                            <tr>
                                                <td><b>Phone :</b></td>
                                                <td><a href={`tel:${singleMessage?.data?.phone}`} >{singleMessage?.data?.phone}</a></td>
                                            </tr>
                                            <br />
                                            <tr>
                                                <td><b>Subject :</b></td>
                                                <td>{singleMessage?.data?.subject}</td>
                                            </tr>
                                            <br />
                                            <tr>
                                                <td style={{ verticalAlign: "baseline" }}
                                                ><b>Message :</b></td>
                                                <td><p
                                                    style={{
                                                        padding: "1em",
                                                        paddingBottom: "6em",
                                                        border: "1px solid #dedede",
                                                        borderRadius: "7px",
                                                        background: "#f4f5f7",
                                                    }}
                                                >{singleMessage?.data?.message}</p></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <br />
                                    {/* <p><b>Message :</b></p>
                                    <p
                                        style={{
                                            padding: "1em",
                                            paddingBottom: "6em",
                                            border: "1px solid #dedede",
                                            borderRadius: "7px",
                                            background: "#f4f5f7",
                                        }}
                                    >{singleMessage?.data?.message}</p>
                                    <br /> */}

                                    <div>
                                        {singleMessage?.data?.images?.map(item => {
                                            console.log("test img: ", renderImage(item.id, item.image, "contact-us", '', true))
                                            return (
                                                <img key={item.id} src={renderImage(item.id, item.image, "contact-us", '', true)} alt="" />
                                            )
                                        })}
                                    </div>

                                </>
                            }

                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default ViewSingleMessage;
