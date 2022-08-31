const GET_API_KEY = 'maps/GET_API_KEY';

const actionGetKey = (key) => ({
    type: GET_API_KEY,
    payload: key,
});

export const thunkGetKey = () => async (dispatch) => {
        const res = await fetch('/api/restaurants/googlemapapi', {
            method: 'GET',
        });
        const data = await res.json();
    dispatch(actionGetKey(data.googleMapsAPIKey));
};

const initialState = { key: null };

const mapsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_API_KEY:
            return { key: action.payload };
        default:
            return state;
    }
};

export default mapsReducer;
