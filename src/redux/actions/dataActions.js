import { CREATE_ORDER } from '../types';

export const makeOrderDetails = (orderDetails) => (dispatch) => {
  dispatch({
    type: CREATE_ORDER,
    payload: orderDetails
  });
};
