import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/orders/ordersSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const OrdersView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.orders);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View orders')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View orders')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Customer</p>

            <p>{orders?.customer?.name ?? 'No data'}</p>
          </div>

          <FormField label='OrderDate'>
            {orders.order_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  orders.order_date
                    ? new Date(
                        dayjs(orders.order_date).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No OrderDate</p>
            )}
          </FormField>

          <FormField label='DeliveryDate'>
            {orders.delivery_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  orders.delivery_date
                    ? new Date(
                        dayjs(orders.delivery_date).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No DeliveryDate</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Status</p>
            <p>{orders?.status ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>TotalAmount</p>
            <p>{orders?.total_amount || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>PaymentStatus</p>
            <p>{orders?.payment_status ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Deliveries Order</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>PickupStatus</th>

                      <th>DeliveryStatus</th>

                      <th>SpecialInstructions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.deliveries_order &&
                      Array.isArray(orders.deliveries_order) &&
                      orders.deliveries_order.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/deliveries/deliveries-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='pickup_status'>
                            {item.pickup_status}
                          </td>

                          <td data-label='delivery_status'>
                            {item.delivery_status}
                          </td>

                          <td data-label='special_instructions'>
                            {item.special_instructions}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!orders?.deliveries_order?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Order_items Order</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Quantity</th>

                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.order_items_order &&
                      Array.isArray(orders.order_items_order) &&
                      orders.order_items_order.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/order_items/order_items-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='quantity'>{item.quantity}</td>

                          <td data-label='price'>{item.price}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!orders?.order_items_order?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Payments Order</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Amount</th>

                      <th>PaymentDate</th>

                      <th>PaymentMethod</th>

                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.payments_order &&
                      Array.isArray(orders.payments_order) &&
                      orders.payments_order.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/payments/payments-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='amount'>{item.amount}</td>

                          <td data-label='payment_date'>
                            {dataFormatter.dateTimeFormatter(item.payment_date)}
                          </td>

                          <td data-label='payment_method'>
                            {item.payment_method}
                          </td>

                          <td data-label='status'>{item.status}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!orders?.payments_order?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/orders/orders-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

OrdersView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_ORDERS'}>{page}</LayoutAuthenticated>
  );
};

export default OrdersView;
