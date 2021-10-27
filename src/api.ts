interface ServerAuthResponse {
    success: boolean,
    token?: string,
    error?: string
}
interface ServerSetPaymentResponse {
    success: boolean,
    error?: string
}
interface ServerGetPaymentResponse {
    id?: string,
    cardName?: string,
    cardNumber?: string,
    expiryDate?: string
    cvc?: string,
    success?: boolean,
    error?: string
}
interface ServerAddressesResponse {
    addresses: string[]
}

export const serverLogin = async (
    email: string,
    password: string
): Promise<ServerAuthResponse> => {
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

export const serverRegistration = async (
    email: string,
    password: string,
    name: string,
    surname: string
): Promise<ServerAuthResponse> => {
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

export const serverPaymentUpdate = async (
    cardName: string,
    cardNumber: string,
    expiryDate: string,
    cvc: string,
    token: string
): Promise<ServerSetPaymentResponse> => {
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

export const serverPaymentData = async (token: string): Promise<ServerGetPaymentResponse> => {
  return fetch(`https://loft-taxi.glitch.me/card?token=${token}`)
    .then(res => res.json());
};

export const serverAddressesData = async (): Promise<ServerAddressesResponse>  => {
  return fetch('https://loft-taxi.glitch.me/addressList')
    .then(res => res.json())
    .then(data => data.addresses.map((item: string, index: number): object => ({
      id: index,
      option: item
    })));
};

export const serverRouteData = async (address1: string, address2: string): Promise<number[][]> => {
  return fetch('https://loft-taxi.glitch.me/route?' + new URLSearchParams({address1, address2}))
    .then(res => res.json());
}