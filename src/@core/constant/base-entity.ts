
export function requestQuery(obj: any) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

export class BASE_ENTITY {
    limit: number = LIMIT.DEFAULT;
    page!: number;
}

export class PaginationResponse<T> {
    limit!: number;
    page!: number;
    total!: number;
    data!: Array<T>;
}

export const LIMIT = {
    DEFAULT: 10,
}