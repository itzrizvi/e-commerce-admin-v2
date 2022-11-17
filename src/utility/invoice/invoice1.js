import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer"
import Logo from './logo.png'
import LogoSvg from './logo.svg'



const style = StyleSheet.create({
    body: {
        paddingTop: 50,
        // paddingBottom: 65,
        paddingHorizontal: 50,
        fontSize: 11,
        backgroundColor: '#f4f4f5'
    },
    invoice: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    invoiceTitle: {
        color: "#252425",
        fontWeight: "700"
    },
    invoiceValue: {
        color: "#414343"
    },

    subTitle: {
        marginBottom: 10,
        fontSize: 14,
        color: "#272B41",
    },
    customerTitle: {
        fontWeight: 700,
        border: 2
    },
    tr: {
        display: 'flex',
        flexDirection: "row"
    },
    td1: {
        width: "40%",
        paddingLeft: 15,
    },
    td2: {
        width: "20%",
        textAlign: "center",
    },
    td3: {
        width: "20%",
        textAlign: "center",
    },
    td4: {
        width: "20%",
        textAlign: "right",
        paddingRight: 15,
    },
    total: {
        width: 200,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 15,
        paddingLeft: 15,
        marginTop: 7
    },

})

const Invoice1 = () => {

    const invoice = {
        id: "1002",
        date: "January 13, 2022",
        total: 2342,
        note: "Free Shipping with 30 days money-back guarantee"
    }

    const customer = {
        name: "Deniyal Brine",
        email: "DeniyalBrine@gmail.com"
    }

    const billing = {
        id: 10001,
        name: "Denial Brine",
        email: "denialbrine@gmail.com",
        address1: "Address One",
        address2: "Address Two",
        phone: "0655",
        fax: "ssaa@fjagjf.com",
        email: "test2@gmail.com",
        city: "Test City",
        state: "State",
        zip_code: "1207",
        country: "United State",
        type: "shipping",
    }
    const shipping = { ...billing }

    const product = [
        {
            id: 33,
            order_id: 5,
            price: 50,
            quantity: 5,
            product: {
                id: 10002,
                prod_name: "SSD 2"
            }
        },
        {
            id: 34,
            order_id: 5,
            price: 40,
            quantity: 4,
            product: {
                id: 10003,
                prod_name: "SSD 3"
            }
        },
        {
            id: 35,
            order_id: 5,
            price: 50,
            quantity: 4,
            product: {
                id: 10001,
                prod_name: "SSD 11"
            }
        }
    ]

    return (
        <Document>
            <Page style={style.body}>
                {/* customer & logo */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        paddingBottom: 30,
                        borderBottom: "1 solid #ebebeb"
                    }}
                >
                    <View
                        style={{
                            color: "#414343"
                        }}
                    >
                        <Text
                            style={{
                                color: "black",
                                fontWeight: "700",
                                marginBottom: 7
                            }}
                        >BILL FROM :</Text>
                        <Text style={{ marginBottom: 3 }} >Prime Server Parts</Text>
                        <Text style={{ marginBottom: 3 }} >primeserverparts@gmail.com</Text>
                        <Text style={{ marginBottom: 3 }} >+12027953213</Text>

                    </View>
                    <Image
                        src={Logo}
                        style={{
                            height: 35,
                        }}
                    />
                </View>

                {/* bill to & invoice  */}
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 40,
                    }}
                >
                    <View
                        style={{
                            color: "#414343"
                        }}
                    >
                        <Text
                            style={{
                                color: "black",
                                fontWeight: "700",
                                marginBottom: 7
                            }}
                        >BILL TO :</Text>
                        <Text style={{ marginBottom: 3 }} >{billing?.name}</Text>
                        <Text style={{ marginBottom: 3 }} >{billing?.address2}</Text>
                        <Text style={{ marginBottom: 3 }} >{billing?.address2}</Text>
                        <Text style={{ marginBottom: 3 }} >{billing?.city}, {billing?.state}, {billing?.zip_code}</Text>
                        <Text style={{ marginBottom: 3 }} >{billing?.country}</Text>
                        <Text style={{ marginBottom: 3 }} >{billing?.email}</Text>


                    </View>
                    <View
                        style={{
                            width: "230"
                        }}
                    >
                        <View
                            style={[style.invoice]}
                        >
                            <Text style={[style.invoiceTitle]}>INVOICE #</Text>
                            <Text style={style.invoiceValue}>{invoice.id}</Text>
                        </View>
                        <View
                            style={[style.invoice]}
                        >
                            <Text style={[style.invoiceTitle]}>INVOICE DATE</Text>
                            <Text style={style.invoiceValue}>{invoice.date}</Text>
                        </View>
                        <View
                            style={[style.invoice, {
                                backgroundColor: "#cfd4d5",
                                fontWeight: "700",
                                color: "black"

                            }]}
                        >
                            <Text style={[style.invoiceTitle]}>AMOUNT DUE</Text>
                            <Text>${invoice.total}</Text>
                        </View>
                    </View>

                </View>






                {/* Products */}
                <View
                    style={{
                        marginTop: 60,
                    }}
                >
                    <View
                        style={[
                            style.tr, {
                                marginBottom: 10,
                                fontWeight: 700,
                                paddingTop: 5,
                                paddingBottom: 5,
                                // backgroundColor: "#c8c8c8",
                                backgroundColor: "#cfd4d5",
                            }
                        ]}
                    >
                        <Text style={style.td1} >Product</Text>
                        <Text style={style.td2} >Quantity</Text>
                        <Text style={style.td3} >Price</Text>
                        <Text style={style.td4} >Total</Text>

                    </View>
                    {product.map(item => (
                        <View style={[style.tr, {
                            // color: "#272b41"
                            color: "#4d4c4c",
                            paddingBottom: 9,
                            paddingTop: 9,
                            borderBottom: "1 solid #ebebeb"

                        }]}>
                            <Text style={style.td1} >{item?.product?.prod_name}</Text>
                            <Text style={style.td2} >{item?.quantity}</Text>
                            <Text style={style.td3} >$ {item?.price}</Text>
                            <Text style={style.td4} >$ {item?.price * item?.quantity}</Text>

                        </View>
                    ))}

                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 70,
                            // color: '#272B41'
                            color: '#3a3f59'
                        }}
                    >
                        <View
                            style={{
                                paddingRight: 20,
                                paddingTop: 12
                            }}
                        >
                            <Text style={{ color: "black", marginBottom: 4 }}>NOTES / MEMO</Text>
                            <Text style={{ color: "gray" }}>{invoice.note}</Text>

                        </View>

                        <View>
                            <View style={style.total} >
                                <Text>SUBTOTAL</Text>
                                <Text>$6002</Text>
                            </View>
                            <View style={style.total} >
                                <Text>SHIPPING COST</Text>
                                <Text>$6002</Text>
                            </View>
                            <View style={style.total} >
                                <Text>TAX</Text>
                                <Text>$6002</Text>
                            </View>
                            <View style={[
                                style.total,
                                {
                                    backgroundColor: "#cfd4d5",
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                    fontWeight: "700",
                                    color: "black"
                                }
                            ]} >
                                <Text>TOTAL</Text>
                                <Text>$6002</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </Page>

        </Document >
    );
};

export default Invoice1;