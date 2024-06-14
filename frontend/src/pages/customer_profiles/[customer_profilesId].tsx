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

import {
  update,
  fetch,
} from '../../stores/customer_profiles/customer_profilesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditCustomer_profiles = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    customer: '',

    name: '',

    address: '',

    phone_number: '',

    preferences: '',

    subscription_status: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { customer_profiles } = useAppSelector(
    (state) => state.customer_profiles,
  );

  const { customer_profilesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: customer_profilesId }));
  }, [customer_profilesId]);

  useEffect(() => {
    if (typeof customer_profiles === 'object') {
      setInitialValues(customer_profiles);
    }
  }, [customer_profiles]);

  useEffect(() => {
    if (typeof customer_profiles === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = customer_profiles[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [customer_profiles]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: customer_profilesId, data }));
    await router.push('/customer_profiles/customer_profiles-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit customer_profiles')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit customer_profiles'}
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
              <FormField label='Customer' labelFor='customer'>
                <Field
                  name='customer'
                  id='customer'
                  component={SelectField}
                  options={initialValues.customer}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='Name'>
                <Field name='name' placeholder='Name' />
              </FormField>

              <FormField label='Address' hasTextareaHeight>
                <Field name='address' as='textarea' placeholder='Address' />
              </FormField>

              <FormField label='PhoneNumber'>
                <Field name='phone_number' placeholder='PhoneNumber' />
              </FormField>

              <FormField label='Preferences' hasTextareaHeight>
                <Field
                  name='preferences'
                  as='textarea'
                  placeholder='Preferences'
                />
              </FormField>

              <FormField
                label='SubscriptionStatus'
                labelFor='subscription_status'
              >
                <Field
                  name='SubscriptionStatus'
                  id='SubscriptionStatus'
                  component='select'
                >
                  <option value='active'>active</option>

                  <option value='paused'>paused</option>

                  <option value='canceled'>canceled</option>
                </Field>
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
                  onClick={() =>
                    router.push('/customer_profiles/customer_profiles-list')
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditCustomer_profiles.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_CUSTOMER_PROFILES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditCustomer_profiles;
