export const isBeforeToday = (date: Date, secondDate: Date = null): boolean => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (secondDate) {
        return date < secondDate;
    }

    return date < today;
};