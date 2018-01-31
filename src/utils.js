export const arrayEmpty = obj => !obj || (obj && obj.length === 0);
export const arrayEquals = (obj, obj2) => JSON.stringify(obj) === JSON.stringify(obj2);
