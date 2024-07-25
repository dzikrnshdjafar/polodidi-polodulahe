// src/utils/timeUtils.js
export const isNightTime = () => {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
};
