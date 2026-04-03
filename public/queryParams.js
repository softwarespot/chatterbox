const globalQueryParams = new URLSearchParams(window.location.search);

export function getGlobalQueryParam(key, initialState) {
    const value = globalQueryParams.get(key);
    if (value === null) {
        return initialState;
    }

    if (typeof initialState === 'string') {
        return value;
    }

    try {
        return JSON.parse(value);
    } catch {
        // Ignore error
    }
    return undefined;
}

export function setGlobalQueryParam(key, value, defaultValue) {
    if (value === defaultValue) {
        globalQueryParams.delete(key);
    } else {
        // Skip, when null or undefined
        if (value === null || value === 'null' || value === undefined || value === 'undefined') {
            return;
        }

        value = typeof value === 'string' ? value : JSON.stringify(value);
        globalQueryParams.set(key, value);
    }

    const pathname =
        globalQueryParams.size > 0 ? `?${globalQueryParams.toString()}` : new URL(window.location.href).pathname;
    window.history.pushState({}, '', pathname);
}
