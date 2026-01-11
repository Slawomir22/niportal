import { createFeature, createReducer, on } from "@ngrx/store";
import { StateFeed } from "../models/stateFeed";
import { feedActions } from "./actions";
import { routerNavigatedAction } from "@ngrx/router-store";

const initialState: StateFeed = {
  isBeingLoaded: false,
  error: null,
  data: null,
};

const feedFunctionality = createFeature({
  name: "feed",
  reducer: createReducer(
    initialState,
    on(feedActions.get_feed, (state) => ({ ...state, isBeingLoaded: true })),
    on(feedActions.get_feed_success, (state, action) => ({
      ...state,
      isBeingLoaded: false,
      data: action.feed,
    })),
    on(feedActions.get_feed_failure, (state) => ({
      ...state,
      isBeingLoaded: false,
    })),
    on(routerNavigatedAction, () => initialState)
  ),
});

export const {
  name: feedFunctionalityKey,
  reducer: feedFunctionalityReducer,
  selectIsBeingLoaded,
  selectError,
  selectData: selectFeedData,
} = feedFunctionality;
