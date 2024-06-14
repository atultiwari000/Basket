import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/customer_profiles/customer_profilesSlice';
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

const Customer_profilesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { customer_profiles } = useAppSelector(
    (state) => state.customer_profiles,
  );

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
        <title>{getPageTitle('View customer_profiles')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View customer_profiles')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Customer</p>

            <p>{customer_profiles?.customer?.firstName ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{customer_profiles?.name}</p>
          </div>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={customer_profiles?.address}
            />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>PhoneNumber</p>
            <p>{customer_profiles?.phone_number}</p>
          </div>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={customer_profiles?.preferences}
            />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>SubscriptionStatus</p>
            <p>{customer_profiles?.subscription_status ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Feedback Customer</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Rating</th>

                      <th>Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer_profiles.feedback_customer &&
                      Array.isArray(customer_profiles.feedback_customer) &&
                      customer_profiles.feedback_customer.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/feedback/feedback-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='rating'>{item.rating}</td>

                          <td data-label='comments'>{item.comments}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!customer_profiles?.feedback_customer?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Orders Customer</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>OrderDate</th>

                      <th>DeliveryDate</th>

                      <th>Status</th>

                      <th>TotalAmount</th>

                      <th>PaymentStatus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer_profiles.orders_customer &&
                      Array.isArray(customer_profiles.orders_customer) &&
                      customer_profiles.orders_customer.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/orders/orders-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='order_date'>
                            {dataFormatter.dateTimeFormatter(item.order_date)}
                          </td>

                          <td data-label='delivery_date'>
                            {dataFormatter.dateTimeFormatter(
                              item.delivery_date,
                            )}
                          </td>

                          <td data-label='status'>{item.status}</td>

                          <td data-label='total_amount'>{item.total_amount}</td>

                          <td data-label='payment_status'>
                            {item.payment_status}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!customer_profiles?.orders_customer?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Payments Customer</p>
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
                    {customer_profiles.payments_customer &&
                      Array.isArray(customer_profiles.payments_customer) &&
                      customer_profiles.payments_customer.map((item: any) => (
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
              {!customer_profiles?.payments_customer?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Subscriptions Customer</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Frequency</th>

                      <th>StartDate</th>

                      <th>EndDate</th>

                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer_profiles.subscriptions_customer &&
                      Array.isArray(customer_profiles.subscriptions_customer) &&
                      customer_profiles.subscriptions_customer.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/subscriptions/subscriptions-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='frequency'>{item.frequency}</td>

                            <td data-label='start_date'>
                              {dataFormatter.dateTimeFormatter(item.start_date)}
                            </td>

                            <td data-label='end_date'>
                              {dataFormatter.dateTimeFormatter(item.end_date)}
                            </td>

                            <td data-label='status'>{item.status}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!customer_profiles?.subscriptions_customer?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() =>
              router.push('/customer_profiles/customer_profiles-list')
            }
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Customer_profilesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_CUSTOMER_PROFILES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Customer_profilesView;
