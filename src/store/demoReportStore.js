


import { create } from "zustand";
import {
  getFilters,
  getPanchayaths,
  getWards,
  getFilterValues,
  generateReport,
} from "../api/DemoReportApi";

export const useDemoReportStore = create((set, get) => ({
  filters: [],
  panchayaths: [],
  wards: [],
  filterValues: [],
  report: [],
  total: 0,
  loading: false,
  error: null,

  fetchFilters: async () => {
    try {
      const res = await getFilters();
      if (res.success) set({ filters: res.filters });
    } catch (err) {
      set({ error: err.message });
    }
  },

  fetchPanchayaths: async () => {
    try {
      const res = await getPanchayaths();
      if (res.success) set({ panchayaths: ["All", ...res.panchayaths] });
    } catch (err) {
      set({ error: err.message });
    }
  },

  fetchWards: async () => {
    try {
      const res = await getWards();
      if (res.success) set({ wards: ["All", ...res.wards] });
    } catch (err) {
      set({ error: err.message });
    }
  },

  fetchFilterValues: async (filter) => {
    try {
      const res = await getFilterValues(filter);
      if (res.success) set({ filterValues: res.values });
    } catch (err) {
      set({ error: err.message });
    }
  },

  fetchReport: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await generateReport(payload);
      if (res.success) {
        set({ report: res.records, total: res.total });
      }
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));
