export const serverLogin = async (email, password) => {
  return fetch(
    'https://loft-taxi.glitch.me/auth',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(res => res.json());
};

export const serverRegistration = async (email, password, name, surname) => {
  return fetch(
    'https://loft-taxi.glitch.me/register',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        email,
        password,
        name,
        surname
      })
    })
    .then(res => res.json());
};

export const serverPaymentUpdate = async (cardName, cardNumber, expiryDate, cvc, token) => {
  return fetch(
    'https://loft-taxi.glitch.me/card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        cardName,
        cardNumber,
        expiryDate,
        cvc,
        token
      })
    }
  ).then(res => res.json());
};

export const serverPaymentData = async (token) => {
  return fetch(`https://loft-taxi.glitch.me/card?token=${token}`)
    .then(res => res.json());
};

export const serverAddressesData = async () => {
  return fetch('https://loft-taxi.glitch.me/addressList')
    .then(res => res.json())
    .then(data => data.addresses.map((item, index) => ({
      id: index,
      option: item
    })));
};

export const serverRouteData = async (address1, address2) => {
  return fetch('https://loft-taxi.glitch.me/route?' + new URLSearchParams({address1, address2}))
    .then(res => res.json());
}