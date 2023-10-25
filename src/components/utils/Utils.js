export const FecthData = async (url, method, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, {
        method: method,
        ...(body && { body: body }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};

export const isObjEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
