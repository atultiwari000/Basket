import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditProducts = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    supplier: '',

    name: '',

    description: '',

    category: '',

    price: '',

    stock_quantity: '',

    unit: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { products } = useAppSelector((state) => state.products);

  const { productsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: productsId }));
  }, [productsId]);

  useEffect(() => {
    if (typeof products === 'object') {
      setInitialValues(products);
    }
  }, [products]);

  useEffect(() => {
    if (typeof products === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = products[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [products]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: productsId, data }));
    await router.push('/products/products-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit products')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit products'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Supplier' labelFor='supplier'>
                <Field
                  name='supplier'
                  id='supplier'
                  component={SelectField}
                  options={initialValues.supplier}
                  itemRef={'supplier_profiles'}
                  showField={'company_name'}
                ></Field>
              </FormField>

              <FormField label='Name'>
                <Field name='name' placeholder='Name' />
              </FormField>

              <FormField label='Description' hasTextareaHeight>
                <Field
                  name='description'
                  as='textarea'
                  placeholder='Description'
                />
              </FormField>

              <FormField label='Category'>
                <Field name='category' placeholder='Category' />
              </FormField>

              <FormField label='Price'>
                <Field type='number' name='price' placeholder='Price' />
              </FormField>

              <FormField label='StockQuantity'>
                <Field
                  type='number'
                  name='stock_quantity'
                  placeholder='StockQuantity'
                />
              </FormField>

              <FormField label='Unit'>
                <Field name='unit' placeholder='Unit' />
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/products/products-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditProducts.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_PRODUCTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditProducts;