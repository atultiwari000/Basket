import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/supplier_profiles/supplier_profilesSlice';
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

const Supplier_profilesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { supplier_profiles } = useAppSelector(
    (state) => state.supplier_profiles,
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
        <title>{getPageTitle('View supplier_profiles')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View supplier_profiles')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Supplier</p>

            <p>{supplier_profiles?.supplier?.firstName ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>CompanyName</p>
            <p>{supplier_profiles?.company_name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>ContactName</p>
            <p>{supplier_profiles?.contact_name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>ContactEmail</p>
            <p>{supplier_profiles?.contact_email}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>ContactPhone</p>
            <p>{supplier_profiles?.contact_phone}</p>
          </div>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={supplier_profiles?.address}
            />
          </FormField>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={supplier_profiles?.certifications}
            />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Rating</p>
            <p>{supplier_profiles?.rating || 'No data'}</p>
          </div>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={supplier_profiles?.profile_description}
            />
          </FormField>

          <>
            <p className={'block font-bold mb-2'}>Products Supplier</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>

                      <th>Description</th>

                      <th>Category</th>

                      <th>Price</th>

                      <th>StockQuantity</th>

                      <th>Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplier_profiles.products_supplier &&
                      Array.isArray(supplier_profiles.products_supplier) &&
                      supplier_profiles.products_supplier.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/products/products-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='description'>{item.description}</td>

                          <td data-label='category'>{item.category}</td>

                          <td data-label='price'>{item.price}</td>

                          <td data-label='stock_quantity'>
                            {item.stock_quantity}
                          </td>

                          <td data-label='unit'>{item.unit}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!supplier_profiles?.products_supplier?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() =>
              router.push('/supplier_profiles/supplier_profiles-list')
            }
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Supplier_profilesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_SUPPLIER_PROFILES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Supplier_profilesView;
