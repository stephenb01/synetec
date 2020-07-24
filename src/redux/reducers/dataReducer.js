import { CREATE_ORDER, } from '../types';

const initialState = {
  orders: [],
  pizzas: [
    { name: 'Veggie', toppings: '', base: 'thin' },
    { name: 'Mega', toppings: '', base: 'thin' },
    { name: 'Meat Feast', toppings: '', base: 'thin' }
  ],
  loading: false
};


export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_ORDER:
      return {
        ...state,
        orders: [
          action.payload,
          ...state.orders
        ]
      }
    default:
      return state;
  }
}
