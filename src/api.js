export const serverLogin = async (email, password) => {
  return fetch(
    `https://loft-taxi.glitch.me/auth?username=${email}&password=${password}`)
    .then(res => res.json())
    .then(data => data.success);
};

export const serverRegistration = async (email, password, name) => {
  return fetch(
    `https://loft-taxi.glitch.me/registration?username=${email}&password=${password}&name=${name}&surname=`)
    .then(res => res.json())
    .then(data => data.success);
};