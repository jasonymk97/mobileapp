import { request } from '../core/apiService';
export const createTransaction = async ({date, amount, description, type, category_id}) => {
  return request('post', '/transactions', { date, amount, description, type, category_id});
};
export const getTransactions = async () => {
  return request('get', '/transactions');
};
export const deleteTransaction = async (id) => {
  return request('delete', `/transactions/${id}`);
};
export const updateTransaction = async ({id, date, amount, description, type, category_id}) => {
  return request('put', `/transactions/${id}`, {date, amount, description, type, category_id });
};

export default {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,  
}