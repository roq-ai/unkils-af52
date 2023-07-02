import * as yup from 'yup';

export const playerValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
  team_id: yup.string().nullable(),
});
