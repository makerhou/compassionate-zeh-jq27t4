const baseURL = "https://webintl-back.sdk.qcloud.com"; // internationality

export const SDKAppID = 20000737;

async function instance(data: any) {
  let options: any = {
    method: data.method,
  };
  if (data.method === "GET") {
    data.url += `?`;
    for (const key in data.params) {
      if (Object.prototype.hasOwnProperty.call(data.params, key)) {
        const value = data.params[key];
        data.url += `${key}=${value}&`;
      }
    }
    data.url = data.url.slice(0, -1);
  } else {
    options.body = data.data;
  }

  const res = await fetch(`${baseURL}${data.url}`, options);
  return res.json();
}

export async function loginOverseas(data?: any) {
  const options = buildOptions(data, "/DemoInit/GetUserInfo", "GET");
  return instance(options);
}

function buildOptions(data: any, url: string, method?: string) {
  const options: any = {
    method: method || "POST",
    url,
  };
  if (options.method === "GET") {
    options.params = data;
  } else {
    options.data = JSON.stringify(data);
  }
  return options;
}
