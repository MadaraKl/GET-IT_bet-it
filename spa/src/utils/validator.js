const isMoney = (value) => {
    const moneyPattern = /^(\d{1,8}(\.|,)\d{0,2}|\d{1,8})$/;

    return moneyPattern.test(value) || value === "";
} 

export default {isMoney};