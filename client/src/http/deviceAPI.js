import { $authHost, $host } from ".";
import jwt_decode from "jwt-decode";

export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);

  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const deleteType = async (id) => {
  console.log(id);
  const { data } = await $host.delete("api/type/" + id);
  return data;
};

export const createBrand = async (brand) => {
  console.log(brand);
  const { data } = await $authHost.post("api/brand", brand);

  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};

export const deleteBrand = async (id) => {
  console.log(id);
  const { data } = await $host.delete("api/brand/" + id);
  return data;
};

export const createDevice = async (device) => {
  console.log(device);
  const { data } = await $authHost.post("api/device", device);

  return data;
};

export const fetchDevices = async (type_id, brand_id, page, limit = 5) => {
  const { data } = await $host.get("api/device", {
    params: { type_id, brand_id, page, limit },
  });
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get("api/device/" + id);

  return data;
};

export const createBasketDevice = async (devUserId) => {
  console.log(devUserId);
  const { data } = await $host.post("api/basket/", devUserId);

  return data;
};

export const fetchBasketDevices = async (id) => {
  const { data } = await $host.get("api/basket/" + id);

  return data;
};

export const deleteDeviceBasket = async (id) => {
  const { data } = await $host.delete("api/basket/" + id);
  return data;
};
