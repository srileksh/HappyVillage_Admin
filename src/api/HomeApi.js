import api from "./axios";

// ✅ Get all Panchayath data
export const getAllPanchayathCounts = async () => {
  try {
    const response = await api.get("/admin/allCounts");
    console.log(response);
    
    return response;
  } catch (error) {
    console.error("Error fetching Panchayath data:", error);
    throw error.response?.data || { message: "Failed to fetch Panchayath data" };
  }
};


export const getWardDetails = async (panchayathName) => {
  try {
    const response = await api.get(
      `/admin/wardDetails?Panchayath=${panchayathName}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ward details:", error);
    throw error.response?.data || { message: "Failed to fetch ward details" };
  }
};




// ✅ Fetch houses under a specific Panchayath & Ward
export const getAllHouseDetails = async (panchayathName, wardNo, page = 1, limit = 10) => {
  try {
    const response = await api.get(
      `/admin/familyDetails?Panchayath=${panchayathName}&WardNo=${wardNo}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching house details:", error);
    throw error.response?.data || { message: "Failed to fetch house details" };
  }
};



// ✅ Get house and family details by house ID
export const getIndividualHouseDetails = async (houseId) => {
  try {
    const res = await api.get(`/admin/houseDetails?_id=${houseId}`);
    console.log(res);
    
    return res.data;
  } catch (error) {
    console.error("Error fetching house details:", error);
    throw new Error("Failed to load house details");
  }
};


// ✅ Search houses under a Panchayath & Ward
export const searchHouse = async (keyvalue, panchayathName, wardNo, page = 1, limit = 10) => {
  try {
    const response = await api.get(
      `/admin/searchHouse?keyvalue=${keyvalue}&Panchayath=${panchayathName}&WardNo=${wardNo}&page=${page}&limit=${limit}`
    );
    console.log(response);
    
    return response.data;
  } catch (error) {
    console.error("Error searching house:", error);
    throw error.response?.data || { message: "Failed to search house data" };
  }
};

// ✅ Fetch houses (paginated)
export const getHouseDetails = async (panchayathName, wardNo, page = 1, limit = 10) => {
  try {
    const response = await api.get(
      `/admin/familyDetails?Panchayath=${panchayathName}&WardNo=${wardNo}&page=${page}&limit=${limit}`
    );
    return {
      houses: response.data.houses,
      totalPages: response.data.totalPages,
      currentPage: response.data.currentPage,
    };
  } catch (error) {
    console.error("Error fetching house details:", error);
    throw error.response?.data || { message: "Failed to fetch house details" };
  }
};



// ✅ Fetch personal details of a member
export const getPersonalDetails = async (name, age, userid) => {
  try {
    const response = await api.get(
      `/admin/personalDetails?Name=${name}&Age=${age}&Userid=${userid}`
    );
    return response.data; // return the response data
  } catch (error) {
    console.error("Error fetching personal details:", error);
    throw error;
  }
};

