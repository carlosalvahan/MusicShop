import { createReducer, on } from "@ngrx/store";
import { FilterItem, FilterListState } from "./filter-model";
import { FilterListActions } from "./filter-actions";

const initialState: FilterListState = {
    filters: [],
    searchText: ''
}

export const filterListReducer = createReducer(
    initialState,
    on(FilterListActions.getFilters, (state, {filters}) => {
        return {
            ...state,
            filters: [...filters]
        }
    }),
    on(FilterListActions.addFilter, (state, {filter}) => {
        return {
            ...state,
            filters: [...state.filters, filter]
        }
    }),
    on(FilterListActions.updateFilter, (state, {group, label, value}) => {
        return {
            ...state,
            filters: state.filters.map((sFilter) => {
                if(sFilter.group === group) {
                    const newFilterItems: FilterItem[] = sFilter.filterItems.map(sItem => {
                        if(sItem.label === label) {
                            if(sItem.label === label) {
                                const newItem = {...sItem, value: value};
                                return newItem;
                            }
                        }
                        return sItem;
                    })
                    const newGroup = {
                        ...sFilter, 
                        filterItems: [...newFilterItems]
                    }
                    return newGroup
                }
                return sFilter;
            })
        }
    }),
    on(FilterListActions.deleteFilter, (state, {idx}) => {
        return {
            ...state,
            filters: state.filters.filter((sFilter, sfIdx) => {
                return sfIdx !== idx;
            })
        }
    }),

    on(FilterListActions.updateSearchText, (state, {searchTxt}) => {
        console.log(searchTxt, 'helo');;
        return {
            ...state,
            searchText: searchTxt
        }
    })
);