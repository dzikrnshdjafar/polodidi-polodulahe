// src/utils/dateUtils.js
import { format, parse } from 'date-fns';

export const formatDateTime = (datetime) => {
    const parsedDate = parse(datetime, 'yyyyMMddHHmm', new Date());
    return format(parsedDate, 'dd MMMM yyyy HH:mm:ss');
};
