const requiredData = {
    book: [
        'title',
        'description',
        'totalPages',
        'languages',
        'authorId',
        'cover',
        'price',
        'launchDate',
        'categories',
        'recommendedAge',
    ],
};

export function validatePayload(data: { [key: string]: any }, entity: string): boolean {
    return validateIfRequiredFieldsExists(data, entity) && validateIfFillsRequiredFields(data);
}

function validateIfRequiredFieldsExists(data: { [key: string]: any }, entity: string): boolean {
    return requiredData[entity].every((field: any) => Object.keys(data).includes(field));
}

function validateIfFillsRequiredFields(data: { [key: string]: any }): boolean {
    return Object.keys(data).every((key) => !!data[key] === true);
}
