import api from "../utils/axiosConfig";

export interface Address {
  id: number;
  u_id: number;
  addr_1: string;
  addr_2: string;
  zip: string;
  city: string;
  country: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface AddressCreateRequest {
  addr_1: string;
  addr_2?: string;
  zip: string;
  city: string;
  country: string;
  isdefault?: boolean;
}

/**
 * Fetches all addresses for current user
 */
export const getAddresses = async (): Promise<Address[]> => {
  const res = await api.get("/v1/users/addresses");
  return res.data;
};

/**
 * Creates new address for current user
 */
export const createAddress = async (
  data: AddressCreateRequest
): Promise<Address> => {
  const res = await api.post("/v1/users/address/add", data);
  return res.data;
};

/**
 * Deletes address by ID
 */
export const deleteAddress = async (id: number): Promise<void> => {
  await api.delete(`/v1/users/address/${id}`);
};

/**
 * Updates existing address
 */
export const updateAddress = async (
  id: number,
  data: Partial<AddressCreateRequest>
): Promise<Address> => {
  const res = await api.patch(`/v1/users/address/${id}`, data);
  return res.data;
};
