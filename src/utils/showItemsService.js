

const BASE_URL = '/api/items/';

function returned(item) {
  console.log(BASE_URL + 'returned');
  console.log(JSON.stringify(item));

  return fetch(BASE_URL + 'returned', {
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

// function getItemList() {
//   return axios.get('/api/items/returnUserItems',{token:sessionStorage.getItem("token")})
//         .then(result => {
//           return result.json
//       //       <ShowItemsForm {...this.props} 
//       //     name={item.name}
//       //     person={item.person}
//       //     color={item.color}
//       //     size={item.size}
//       //     brand={item.brand}
//       //     timeFrame={item.timeFrame}
//       //     updateMessage={this.updateMessage} 
//       // />
//           }) 
//         })
//         .catch(err => console.log(err));
//       }

function getItemList() {
  return fetch('/api/items/returnUserItems', {
    method: 'GET',
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem("token")
    })
  }).then(res => {
    console.log(res);
    return res.json()
  }).catch(err => console.log(err));
}

export default {
  returned,
  getItemList
};