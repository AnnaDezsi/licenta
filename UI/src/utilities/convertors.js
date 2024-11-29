export const convertToLabelAndValue = (object, propertyKeyAsValue) => {
    return ({
        value: object[propertyKeyAsValue],
        label: String(object[propertyKeyAsValue])
    })
}

export const convertManyToLabelAndValue = (values, propertyKeyAsValue) => {
    return values.map(obj => convertToLabelAndValue(obj, propertyKeyAsValue))
}