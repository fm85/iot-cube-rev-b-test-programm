//% color="#f59842" icon="\uf002" block="TestRoutines"
namespace Testing {
    //% blockId=driveAndReadAnalog
    //% block="Drive %drivePin and read %readPin Analog"
    export function driveAndReadAnalog(drivePin: DigitalPin, readPin: AnalogPin) {
        pins.digitalWritePin(drivePin, 0)
        basic.pause(100)
        messwert = pins.analogReadPin(readPin)
        logTestStep(0, 5, messwert, "drive P" + (drivePin - 100) + " low - read P" + (readPin - 100))
        pins.digitalWritePin(drivePin, 1)
        basic.pause(100)
        messwert = pins.analogReadPin(readPin)
        logTestStep(1000, 1023, messwert, "drive P" + (drivePin - 100) + " high - read P" + (readPin - 100))
    }

    //% blockId=driveAndReadDigital
    //% block="Drive %drivePin and read %readPin Digital "
    export function driveAndReadDigital(drivePin: DigitalPin, readPin: DigitalPin) {
        pins.digitalWritePin(drivePin, 0)
        basic.pause(100)
        messwert = pins.digitalReadPin(readPin)
        logTestStep(0, 0, messwert, "drive P" + (drivePin - 100) + " low - read P" + (readPin - 100))
        pins.digitalWritePin(drivePin, 1)
        basic.pause(100)
        messwert = pins.digitalReadPin(readPin)
        logTestStep(1, 1, messwert, "drive P" + (drivePin - 100) + " high - read P" + (readPin - 100))
    }
}

