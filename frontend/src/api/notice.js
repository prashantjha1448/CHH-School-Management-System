import api from "./axios";

/**
 * Notice API Helper Service
 * Connects to backend endpoints /notices
 */
export const getAllNotices = () => {
   return api.get('/notices');
};

export const getSingleNotice = (id) => {
    return api.get(`/notices/${id}`);
};
