import { put, call, select } from "redux-saga/effects";
import API from "api/fetchFromSpotify";
import { accessTokenSelector } from "selectors";

export const apiPhases = {
  STARTED: "STARTED",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  COMPLETED: "COMPLETED"
};

export const actionType = (action, phase) => `API_${action.type}_${phase}`;

const apiAction = (action, phase) => ({
  type: actionType(action, phase),
  payload: action.payload
});

const startedAction = action => apiAction(action, apiPhases.STARTED);

const successAction = (action, response) => ({
  ...apiAction(action, apiPhases.SUCCESS),
  response
});

const errorAction = (action, response) => ({
  ...apiAction(action, apiPhases.ERROR),
  error: response.error
});

const completedAction = action => apiAction(action, apiPhases.COMPLETED);

export const apiCall = function*(action, urlPart, requestType = "GET", data) {
  console.log("action in apiCall:", action);
  const accessToken = yield select(accessTokenSelector);

  if (!accessToken) {
    console.log("NO TOKEN IN API CALL:", action.type);
    return; // Handle 401 here
    // actually, this is handled pretty nicely in errorHandling
  }

  try {
    yield put(startedAction(action));

    let result;
    if (requestType === "GET") {
      result = yield call(API.get, accessToken, urlPart);
    } else if (requestType === "POST") {
      result = yield call(API.post, accessToken, urlPart, data);
      console.log("result: in apiCall", result);
    }

    yield put(successAction(action, result));
    return result;
  } catch (error) {
    console.log("error from catch in apiCall:", error);
    // Propogate error to error handling by calling api error action
    yield put(errorAction(action, error));
    return error;
  } finally {
    yield put(completedAction(action));
  }
};

export default apiCall;
