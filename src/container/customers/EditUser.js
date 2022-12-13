import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Table, Switch, Checkbox, Typography, Tabs, Rate, Spin } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Link, useHistory, useLocation } from 'react-router-dom';
import apolloClient, { authMutation, authQuery, customerQuery } from '../../utility/apollo';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import Cookies from 'js-cookie';
import Moment from 'react-moment';
import { viewPermission } from '../../utility/utility';
import BillingAdderess from './BillingAdderess';
import ShippingAddress from './ShippingAddress';
import { Button } from '../../components/buttons/buttons';

const { Option } = Select;

const EditUser = () => {
  viewPermission('customer');
  const history = useHistory();
  const { search } = useLocation();
  const params = queryString.parse(search);
  const maxLength = 30;
  const [userStatus, setUserStatus] = useState(true);
  const [sendEmail, setSendEmail] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  // new
  const dummySingleUser = {
    id: 10009,
    first_name: 'test1',
    last_name: 'fn',
    email: 'testfn@gmail.com',
    email_verified: true,
    user_status: true,
    image: '10009.png',
    addresses: [
      {
        id: 10027,
        address1: 'address1',
        address2: 'address2',
        phone: '01850189531',
        fax: '4512054561',
        email: 'test@customer1.com',
        city: 'Tigard',
        state: 'Oregon',
        zip_code: '97223',
        country: 'United State',
        type: 'billing',
        status: true,
        updatedAt: '1667748751113',
        createdAt: '1667748751113',
        __typename: 'AddressOutput',
      },
      {
        id: 10028,
        address1: 'address1 for billing',
        address2: 'address2',
        phone: '01850189531',
        fax: '4512054561',
        email: 'test@customer1.com',
        city: 'Tigard',
        state: 'Oregon',
        zip_code: '97223',
        country: 'United State',
        type: 'billing',
        status: true,
        updatedAt: '1667762058309',
        createdAt: '1667762058309',
        __typename: 'AddressOutput',
      },
      {
        id: 10029,
        address1: 'address11',
        address2: 'address2',
        phone: '01850189531',
        fax: '4512054561',
        email: 'test@customer1.com',
        city: 'Tigard',
        state: 'Oregon',
        zip_code: '97223',
        country: 'United State',
        type: 'shipping',
        status: true,
        updatedAt: '1667762393452',
        createdAt: '1667762393452',
        __typename: 'AddressOutput',
      },
      {
        id: 10030,
        address1: 'a1',
        address2: 'a2',
        phone: '34536546546',
        fax: 'es54757856',
        email: 'tweetsydotio@gmail.com',
        city: 'city',
        state: 's1',
        zip_code: '65354',
        country: 'c1',
        type: 'billing',
        status: true,
        updatedAt: '1667805055743',
        createdAt: '1667805055743',
        __typename: 'AddressOutput',
      },
      {
        id: 10031,
        address1: 'address1, default b',
        address2: 'address2, default b',
        phone: '436453654',
        fax: '54643656',
        email: 'testfn@gmail.com',
        city: 'dsfsd',
        state: 'dfadaf',
        zip_code: '586446',
        country: 'United State',
        type: 'billing',
        status: true,
        updatedAt: '1667828238297',
        createdAt: '1667828238297',
        __typename: 'AddressOutput',
      },
      {
        id: 10032,
        address1: 't',
        address2: 'erf',
        phone: '42453543543543654',
        fax: '57578',
        email: 'rdrashal@gmail.com',
        city: 'fdsf',
        state: 'sdf',
        zip_code: '6786',
        country: 'fsdf',
        type: 'billing',
        status: true,
        updatedAt: '1667828381021',
        createdAt: '1667828381021',
        __typename: 'AddressOutput',
      },
      {
        id: 10033,
        address1: 'new add1',
        address2: 'add2',
        phone: '15154654654',
        fax: '5785785',
        email: 'foysalbinnour@gmail.com',
        city: 'city',
        state: 's',
        zip_code: '89698678',
        country: 'c',
        type: 'billing',
        status: true,
        updatedAt: '1667829536756',
        createdAt: '1667829536756',
        __typename: 'AddressOutput',
      },
      {
        id: 10034,
        address1: 'new add1',
        address2: 'add2',
        phone: '15154654654',
        fax: '5785785',
        email: 'foysalbinnour@gmail.com',
        city: 'city',
        state: 's',
        zip_code: '89698678',
        country: 'c',
        type: 'billing',
        status: true,
        updatedAt: '1667829954142',
        createdAt: '1667829954142',
        __typename: 'AddressOutput',
      },
      {
        id: 10035,
        address1: 'new add1',
        address2: 'add2',
        phone: '15154654654',
        fax: '5785785',
        email: 'foysalbinnour@gmail.com',
        city: 'city',
        state: 's',
        zip_code: '89698678',
        country: 'United State',
        type: 'billing',
        status: true,
        updatedAt: '1669230883505',
        createdAt: '1667830155994',
        __typename: 'AddressOutput',
      },
      {
        id: 10036,
        address1: 'test2 add1',
        address2: 'add2',
        phone: '54654646548',
        fax: '56353',
        email: 'rdrashal@gmail.com',
        city: 'sdf',
        state: 'sdfsd',
        zip_code: '578467846',
        country: 'fsf',
        type: 'billing',
        status: true,
        updatedAt: '1667830241850',
        createdAt: '1667830241850',
        __typename: 'AddressOutput',
      },
      {
        id: 10038,
        address1: 'acc add1',
        address2: 'acc add2',
        phone: '545454',
        fax: 'sdf',
        email: 'testfn@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '1207',
        country: 'contry',
        type: 'shipping',
        status: true,
        updatedAt: '1668497822553',
        createdAt: '1668497822553',
        __typename: 'AddressOutput',
      },
      {
        id: 10039,
        address1: 'add11',
        address2: 'add22',
        phone: '452445654',
        fax: 'sffas44',
        email: 'testfn@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '10025',
        country: 'country',
        type: 'shipping',
        status: true,
        updatedAt: '1668498345751',
        createdAt: '1668498345751',
        __typename: 'AddressOutput',
      },
      {
        id: 10040,
        address1: 'afdafdsf-------',
        address2: 'dsfd',
        phone: '454',
        fax: 'fdsafdas',
        email: 'rdrashal@gmail.com',
        city: 'fdsf',
        state: 'fas',
        zip_code: '5876',
        country: 'dsfa',
        type: 'shipping',
        status: true,
        updatedAt: '1668498773184',
        createdAt: '1668498773184',
        __typename: 'AddressOutput',
      },
      {
        id: 10041,
        address1: 'Address 1 SS',
        address2: 'Address 2 SS',
        phone: '017000055555',
        fax: 'Fax SS',
        email: 'fylazusosi@mailinator.com',
        city: 'City SS',
        state: 'State SS',
        zip_code: '1200',
        country: 'Bangladesh',
        type: 'billing',
        status: true,
        updatedAt: '1668923889612',
        createdAt: '1668923889612',
        __typename: 'AddressOutput',
      },
      {
        id: 10042,
        address1: 'Address 1 SS',
        address2: 'Address 2 SS',
        phone: '017000055555',
        fax: 'Fax SS',
        email: 'sumonskys@gmail.com',
        city: 'City SS',
        state: 'State SS',
        zip_code: '252627',
        country: 'Bangladesh',
        type: 'shipping',
        status: true,
        updatedAt: '1668925177587',
        createdAt: '1668925177587',
        __typename: 'AddressOutput',
      },
      {
        id: 10043,
        address1: 'test newadd1',
        address2: 'test newadd2',
        phone: '5465464',
        fax: '456546544',
        email: 'rdrashal@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '101010',
        country: 'United State',
        type: 'billing',
        status: true,
        updatedAt: '1669006166921',
        createdAt: '1669006166921',
        __typename: 'AddressOutput',
      },
      {
        id: 10044,
        address1: 'test2 newadd1',
        address2: 'test2 newadd2',
        phone: '213512361',
        fax: 'dfasfdf',
        email: 'rdrashal@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '213313123',
        country: 'United State',
        type: 'billing',
        status: true,
        updatedAt: '1669006662036',
        createdAt: '1669006662036',
        __typename: 'AddressOutput',
      },
      {
        id: 10045,
        address1: 'test2 newadd1',
        address2: 'test2 newadd2',
        phone: '213512361',
        fax: 'dfasfdf',
        email: 'rdrashal@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '213313123',
        country: 'United State',
        type: 'billing',
        status: true,
        updatedAt: '1669006682201',
        createdAt: '1669006682201',
        __typename: 'AddressOutput',
      },
      {
        id: 10046,
        address1: 'aaaa',
        address2: 'bbbbb',
        phone: '456546',
        fax: '453654',
        email: 'tweetsydotio@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '4544',
        country: 'United State',
        type: 'billing',
        status: true,
        updatedAt: '1669006850669',
        createdAt: '1669006850669',
        __typename: 'AddressOutput',
      },
      {
        id: 10047,
        address1: 'sdfsadfs',
        address2: 'add2',
        phone: '575757',
        fax: '5757',
        email: 'tweetsydotio@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '87575',
        country: 'United State',
        type: 'billing',
        status: true,
        updatedAt: '1669007001918',
        createdAt: '1669007001918',
        __typename: 'AddressOutput',
      },
      {
        id: 10048,
        address1: 'aaasdsada',
        address2: 'sadasdasdas',
        phone: '35413543543',
        fax: '544545',
        email: '111rdrashal@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '555',
        country: 'United State',
        type: 'billing',
        status: true,
        updatedAt: '1669009806174',
        createdAt: '1669009806174',
        __typename: 'AddressOutput',
      },
      {
        id: 10049,
        address1: 'a',
        address2: 'add2',
        phone: '01010101010101',
        fax: '454',
        email: '2rdrashal@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '5455',
        country: 'United State',
        type: 'billing',
        status: true,
        updatedAt: '1669009934943',
        createdAt: '1669009934943',
        __typename: 'AddressOutput',
      },
      {
        id: 10050,
        address1: 'ta1',
        address2: 'ta2',
        phone: '5634486546',
        fax: 'fyzup@mailinator.com',
        email: 'tweetsydotio@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '1209',
        country: 'United State',
        type: 'billing',
        status: true,
        updatedAt: '1669026072280',
        createdAt: '1669026072280',
        __typename: 'AddressOutput',
      },
      {
        id: 10051,
        address1: '0101',
        address2: 'add2',
        phone: '01010101010102',
        fax: '5666',
        email: 'tweetsydotio@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '1209',
        country: 'United State',
        type: 'billing',
        status: true,
        updatedAt: '1669026509280',
        createdAt: '1669026509280',
        __typename: 'AddressOutput',
      },
      {
        id: 10052,
        address1: '0',
        address2: '0',
        phone: 'jyxigygoq@mailinator.com',
        fax: '5555',
        email: 'vavuvahe@mailinator.com',
        city: 'city',
        state: 'state',
        zip_code: '74481',
        country: 'United State',
        type: 'billing',
        status: true,
        updatedAt: '1669026633215',
        createdAt: '1669026633215',
        __typename: 'AddressOutput',
      },
      {
        id: 10054,
        address1: 'aaaa',
        address2: 'aaaa',
        phone: '1235123',
        fax: '1231231',
        email: 'tweetsydotio@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '3123',
        country: 'United State',
        type: 'billing',
        status: true,
        updatedAt: '1669029056058',
        createdAt: '1669029056058',
        __typename: 'AddressOutput',
      },
      {
        id: 10055,
        address1: 'a1111',
        address2: 'a2222',
        phone: '25444',
        fax: '454',
        email: 'tweetsydotio@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '5433',
        country: 'United State',
        type: 'billing',
        status: true,
        updatedAt: '1669029244880',
        createdAt: '1669029244880',
        __typename: 'AddressOutput',
      },
      {
        id: 10056,
        address1: 'aa',
        address2: 'aa',
        phone: '563',
        fax: '454',
        email: 'tweetsydotio@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '6556',
        country: 'United State',
        type: 'shipping',
        status: true,
        updatedAt: '1669029334805',
        createdAt: '1669029334805',
        __typename: 'AddressOutput',
      },
      {
        id: 10057,
        address1: '1111111122121',
        address2: 'add2',
        phone: '11111',
        fax: '454',
        email: 'tweetsydotio@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '1111',
        country: 'United State',
        type: 'shipping',
        status: true,
        updatedAt: '1669056309819',
        createdAt: '1669056309819',
        __typename: 'AddressOutput',
      },
      {
        id: 10058,
        address1: '111-',
        address2: '221',
        phone: '54544545',
        fax: '44',
        email: 'nudeq@mailinator.com',
        city: 'city',
        state: 'state',
        zip_code: '48331',
        country: 'United State',
        type: 'shipping',
        status: true,
        updatedAt: '1669056685952',
        createdAt: '1669056685952',
        __typename: 'AddressOutput',
      },
      {
        id: 10059,
        address1: '1',
        address2: '1',
        phone: '1232132323',
        fax: '4325436',
        email: 'tweetsydotio@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '1207',
        country: 'United State',
        type: 'shipping',
        status: true,
        updatedAt: '1669056842131',
        createdAt: '1669056842131',
        __typename: 'AddressOutput',
      },
      {
        id: 10060,
        address1: '1',
        address2: '1',
        phone: '1',
        fax: '1111',
        email: 'tweetsydotio@gmail.com',
        city: '1',
        state: '1',
        zip_code: '1111',
        country: 'United State',
        type: 'shipping',
        status: true,
        updatedAt: '1669056951371',
        createdAt: '1669056951371',
        __typename: 'AddressOutput',
      },
      {
        id: 10061,
        address1: '2',
        address2: '2',
        phone: '2',
        fax: '222222',
        email: 'rdrashal@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '222222',
        country: 'United State',
        type: 'shipping',
        status: true,
        updatedAt: '1669057168816',
        createdAt: '1669057168816',
        __typename: 'AddressOutput',
      },
      {
        id: 10062,
        address1: '3',
        address2: '3',
        phone: '33333',
        fax: '3333',
        email: 'tweetsydotio@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '33333',
        country: 'United State',
        type: 'billing',
        status: true,
        updatedAt: '1669057421940',
        createdAt: '1669057421940',
        __typename: 'AddressOutput',
      },
      {
        id: 10063,
        address1: 'a1',
        address2: 'a2',
        phone: '212121212',
        fax: '2121212',
        email: 'testfn@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '2121212',
        country: 'United State',
        type: 'shipping',
        status: true,
        updatedAt: '1669057972809',
        createdAt: '1669057972809',
        __typename: 'AddressOutput',
      },
      {
        id: 10064,
        address1: 'fijaku@mailinator.com',
        address2: 'mowosyg@mailinator.com',
        phone: 'lytukose@mailinator.com',
        fax: 'lucid@mailinator.com',
        email: 'xirosegud@mailinator.com',
        city: 'bemepezigu@mailinator.com',
        state: 'xoquha@mailinator.com',
        zip_code: '78970',
        country: 'United State',
        type: 'shipping',
        status: true,
        updatedAt: '1669058049196',
        createdAt: '1669058049196',
        __typename: 'AddressOutput',
      },
      {
        id: 10065,
        address1: '0mokeda@mailinator.com',
        address2: 'dynin@mailinator.com',
        phone: 'nycijos@mailinator.com',
        fax: 'kavyluqece@mailinator.com',
        email: 'qihyfifi@mailinator.com',
        city: 'hunyqisame@mailinator.com',
        state: 'lyqiwuhony@mailinator.com',
        zip_code: '89622',
        country: 'United State',
        type: 'shipping',
        status: true,
        updatedAt: '1669058237253',
        createdAt: '1669058237253',
        __typename: 'AddressOutput',
      },
      {
        id: 10067,
        address1: '111111111111111',
        address2: '2121212',
        phone: '1212',
        fax: '21212',
        email: 'rdrashal@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '121212',
        country: 'United State',
        type: 'shipping',
        status: true,
        updatedAt: '1669090163580',
        createdAt: '1669090163580',
        __typename: 'AddressOutput',
      },
      {
        id: 10068,
        address1: 'q1',
        address2: 'q1',
        phone: '11111',
        fax: '454',
        email: 'tweetsydotio@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '1111',
        country: 'United State',
        type: 'shipping',
        status: true,
        updatedAt: '1669090350554',
        createdAt: '1669090350554',
        __typename: 'AddressOutput',
      },
      {
        id: 10070,
        address1: 'q2',
        address2: 'q2',
        phone: '2222',
        fax: '454',
        email: 'tweetsydotio@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '2222',
        country: 'United State',
        type: 'shipping',
        status: true,
        updatedAt: '1669091633430',
        createdAt: '1669091633430',
        __typename: 'AddressOutput',
      },
      {
        id: 10071,
        address1: 'q3',
        address2: 'q3',
        phone: '33333',
        fax: '33333',
        email: 'rdrashal@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '3333',
        country: 'United State',
        type: 'shipping',
        status: true,
        updatedAt: '1669091964949',
        createdAt: '1669091964949',
        __typename: 'AddressOutput',
      },
      {
        id: 10072,
        address1: 'w4',
        address2: 'w4',
        phone: '44444',
        fax: '4444',
        email: 'rdrashal@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '4444',
        country: 'United State',
        type: 'billing',
        status: true,
        updatedAt: '1669092010555',
        createdAt: '1669092010555',
        __typename: 'AddressOutput',
      },
      {
        id: 10069,
        address1: 'add1-1',
        address2: 'add1-2',
        phone: '423414123421332',
        fax: '12123',
        email: 'qisutano@mailinator.com',
        city: 'city',
        state: 'state',
        zip_code: '1207',
        country: 'United State',
        type: 'shipping',
        status: true,
        updatedAt: '1669227942013',
        createdAt: '1669090665558',
        __typename: 'AddressOutput',
      },
      {
        id: 10053,
        address1: 't11',
        address2: 't1112',
        phone: '555555',
        fax: '555522',
        email: 'tweetsydotio@gmail.com',
        city: 'city',
        state: 'state',
        zip_code: '1209',
        country: 'United State',
        type: 'billing',
        status: true,
        updatedAt: '1669228158049',
        createdAt: '1669028881454',
        __typename: 'AddressOutput',
      },
      {
        id: 10066,
        address1: 'tece@mailinator.com',
        address2: 'hewovedu@mailinator.com',
        phone: 'mefa@mailinator.com',
        fax: '2222222',
        email: 'zysi@mailinator.com',
        city: 'qucanad@mailinator.com',
        state: 'xezu@mailinator.com',
        zip_code: '32049',
        country: 'United State',
        type: 'shipping',
        status: true,
        updatedAt: '1669228169154',
        createdAt: '1669058293439',
        __typename: 'AddressOutput',
      },
      {
        id: 10037,
        address1: 'test Shipping',
        address2: 'add2',
        phone: '5+956+95+',
        fax: '/97/9',
        email: '1tweetsydotio@gmail.com',
        city: 'dsf',
        state: 'fdsf',
        zip_code: '1207',
        country: 'United State',
        type: 'shipping',
        status: true,
        updatedAt: '1669231649860',
        createdAt: '1667830319024',
        __typename: 'AddressOutput',
      },
    ],
    __typename: 'Customer',
  };
  const [singleUser, setSingleUser] = useState({ data: dummySingleUser, isLoading: false });
  // const [singleUser, setSingleUser] = useState({ data: {}, isLoading: true })
  const initialData = {
    id: new Date().getTime(),
    address1: '',
    address2: '',
    country: '',
    city: '',
    state: '',
    zip_code: '',
    // email: "",
    fax: '',
    // phone: "",
  };
  const [shippingAddress, setShippingAddress] = useState([initialData]);
  const [billingAddress, setBillingAddress] = useState([initialData]);

  useEffect(() => {
    // load single customer
    if (!params.id) return;

    const shipping = [];
    const billing = [];
    singleUser.data.addresses.forEach(address => {
      if (address.type === 'shipping') shipping.push(address);
      if (address.type === 'billing') billing.push(address);
    });
    setShippingAddress(shipping);
    setBillingAddress(billing);

    return;
    apolloClient
      .query({
        query: customerQuery.GET_SINGLE_CUSTOMER,
        variables: { customer_id: parseInt(params.id) },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.getSingleCustomer;
        console.log(data);
        setSingleUser({ data: data.data, isLoading: false });
      })
      .catch(err => {
        console.log('🚀 ~ file: AddAdmin.js ~ line 46 ~ useEffect ~ err', err);
      })
      .finally(() => {});
  }, []);

  const handleSubmit = values => {};

  const address_columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 250,
      ellipsis: true,
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Zip Code',
      dataIndex: 'zip',
      key: 'zip',
      width: 120,
      ellipsis: true,
    },
  ];

  const order_columns = [
    {
      title: 'Order ID',
      dataIndex: 'uuid',
      key: 'uuid',
      width: 100,
      ellipsis: true,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 250,
      ellipsis: true,
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Payable Amount',
      dataIndex: 'pay',
      key: 'pay',
      width: 120,
      ellipsis: true,
    },
  ];

  const rating_columns = [
    {
      title: 'Product ID',
      dataIndex: 'product_uuid',
      key: 'product_uuid',
      width: 120,
      ellipsis: true,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 250,
      ellipsis: true,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: 150,
      render: (text, record) => <Rate allowHalf defaultValue={2.5} />,
      ellipsis: true,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (text, record) => (
        <span className={'status-text'}>{<Moment format="DD MMMM YYYY">{parseInt(text)}</Moment>}</span>
      ),
      ellipsis: true,
    },
  ];

  const message_columns = [
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      width: 250,
      ellipsis: true,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      ellipsis: true,
    },
  ];

  const rating_data = [
    {
      product_uuid: 'fjagfa-6534fwffljfdgafshdg-sjfhs',
      title: 'This is title',
      description: 'this is Description',
      rating: 4.5,
      createdAt: '2022-09-09 17:59:46.735+06',
    },
  ];

  return (
    <>
      <PageHeader title={`Manage User | Edit user ${singleUser.isLoading ? '' : `(${singleUser.data.email})`}`} />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {params.id && singleUser.isLoading ? (
                <div div className="spin">
                  <Spin />
                </div>
              ) : (
                <Form
                  style={{ width: '100%' }}
                  form={form}
                  name="addProduct"
                  onFinish={handleSubmit}
                  onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                  labelCol={{ span: 4 }}
                  initialValues={{
                    first_name: singleUser?.data?.first_name,
                    last_name: singleUser?.data?.last_name,
                    email: singleUser?.data?.email,
                  }}
                >
                  <Tabs>
                    <Tabs.TabPane tab="Information" key="information">
                      <Form.Item
                        rules={[{ required: true, max: maxLength, message: 'Please enter First Name' }]}
                        name="first_name"
                        label="First Name"
                      >
                        <Input placeholder="Enter First Name" />
                      </Form.Item>
                      <Form.Item
                        rules={[{ required: true, message: 'Please enter Last Name' }]}
                        name="last_name"
                        label="Last Name"
                      >
                        <Input placeholder="Enter Last Name" />
                      </Form.Item>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: 'Please enter an email',
                            max: maxLength,
                            // type: 'email'
                          },
                        ]}
                        name="email"
                        label="Email"
                        initialValue={params.email}
                      >
                        <Input type="email" disabled />
                      </Form.Item>

                      <Form.Item name="userStatus" label="User Status">
                        <Switch checked={userStatus} onChange={checked => setUserStatus(checked)} />
                      </Form.Item>

                      <Form.Item label="Send Email">
                        <Checkbox value={sendEmail} onChange={e => setSendEmail(e.target.checked)}></Checkbox>
                      </Form.Item>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Shipping Address" key="shipping_address">
                      <ShippingAddress {...{ initialData, shippingAddress, setShippingAddress }} />
                      {/* <Table
                                        className="table-responsive"
                                        columns={address_columns}
                                        rowKey={'uid'}
                                        size="small"
                                        dataSource={[]}
                                        rowClassName={(record, index) => (index % 2 == 0 ? "" : "altTableClass")}
                                        pagination={false}
                                    /> */}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Billing Address" key="billing_address">
                      <BillingAdderess {...{ initialData, billingAddress, setBillingAddress }} />

                      {/* <Table
                                        className="table-responsive"
                                        columns={address_columns}
                                        rowKey={'uid'}
                                        size="small"
                                        dataSource={[]}
                                        rowClassName={(record, index) => (index % 2 == 0 ? "" : "altTableClass")}
                                        pagination={false}
                                    /> */}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Order" key="order">
                      <Table
                        className="table-responsive"
                        columns={order_columns}
                        rowKey={'uid'}
                        size="small"
                        dataSource={[]}
                        rowClassName={(record, index) => (index % 2 == 0 ? '' : 'altTableClass')}
                        pagination={false}
                      />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Rating" key="rating">
                      <Table
                        className="table-responsive"
                        columns={rating_columns}
                        rowKey={'date'}
                        size="small"
                        dataSource={rating_data}
                        rowClassName={(record, index) => (index % 2 == 0 ? '' : 'altTableClass')}
                        pagination={false}
                      />
                    </Tabs.TabPane>
                  </Tabs>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: '3em',
                    }}
                  >
                    <Form.Item>
                      <Button loading={isLoading} size="default" htmlType="submit" type="primary" raised>
                        {isLoading ? 'Processing' : 'Save'}
                      </Button>
                      <Link to="/admin/customers/list">
                        <Button style={{ marginLeft: 10 }} type="light" size="default">
                          Cancel
                        </Button>
                      </Link>
                    </Form.Item>
                  </div>
                </Form>
              )}
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default EditUser;
