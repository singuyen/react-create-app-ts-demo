import { fetch, addTask } from 'domain-task';
import { Action, Reducer } from 'redux';
import { get } from 'lodash';

import { AppThunkAction } from './';
import { CAROUSEL_API, FEATURED_API } from '../config';

export interface MainState {
    isLoadingCarousel: boolean;
    isLoadingFeatured: boolean;
    pageType: string;
    carouselData: any;
    filteredData: any;
    featuredData: any;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestCarouselApi {
    type: 'REQUEST_CAROUSEL_API';
    pageType: string;
}

interface ReceivedCarouselApi {
    type: 'RECEIVE_CAROUSEL_API';
    pageType: string;
    carouselData: any;
    filteredData: any;
}

interface RequestFilteredData {
    type: 'REQUEST_FILTERED_DATA';
    pageType: string;
}

interface ReceivedFilteredData {
    type: 'RECEIVE_FILTERED_DATA';
    pageType: string;
    carouselData: any;
    filteredData: any;
}

interface RequestFeaturedApi {
    type: 'REQUEST_FEATURED_API';
    pageType: string;
}

interface ReceivedFeaturedApi {
    type: 'RECEIVE_FEATURED_API';
    pageType: string;
    featuredData: any;
}

type KnownAction = RequestCarouselApi |
    ReceivedCarouselApi | 
    RequestFilteredData |
    ReceivedFilteredData |
    RequestFeaturedApi |
    ReceivedFeaturedApi;

export const actionCreators = {
    requestCarouselApi: (pageType: string):
        AppThunkAction<KnownAction> => (dispatch, getState) => {
            const fetchCarouselApi = fetch(CAROUSEL_API)
                .then(response => response.json() as Promise<ApiData>)
                .then(data => {

                    const carouselData = get(data, 'data', []);
                    
                    dispatch({
                        type: 'RECEIVE_CAROUSEL_API',
                        pageType,
                        carouselData,
                        filteredData: carouselData
                    });
                });

            addTask(fetchCarouselApi);
            dispatch({ type: 'REQUEST_CAROUSEL_API', pageType });
    },
    requestFilteredData: (searchInput: string, pageType: string):
        AppThunkAction<KnownAction> => (dispatch, getState) => {                        
            const curData = getState().MainPageState.carouselData;
            
            const filteredData = curData.reduce(
                (acc: any, item: any) => {
                    const title = get(item, 'title', '').toLowerCase();
                    const keyword = searchInput.toLowerCase();
                    
                    if (title.indexOf(keyword) > -1) {
                        acc.push(item);
                    }
                                        
                    return acc;
                },
                []
            );
                        
            dispatch({
                type: 'RECEIVE_FILTERED_DATA',
                pageType,
                carouselData: curData,
                filteredData
            });
            
            dispatch({ type: 'REQUEST_FILTERED_DATA', pageType });
    },
    requestFeaturedApi: (pageType: string):
        AppThunkAction<KnownAction> => (dispatch, getState) => {                        
            const fetchFeaturedApi = fetch(FEATURED_API)
                .then(response => response.json() as Promise<ApiData>)
                .then(data => {

                    const featuredData = get(data, 'data', []);
                    
                    dispatch({
                        type: 'RECEIVE_FEATURED_API',
                        pageType,
                        featuredData
                    });
                });

            addTask(fetchFeaturedApi);
            
            dispatch({ type: 'REQUEST_FEATURED_API', pageType });
    }
};

// ----------------
// REDUCER - For a given state and action,
// returns the new state. To support time travel,
// this must not mutate the old state.

const unloadedState: MainState = { 
    carouselData: [], 
    filteredData: [], 
    featuredData: [], 
    isLoadingCarousel: false,
    isLoadingFeatured: false, 
    pageType: ''
};

export const reducer: Reducer<MainState> = (state: MainState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;

    switch (action.type) {
        case 'REQUEST_CAROUSEL_API':
            return {
                pageType: action.pageType,
                isLoadingCarousel: true,
                isLoadingFeatured: false,
                carouselData: state.carouselData,
                filteredData: state.filteredData,
                featuredData: state.featuredData
            };
        case 'RECEIVE_CAROUSEL_API':
            return {
                pageType: action.pageType,
                isLoadingCarousel: false,
                isLoadingFeatured: false,
                carouselData: action.carouselData,
                filteredData: action.filteredData,
                featuredData: state.featuredData
            };
        case 'REQUEST_FILTERED_DATA':
            return {
                pageType: action.pageType,
                isLoadingCarousel: false,
                isLoadingFeatured: false,
                carouselData: state.carouselData,
                filteredData: state.filteredData,
                featuredData: state.featuredData
            }
        case 'RECEIVE_FILTERED_DATA':
            return {
                pageType: action.pageType,
                isLoadingCarousel: false,
                isLoadingFeatured: false,
                carouselData: state.carouselData,
                filteredData: action.filteredData,
                featuredData: state.featuredData
            }
        case 'REQUEST_FEATURED_API':
            return {
                pageType: action.pageType,
                isLoadingCarousel: false,
                isLoadingFeatured: true,
                carouselData: state.carouselData,
                filteredData: state.filteredData,
                featuredData: state.featuredData
            };
        case 'RECEIVE_FEATURED_API':
            return {
                pageType: action.pageType,
                isLoadingCarousel: false,
                isLoadingFeatured: false,
                carouselData: state.carouselData,
                filteredData: state.filteredData,
                featuredData: action.featuredData
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            // const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
