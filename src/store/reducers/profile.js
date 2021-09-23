import { STORE_PAYMENT_DATA, STORE_PAYMENT_ERROR } from '../actions/profile';

const initialState = {
  hasEligiblePayment: false,
  cardName: '',
  cardNumber: '',
  expiryDate: '',
  cvc: '',
  error: ''
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
    case STORE_PAYMENT_ERROR: {
      const { error } = action.payload;

      return {
        ...initialState,
        error
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
export const getProfileError = state => state.profile.error;
