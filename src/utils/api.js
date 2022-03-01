import { URL } from "./constants";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
};

const headersWithAuthorize = {
  authorization: `Bearer ${localStorage.getItem("token")}`,
};
const headersWithContentType = { "Content-Type": "application/json" };
const headers = {
  "Content-Type": "application/json",
  authorization: `Bearer ${localStorage.getItem("token")}`,
};

export const registerUser = (fio, phone, password) => {
  return fetch(`${URL}/signup/`, {
    method: "POST",
    body: JSON.stringify({ fio, phone, password }),
    headers: headersWithContentType,
  }).then(checkResponse);
};

export const confirmPhone = (phone, code) => {
  return fetch(`${URL}/signup/confirm/`, {
    method: "POST",
    body: JSON.stringify({ phone, code }),
    headers: headersWithContentType,
  }).then(checkResponse);
};

export const reactivatePhone = (phone) => {
  return fetch(`${URL}/signup/reactivate/`, {
    method: "POST",
    body: JSON.stringify({ phone }),
    headers: headersWithContentType,
  }).then(checkResponse);
};

export const loginUser = (phone, password) => {
  return fetch(`${URL}/token/`, {
    method: "POST",
    headers: headersWithContentType,
    body: JSON.stringify({ phone, password }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.access) {
        localStorage.setItem("token", data.access);
        localStorage.setItem("refresh", data.refresh);
        return data;
      } else {
        return data;
      }
    });
};

export const refreshToken = () => {
  return fetch(`${URL}/token/refresh/`, {
    method: "POST",
    body: JSON.stringify({ refresh: localStorage.getItem("refresh") }),
    headers: headers,
  }).then(checkResponse);
};

export const resetPassword = (phone) => {
  return fetch(`${URL}/user/password/reset/`, {
    method: "POST",
    body: JSON.stringify({ phone }),
    headers: headersWithContentType,
  })
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const confirmResetPassword = (phone, code) => {
  return fetch(`${URL}/user/password/confirm_code/`, {
    method: "POST",
    body: JSON.stringify({ phone, code }),
    headers: headersWithContentType,
  })
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const changePassword = (phone, code, password) => {
  return fetch(`${URL}/user/password/change/`, {
    method: "POST",
    body: JSON.stringify({ phone, code, password }),
    headers: headersWithContentType,
  })
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const changeName = (fio, newToken) => {
  const token = newToken
    ? `Bearer ${newToken}`
    : `Bearer ${localStorage.getItem("token")}`;
  return fetch(`${URL}/user/name/`, {
    method: "POST",
    body: JSON.stringify({ fio }),
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  })
    .then((res) => {
      if (res.status === 403) {
        return undefined;
      } else {
        return res.status;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const changePhone = (phone, newToken) => {
  const token = newToken
    ? `Bearer ${newToken}`
    : `Bearer ${localStorage.getItem("token")}`;
  return fetch(`${URL}/user/phone/change_request/`, {
    method: "POST",
    body: JSON.stringify({ phone }),
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  })
    .then((res) => {
      if (res.status === 403) {
        return undefined;
      } else {
        return res.status;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const changePhoneConfirm = (phone, code, newToken) => {
  const token = newToken
    ? `Bearer ${newToken}`
    : `Bearer ${localStorage.getItem("token")}`;
  return fetch(`${URL}/user/phone/change_confirm/`, {
    method: "POST",
    body: JSON.stringify({ phone, code }),
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  })
    .then((res) => {
      if (res.status === 403) {
        return undefined;
      } else {
        return res.status;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserData = (newToken) => {
  const token = newToken
    ? `Bearer ${newToken}`
    : `Bearer ${localStorage.getItem("token")}`;
  return fetch(`${URL}/user/profile/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  })
    .then((res) => {
      if (res.status === 403) {
        return undefined;
      } else {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const cancelOrder = (table_id, newToken) => {
  const token = newToken
    ? `Bearer ${newToken}`
    : `Bearer ${localStorage.getItem("token")}`;
  return fetch(`${URL}/cancel_order/${table_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  })
    .then((res) => {
      if (res.status === 403) {
        return undefined;
      } else {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getFilterColor = () => {
  return fetch(`${URL}/filters/color/`, {
    method: "GET",
    headers: headersWithContentType,
  }).then(checkResponse);
};

export const getNews = () => {
  return fetch(`${URL}/news/`, {
    method: "GET",
    headers: headersWithContentType,
  }).then(checkResponse);
};

export const getFilterStyle = () => {
  return fetch(`${URL}/filters/style/`, {
    method: "GET",
    headers: headersWithContentType,
  }).then(checkResponse);
};

export const getFilterCountry = () => {
  return fetch(`${URL}/filters/country/`, {
    method: "GET",
    headers: headersWithContentType,
  }).then(checkResponse);
};

export const getFilterKind = () => {
  return fetch(`${URL}/filters/kind/`, {
    method: "GET",
    headers: headersWithContentType,
  }).then(checkResponse);
};

export const getFilterBrewery = () => {
  return fetch(`${URL}/filters/brewery/`, {
    method: "GET",
    headers: headersWithContentType,
  }).then(checkResponse);
};

export const getFilterBrand = () => {
  return fetch(`${URL}/filters/brand/`, {
    method: "GET",
    headers: headersWithContentType,
  }).then(checkResponse);
};

export const getFilterSnack = () => {
  return fetch(`${URL}/filters/snack/`, {
    method: "GET",
    headers: headersWithContentType,
  }).then(checkResponse);
};

export const getFilterUnits = () => {
  return fetch(`${URL}/filters/units/`, {
    method: "GET",
    headers: headersWithContentType,
  }).then(checkResponse);
};

export const getShops = () => {
  return fetch(`${URL}/shops/`, {
    method: "GET",
    headers: headersWithContentType,
  }).then(checkResponse);
};

export const getProducts = (id = 1, offset = 0, limit = 20, query = "") => {
  return fetch(
    `${URL}/products_ext/${id}/?offset=${offset}&limit=${limit}${query}`,
    {
      method: "GET",
      headers: headersWithContentType,
    }
  ).then(checkResponse);
};

export const getProduct = (shopId, goodId) => {
  return fetch(`${URL}/products_ext/${shopId}/${goodId}/?&in_stock=0`, {
    method: "GET",
    headers: headersWithContentType,
  }).then(checkResponse);
};

export const setOrder = (shopId, newToken) => {
  const token = newToken
    ? `Bearer ${newToken}`
    : `Bearer ${localStorage.getItem("token")}`;
  return fetch(`${URL}/cart/processing/`, {
    method: "POST",
    body: JSON.stringify({ shop_id: shopId }),
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  })
    .then((res) => {
      if (res.status === 403) {
        return undefined;
      } else {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getRecommendationsCards = () => {
  return fetch(`${URL}/recommendations/`, {
    method: "GET",
  }).then(checkResponse);
};

export const logoutUser = () => {
  return fetch(`${URL}/signout`, {
    method: "POST",
  }).then((res) => localStorage.removeItem("token"));
};

export const getСampaigns = () => {
  return fetch(`${URL}/campaigns/`, {
    method: "GET",
  }).then(checkResponse);
};

export const getOrdersHistory = (newToken) => {
  const token = newToken
    ? `Bearer ${newToken}`
    : `Bearer ${localStorage.getItem("token")}`;
  return fetch(`${URL}/user/history/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  })
    .then((res) => {
      if (res.status === 403) {
        return undefined;
      } else {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCart = (newToken) => {
  const token = newToken
    ? `Bearer ${newToken}`
    : `Bearer ${localStorage.getItem("token")}`;
  return fetch(`${URL}/cart/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  })
    .then((res) => {
      if (res.status === 403) {
        return undefined;
      } else {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postGoodInCart = (product, newToken) => {
  const token = newToken
    ? `Bearer ${newToken}`
    : `Bearer ${localStorage.getItem("token")}`;
  return fetch(`${URL}/cart/`, {
    method: "POST",
    body: JSON.stringify({ product }),
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  })
    .then((res) => {
      if (res.status === 403) {
        return undefined;
      } else {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteGoodFromCart = (id, newToken) => {
  const token = newToken
    ? `Bearer ${newToken}`
    : `Bearer ${localStorage.getItem("token")}`;
  return fetch(`${URL}/cart/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  })
    .then((res) => {
      if (res.status === 403) {
        return undefined;
      } else {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
