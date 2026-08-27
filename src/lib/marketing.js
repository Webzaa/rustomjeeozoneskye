const MARKETING_PARAMS = [
  "utm_source",
  "utm_sub_source",
  "utm_medium",
  "campaigncode",
  "campaignname",
  "Lead_Keyword",
  "utm_adset",
  "utm_adname",
  "Lead_Placement",
  "Lead_Device",
  "gad_source",
  "gad_campaignid",
  "gbraid",
  "gclid",
];

function isSet(value) {
  return (
    value !== undefined &&
    value !== null &&
    String(value).trim() !== ""
  );
}

function setCookie(name, value, days = 30) {
  const date = new Date();

  date.setTime(
    date.getTime() +
      days * 24 * 60 * 60 * 1000
  );

  document.cookie =
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}` +
    `; expires=${date.toUTCString()}` +
    `; path=/` +
    `; SameSite=Lax`;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");

  const prefix =
    `${encodeURIComponent(name)}=`;

  const cookie = cookies.find((item) =>
    item.startsWith(prefix)
  );

  if (!cookie) {
    return "";
  }

  return decodeURIComponent(
    cookie.substring(prefix.length)
  );
}

function deleteCookie(name) {
  document.cookie =
    `${encodeURIComponent(name)}=` +
    `; expires=Thu, 01 Jan 1970 00:00:00 GMT` +
    `; path=/`;
}

export function captureMarketingParams() {
  const params = new URLSearchParams(
    window.location.search
  );

  MARKETING_PARAMS.forEach((key) => {
    const value = params.get(key);

    if (isSet(value)) {
      setCookie(
        key,
        value,
        30
      );
    }
  });

  return getMarketingData();
}

export function getMarketingData() {
  const data = {};

  MARKETING_PARAMS.forEach((key) => {
    const value = getCookie(key);

    if (isSet(value)) {
      data[key] = value;
    }
  });

  return data;
}

export function clearMarketingData() {
  MARKETING_PARAMS.forEach((key) => {
    deleteCookie(key);
  });
}