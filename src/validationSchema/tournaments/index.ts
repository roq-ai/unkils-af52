import * as yup from 'yup';

export const tournamentValidationSchema = yup.object().shape({
  name: yup.string().required(),
  format: yup.string().required(),
  rules: yup.string().required(),
  organization_id: yup.string().nullable(),
});
