export default class NumberUtil {
    static generateRandomNumber() {
        return Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    }

    static generateRandomNumberArbitrary(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}
