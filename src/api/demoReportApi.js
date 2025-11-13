
import api from "./axios";

export const getFilters = async () => {
  const res = await api.get(`demo/filters`);
  return res.data;
};

export const getPanchayaths = async () => {
  const res = await api.get(`demo/panchayaths`);
  return res.data;
};

export const getWards = async () => {
  const res = await api.get(`demo/wards`);
  return res.data;
};

export const getFilterValues = async (filter) => {
  const res = await api.get(`demo/filter-values?filter=${filter}`);
  return res.data;
};

export const generateReport = async (payload) => {
  const res = await api.post(`demo/generate`, payload);
  return res.data;
};
