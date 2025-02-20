class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "833151b4-3f94-4865-a6a7-7fdb64fe3173",
      },
    }).then((res) => res.json());
  }

  // other methods for working with the API
}

export default Api;
