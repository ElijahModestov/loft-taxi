import { STORE_PAYMENT_DATA } from '../actions';

const initialState = {
  hasEligiblePayment: false,
  cardName: '',
  cardNumber: '',
  expiryDate: '',
  cvc: ''
};

export function profile (state = initialState, action) {
  switch (action.type) {
    case STORE_PAYMENT_DATA: {
      const { cardName, cardNumber, expiryDate, cvc } = action.payload;

      return {
        ...state,
        hasEligiblePayment: true,
        cardName,
        cardNumber,
        expiryDate,
        cvc
      }
    }
    default:
      return state
  }
}

export const getHasEligiblePayment = state => state.profile.hasEligiblePayment;
export const getCardName = state => state.profile.cardName;
export const getCardNumber = state => state.profile.cardNumber;
export const getExpiryDate = state => state.profile.expiryDate;
export const getCvc = state => state.profile.cvc;
