const d = new Date();
export const dateTo = d.toISOString();
d.setDate(d.getDate() - 7);
export const dateFrom = d.toISOString();