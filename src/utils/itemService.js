

const BASE_URL = '/api/items/';

function input(item) {
  console.log(BASE_URL + 'lendorborrow');
  console.log(JSON.stringify(item));

  return fetch(BASE_URL + 'lendorborrow', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(item)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    console.log(res);
    throw new Error("SOMETHING");
  });
  // Parameter destructuring!
  // The above could have been written as
  //.then((token) => token.token);
}


export default {
  input
  
};