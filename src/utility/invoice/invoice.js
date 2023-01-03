import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer"
import Logo from './logo.png'



const style = StyleSheet.create({
    body: {
        paddingTop: 50,
        paddingBottom: 65,
        paddingHorizontal: 35,
        fontSize: 12,
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

const Invoice = () => {

    const customer = {
        name: "Deniyal Brine",
        email: "DeniyalBrine@gmail.com"
    }

    const billing = {
        id: 10001,
        address1: "Address One",
        address2: "Address Two",
        phone: "0655",
        fax: "ssaa@fjagjf.com",
        email: "test2@gmail.com",
        city: "Test City",
        state: "State",
        zip_code: "1207",
        country: "Bangladesh",
        type: "shipping",
    }
    
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
                    }}
                >
                    <View>
                        <Text style={[style.subTitle, { color: "black", fontWeight: "700" }]}>Customer:</Text>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                color: "#272b41",
                                paddingLeft: 10
                            }}
                        >
                            <View>
                                <Text>Name</Text>
                                <Text>Email</Text>
                            </View>
                            <View>
                                <Text>:  {customer.name}</Text>
                                <Text>:  {customer.email}</Text>
                            </View>
                        </View>


                    </View>
                    <View>
                        <Image
                            src={Logo}
                            style={{
                                height: 30,
                            }}
                        />

                    </View>
                </View>
                {/* billing shipping */}
                <View
                    style={{
                        display: "flex",
                        flexDirection: 'row',
                        marginTop: '2cm',
                        backgroundColor: '#eef5fd',
                        color: "#435165",
                        padding: 24,
                    }}
                >
                    {/* Billing */}
                    <View
                        style={{ flex: 1 }}
                    >
                        <Text style={style.subTitle}>Billing Address</Text>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <View>
                                <Text>Email</Text>
                                <Text>Phone</Text>
                                <Text>fax</Text>
                                <Text>Address 1</Text>
                                <Text>Address 2</Text>
                                <Text>Country</Text>
                                <Text>City</Text>
                                <Text>State</Text>
                                <Text>Zip Code</Text>
                            </View>
                            <View
                                style={{
                                    marginLeft: 10
                                }}
                            >
                                <Text> :  {billing.email}</Text>
                                <Text> :  {billing.phone}</Text>
                                <Text> :  {billing.fax}</Text>
                                <Text> :  {billing.address1}</Text>
                                <Text> :  {billing.address2}</Text>
                                <Text> :  {billing.country}</Text>
                                <Text> :  {billing.city}</Text>
                                <Text> :  {billing.state}</Text>
                                <Text> :  {billing.zip_code}</Text>
                            </View>
                        </View>

                    </View>
                    {/* Shipping */}
                    <View
                        style={{ flex: 1 }}
                    >
                        <Text style={style.subTitle}>Billing Address</Text>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <View>
                                <Text>Email</Text>
                                <Text>Phone</Text>
                                <Text>fax</Text>
                                <Text>Address 1</Text>
                                <Text>Address 2</Text>
                                <Text>Country</Text>
                                <Text>City</Text>
                                <Text>State</Text>
                                <Text>Zip Code</Text>
                            </View>
                            <View
                                style={{
                                    marginLeft: 10
                                }}
                            >
                                <Text> :  {billing.email}</Text>
                                <Text> :  {billing.phone}</Text>
                                <Text> :  {billing.fax}</Text>
                                <Text> :  {billing.address1}</Text>
                                <Text> :  {billing.address2}</Text>
                                <Text> :  {billing.country}</Text>
                                <Text> :  {billing.city}</Text>
                                <Text> :  {billing.state}</Text>
                                <Text> :  {billing.zip_code}</Text>
                            </View>
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
                                fontWeight: "700",
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
                            color: "gray",
                            paddingBottom: 9
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
                            justifyContent: "flex-end",
                            marginTop: 15,
                            // color: '#272B41'
                            color: '#3a3f59'
                        }}
                    >
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

export default Invoice;