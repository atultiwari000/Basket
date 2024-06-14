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

import { update, fetch } from '../../stores/deliveries/deliveriesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditDeliveries = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    order: '',

    delivery_staff: '',

    pickup_status: '',

    delivery_status: '',

    special_instructions: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { deliveries } = useAppSelector((state) => state.deliveries);

  const { deliveriesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: deliveriesId }));
  }, [deliveriesId]);

  useEffect(() => {
    if (typeof deliveries === 'object') {
      setInitialValues(deliveries);
    }
  }, [deliveries]);

  useEffect(() => {
    if (typeof deliveries === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = deliveries[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [deliveries]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: deliveriesId, data }));
    await router.push('/deliveries/deliveries-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit deliveries')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit deliveries'}
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
              <FormField label='Order' labelFor='order'>
                <Field
                  name='order'
                  id='order'
                  component={SelectField}
                  options={initialValues.order}
                  itemRef={'orders'}
                  showField={'order_date'}
                ></Field>
              </FormField>

              <FormField label='DeliveryStaff' labelFor='delivery_staff'>
                <Field
                  name='delivery_staff'
                  id='delivery_staff'
                  component={SelectField}
                  options={initialValues.delivery_staff}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='PickupStatus' labelFor='pickup_status'>
                <Field name='PickupStatus' id='PickupStatus' component='select'>
                  <option value='pending'>pending</option>

                  <option value='picked_up'>picked_up</option>
                </Field>
              </FormField>

              <FormField label='DeliveryStatus' labelFor='delivery_status'>
                <Field
                  name='DeliveryStatus'
                  id='DeliveryStatus'
                  component='select'
                >
                  <option value='pending'>pending</option>

                  <option value='en_route'>en_route</option>

                  <option value='delivered'>delivered</option>
                </Field>
              </FormField>

              <FormField label='SpecialInstructions' hasTextareaHeight>
                <Field
                  name='special_instructions'
                  as='textarea'
                  placeholder='SpecialInstructions'
                />
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
                  onClick={() => router.push('/deliveries/deliveries-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditDeliveries.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_DELIVERIES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditDeliveries;
