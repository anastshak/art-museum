import * as yup from 'yup';

export interface FormInput {
  search: string;
}

const englishLettersRegExp = /^[A-Za-z]+$/;

export function createValidationSchema() {
  return yup.object().shape({
    search: yup
      .string()
      .max(15)
      .min(3)
      .required('Search query is a required field')
      .matches(englishLettersRegExp, 'Only English letters are allowed'),
  });
}
