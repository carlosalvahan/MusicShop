import { createActionGroup, props } from "@ngrx/store";
import { FilterGroup } from "./filter-model";

export const FilterListActions = createActionGroup({
    source: 'Filters', 
    events: {
        'getFilters': props<{filters: FilterGroup[]}>(),
        'updateFilter': props<{group: string, label: string, value: string | number | boolean}>(),
        'deleteFilter': props<{idx: number }>(),
        'addFilter': props<{filter: FilterGroup}>(),
        'updateSearchText': props<{searchTxt: string}>(),
    }
})