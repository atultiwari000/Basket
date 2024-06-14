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
} from '../../stores/supplier_profiles/supplier_profilesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditSupplier_profiles = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    supplier: '',

    company_name: '',

    contact_name: '',

    contact_email: '',

    contact_phone: '',

    address: '',

    certifications: '',

    rating: '',

    profile_description: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { supplier_profiles } = useAppSelector(
    (state) => state.supplier_profiles,
  );

  const { supplier_profilesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: supplier_profilesId }));
  }, [supplier_profilesId]);

  useEffect(() => {
    if (typeof supplier_profiles === 'object') {
      setInitialValues(supplier_profiles);
    }
  }, [supplier_profiles]);

  useEffect(() => {
    if (typeof supplier_profiles === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = supplier_profiles[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [supplier_profiles]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: supplier_profilesId, data }));
    await router.push('/supplier_profiles/supplier_profiles-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit supplier_profiles')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit supplier_profiles'}
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
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='CompanyName'>
                <Field name='company_name' placeholder='CompanyName' />
              </FormField>

              <FormField label='ContactName'>
                <Field name='contact_name' placeholder='ContactName' />
              </FormField>

              <FormField label='ContactEmail'>
                <Field name='contact_email' placeholder='ContactEmail' />
              </FormField>

              <FormField label='ContactPhone'>
                <Field name='contact_phone' placeholder='ContactPhone' />
              </FormField>

              <FormField label='Address' hasTextareaHeight>
                <Field name='address' as='textarea' placeholder='Address' />
              </FormField>

              <FormField label='Certifications' hasTextareaHeight>
                <Field
                  name='certifications'
                  as='textarea'
                  placeholder='Certifications'
                />
              </FormField>

              <FormField label='Rating'>
                <Field type='number' name='rating' placeholder='Rating' />
              </FormField>

              <FormField label='ProfileDescription' hasTextareaHeight>
                <Field
                  name='profile_description'
                  as='textarea'
                  placeholder='ProfileDescription'
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
                  onClick={() =>
                    router.push('/supplier_profiles/supplier_profiles-list')
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

EditSupplier_profiles.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_SUPPLIER_PROFILES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditSupplier_profiles;
