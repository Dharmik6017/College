/* eslint-disable import/prefer-default-export */
export const transformErrorsFromApi = data => {
  if (data.data && data.data.fields) {
    return {...data.data.fields};
  }
  return {
    generic:
      'There was some error processing your request.Please contact administrator.',
  };
};
