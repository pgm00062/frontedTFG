import manageRequest from '@/domain/manageRequest';

const timeUseCases = {
  startTime: (signal, values, token, headers) => {
    return manageRequest(
      signal,
      'startTime',
      values,
      'body',
      'normal',
      'post',
      token,
      undefined,
      headers,
    );
  },
  endTime: (signal, values, token, headers) => {
    return manageRequest(
      signal,
      'endTime',
      values,
      'body',
      'normal',
      'post',
      token,
      undefined,
      headers,
    );
  },
  getActiveSession: (signal, values, token, headers) => {
    return manageRequest(
      signal,
      'getActiveSession',
      values,
      'normal',
      'normal',
      'get',
      token,
      undefined,
      headers,
    );
  },
  getProjectTotalTime: (signal, values, token, headers) => {
    return manageRequest(
      signal,
      'getProjectTotalTime',
      values,
      'url',
      'normal',
      'get',
      token,
      undefined,
      headers,
    );
  },
  listTimeSessions: (signal, values, token, headers) => {
    return manageRequest(
      signal,
      'listTimeSessions',
      values,
      'query',
      'normal',
      'get',
      token,
      undefined,
      headers,
    );
  },
};

export default timeUseCases;
