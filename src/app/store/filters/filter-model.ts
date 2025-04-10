export class FilterGroup {
    constructor(group: string, filterItems: FilterItem[], groupLabel?: string) {
        this.group = group;
        this.groupLabel = groupLabel || this.group;
        this.filterItems = filterItems;
    }
    group: string;
    filterItems: FilterItem[] = [];
    groupLabel: string;
}

export class FilterItem {
    constructor(label: string, value: boolean) {
        this.label = label;
        this.value = value;
    }
    label: string;
    value: string | number | boolean;
}

export class FilterListState {
    searchText: string = '';
    filters: FilterGroup[] = [];
}