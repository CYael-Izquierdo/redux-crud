import {HIDE_ALERT, SHOW_ALERT} from "../types";

//Show an alert
export const showAlert = alert => {
    return (dispatch) => {
        dispatch(showAlertAction(alert));
    }
}

const showAlertAction = alert => ({
    type: SHOW_ALERT,
    payload: alert
});

// Hide alert
export const hideAlert = () => {
    return dispatch => {
        dispatch(hideAlertAction());
    }
}

const hideAlertAction = () => ({
    type: HIDE_ALERT
});