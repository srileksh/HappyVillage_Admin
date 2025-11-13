// import { create } from "zustand";
// import { getAllPanchayathCounts, getWardDetails } from "../api/HomeApi";

// const useHomeStore = create((set) => ({
//   panchayathData: [],
//   loading: false,
//   error: null,

//   // Function to fetch panchayath data
//   fetchPanchayathData: async () => {
//     set({ loading: true, error: null });

//     try {
//       const data = await getAllPanchayathCounts();
//       set({ panchayathData: data });
//     } catch (err) {
//       set({ error: err.message || "Unable to load Panchayath data" });
//     } finally {
//       set({ loading: false });
//     }
//   },





//   wardData: [],
//   loading: false,
//   error: null,

//   // Fetch ward data based on Panchayath name
//   fetchWardData: async (panchayathName) => {
//     set({ loading: true, error: null });

//     try {
//       const data = await getWardDetails(panchayathName);
//       set({ wardData: data });
//     } catch (err) {
//       set({ error: err.message || "Unable to load ward data" });
//     } finally {
//       set({ loading: false });
//     }
//   },







// }));

// export default useHomeStore;





import { create } from "zustand";
import { 
  getAllPanchayathCounts, 
  getWardDetails, 
  getAllHouseDetails, 
  getHouseDetails,
  getIndividualHouseDetails,
  getPersonalDetails,
  searchHouse
} from "../api/HomeApi";

// ✅ Zustand store combining Panchayath, Ward & House management
const useHomeStore = create((set,get) => ({
  // -------------------------------
  // 🌿 Panchayath Data
  // -------------------------------
  panchayathData: [],
  wardData: [],
  houseData: [],
  totalItems:null,
  loading: false,
  error: null,

  singleHouse: null, // Single house detail
  familyData: [], // Family members of that house

  // ✅ Fetch all Panchayath counts
  fetchPanchayathData: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getAllPanchayathCounts();
      set({ panchayathData: data.data });
    } catch (err) {
      set({ error: err.message || "Unable to load Panchayath data" });
    } finally {
      set({ loading: false });
    }
  },

  // -------------------------------
  // 🏘️ Ward Data
  // -------------------------------
  fetchWardData: async (panchayathName) => {
    set({ loading: true, error: null });
    try {
      const data = await getWardDetails(panchayathName);
      set({ wardData: data });
    } catch (err) {
      set({ error: err.message || "Unable to load ward data" });
    } finally {
      set({ loading: false });
    }
  },

  // -------------------------------
  // 🏠 House Data
  // -------------------------------
  fetchHouseData: async (panchayathName, wardNo, page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const data = await getAllHouseDetails(panchayathName, wardNo, page, limit);
      
      set({ houseData: data.houses,
         currentPage: data.currentPage,     // <-- important
      totalPages: data.totalPages,       // <-- important
      totalItems: data.totalHouses,      // <-- important
      itemsPerPage: data.housesPerPage
      
       });

    } catch (err) {
      set({ error: err.message || "Unable to load house data" });
    } finally {
      set({ loading: false });
    }
  },


    // ✅ Fetch single house + family details
  fetchIndividualHouseDetails: async (houseId) => {
    set({ loading: true, error: null });
    try {
      const data = await getIndividualHouseDetails(houseId);
      console.log(data,"uyguyguyguyg");
      
      set({ singleHouse: data.house, familyData: data.family });
    } catch (err) {
      set({ error: err.message || "Unable to load house details" });
    } finally {
      set({ loading: false });
    }
  },




    // 🏠 Fetch paginated house data
  fetchHouseDetails: async (panchayathName, wardNo, page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const data = await getHouseDetails(panchayathName, wardNo, page, limit);
      set({
        houseData: data.houses,
        totalPages: data.totalPages || 1,
        currentPage: data.currentPage || page,
      });
    } catch (err) {
      set({ error: err.message || "Unable to load house data" });
    } finally {
      set({ loading: false });
    }
  },

  // 🔍 Smart Search (debounced)
  searchHouseData: async (keyvalue, panchayathName, wardNo, page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const data = await searchHouse(keyvalue, panchayathName, wardNo, page, limit);
      console.log(data);
      
      set({ houseData: data.results });
    } catch (err) {
      set({ error: err.message || "Unable to search house data" });
    } finally {
      set({ loading: false });
    }
  },


   personalData: null,
  loading: false,
  error: null,

  // ✅ Fetch Member Personal Information
  fetchPersonalData: async (name, age, userid) => {
    set({ loading: true, error: null });

    try {
      const data = await getPersonalDetails(name, age, userid);
      set({ personalData: data });
    } catch (err) {
      set({
        error: err.message || "Unable to fetch personal details",
      });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useHomeStore;
