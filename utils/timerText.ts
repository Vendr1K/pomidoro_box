export function timerText (number: number ) {
    const minutes = Math.floor(number/60);
    const seconds = number % 60;
    return {
        minutes: `${minutes < 10 ? `0${minutes}` : minutes}`,
        seconds: `${seconds < 10 ? `0${seconds}` : seconds}`,
    }
}