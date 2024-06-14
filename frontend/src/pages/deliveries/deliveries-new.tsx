import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
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
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/deliveries/deliveriesSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  order: '',

  delivery_staff: '',

  pickup_status: 'pending',

  delivery_status: 'pending',

  special_instructions: '',
};

const DeliveriesNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/deliveries/deliveries-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Order' labelFor='order'>
                <Field
                  name='order'
                  id='order'
                  component={SelectField}
                  options={[]}
                  itemRef={'orders'}
                ></Field>
              </FormField>

              <FormField label='DeliveryStaff' labelFor='delivery_staff'>
                <Field
                  name='delivery_staff'
                  id='delivery_staff'
                  component={SelectField}
                  options={[]}
                  itemRef={'users'}
                ></Field>
              </FormField>

              <FormField label='PickupStatus' labelFor='pickup_status'>
                <Field
                  name='pickup_status'
                  id='pickup_status'
                  component='select'
                >
                  <option value='pending'>pending</option>

                  <option value='picked_up'>picked_up</option>
                </Field>
              </FormField>

              <FormField label='DeliveryStatus' labelFor='delivery_status'>
                <Field
                  name='delivery_status'
                  id='delivery_status'
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

DeliveriesNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_DELIVERIES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default DeliveriesNew;
