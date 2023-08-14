export const numberFormat = (value, digits = 3, locales = 'en-IN') => {

    if (value === null) {
        return null;//Do not try to format null
    }

    return new Intl.NumberFormat(locales, {maximumSignificantDigits: digits}).format(value);
}

export const termIntToStringShort = ($term) => {

    if ($term === 1) {
        return 'p/w';
    } else if ($term === 2) {
        return 'p/m';
    } else if ($term === 3) {
        return '3m';
    } else if ($term === 4) {
        return '6m';
    } else if ($term === 5) {
        return 'p/y';
    } else if ($term === 6) {
        return '2y';
    }

    return '';
}
