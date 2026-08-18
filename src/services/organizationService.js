import axios from "axios";

const organizationApi = axios.create({
  baseURL: "/api/organizations",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// =====================================================
// GET MY ORGANIZATION
// =====================================================

export const getMyOrganization = async () => {
  return await organizationApi.get("/my");
};

// =====================================================
// UPDATE MY ORGANIZATION
// =====================================================

export const updateMyOrganization = async (data) => {
  return await organizationApi.put("/my", data);
};