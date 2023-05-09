export const numberFormat = (value, digits = 3, locales = 'en-IN')=> {

    if (value === null) {
        return null;//Do not try to format null
    }

    return new Intl.NumberFormat(locales, {maximumSignificantDigits: digits}).format(value);
}
