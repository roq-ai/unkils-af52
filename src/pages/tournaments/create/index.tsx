import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createTournament } from 'apiSdk/tournaments';
import { Error } from 'components/error';
import { tournamentValidationSchema } from 'validationSchema/tournaments';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { TournamentInterface } from 'interfaces/tournament';

function TournamentCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TournamentInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTournament(values);
      resetForm();
      router.push('/tournaments');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TournamentInterface>({
    initialValues: {
      name: '',
      format: '',
      rules: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: tournamentValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Tournament
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="format" mb="4" isInvalid={!!formik.errors?.format}>
            <FormLabel>Format</FormLabel>
            <Input type="text" name="format" value={formik.values?.format} onChange={formik.handleChange} />
            {formik.errors.format && <FormErrorMessage>{formik.errors?.format}</FormErrorMessage>}
          </FormControl>
          <FormControl id="rules" mb="4" isInvalid={!!formik.errors?.rules}>
            <FormLabel>Rules</FormLabel>
            <Input type="text" name="rules" value={formik.values?.rules} onChange={formik.handleChange} />
            {formik.errors.rules && <FormErrorMessage>{formik.errors?.rules}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'tournament',
    operation: AccessOperationEnum.CREATE,
  }),
)(TournamentCreatePage);
