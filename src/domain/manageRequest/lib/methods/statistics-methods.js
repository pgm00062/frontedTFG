import { makeRequest } from '../index';
import { STATISTICS_QUERIES, STATISTICS_ERROR_MESSAGES } from '../queries/statistics-queries';

export const getMonthlyEarnings = async (token) => {
  try {
    return await makeRequest({
      query: STATISTICS_QUERIES.monthlyEarnings(),
      method: 'GET',
      token,
      errorMessage: STATISTICS_ERROR_MESSAGES.monthlyEarnings,
    });
  } catch (error) {
    console.error('Error in getMonthlyEarnings:', error);
    throw error;
  }
};

export const getPendingEarnings = async (token) => {
  try {
    return await makeRequest({
      query: STATISTICS_QUERIES.pendingEarnings(),
      method: 'GET',
      token,
      errorMessage: STATISTICS_ERROR_MESSAGES.pendingEarnings,
    });
  } catch (error) {
    console.error('Error in getPendingEarnings:', error);
    throw error;
  }
};

export const getProjectsTimeWorked = async (token) => {
  try {
    return await makeRequest({
      query: STATISTICS_QUERIES.projectsTimeWorked(),
      method: 'GET',
      token,
      errorMessage: STATISTICS_ERROR_MESSAGES.projectsTimeWorked,
    });
  } catch (error) {
    console.error('Error in getProjectsTimeWorked:', error);
    throw error;
  }
};

export const getEarningsVsTime = async (token) => {
  try {
    return await makeRequest({
      query: STATISTICS_QUERIES.earningsVsTime(),
      method: 'GET',
      token,
      errorMessage: STATISTICS_ERROR_MESSAGES.earningsVsTime,
    });
  } catch (error) {
    console.error('Error in getEarningsVsTime:', error);
    throw error;
  }
};
