class CurrencyFormat {

    static format(val) {
        let t = Math.abs(parseFloat(val).toFixed(2));
        return t;
    }


}

export { CurrencyFormat }