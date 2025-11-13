// import { create } from "zustand";
// import api from "../api/axios";

// const useLoginStore = create((set) => ({
//   mobileno: "",
//   passwd: "",
//   loading: false,
//   error: null,

//   setMobileNo: (value) => set({ mobileno: value }),
//   setPassword: (value) => set({ passwd: value }),

//   loginRequest: async (navigate) => {
//     set({ loading: true, error: null });

//     try {
//       const { mobileno, passwd } = useLoginStore.getState();

//       const response = await api.post("/admin/superLogin", {
//         mobile: mobileno,
//         password: passwd,
//       });

//       console.log("Login success:", response.data);
//       alert("Login successful!");
//       navigate("/home");
//     } catch (err) {
//       console.error("Login failed:", err);
//       set({
//         error: err.response?.data?.message || "Invalid credentials",
//       });
//     } finally {
//       set({ loading: false });
//     }
//   },
// }));

// export default useLoginStore;


// src/store/loginStore.js
import { create } from "zustand";
import { loginUser } from "../api/LoginApi";

const useLoginStore = create((set) => ({
  mobileno: "",
  passwd: "",
  loading: false,
  error: null,

  setMobileNo: (value) => set({ mobileno: value }),
  setPassword: (value) => set({ passwd: value }),

  loginRequest: async (navigate) => {
    set({ loading: true, error: null });

    try {
      const { mobileno, passwd } = useLoginStore.getState();

      // 🔹 Call the login API function
      const data = await loginUser(mobileno, passwd);

      console.log("Login success:", data);
     
      navigate("/home");
    } catch (err) {
      console.error("Login failed:", err);
      set({ error: err.message || "Invalid credentials" });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useLoginStore;

