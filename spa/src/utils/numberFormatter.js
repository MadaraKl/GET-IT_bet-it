const formatMoney = (value) => {
    return (Math.floor(parseFloat(value) * 100) / 100).toFixed(2);
  }
  
  export default {formatMoney};