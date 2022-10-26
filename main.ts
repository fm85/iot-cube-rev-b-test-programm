function testRAKDevEUI () {
    messwert = DevEUI.length
    logTestStep(16, 16, messwert, "length Dev EUI okay (RAK Micro:Bit) comunication)")
}
function test_J1_J2_3V3 () {
    driveAndReadAnalog(DigitalPin.P0, AnalogPin.P1)
driveAndReadDigital(DigitalPin.P14, DigitalPin.P15)
}
function logTestStep (min: number, max: number, measuredValue: number, testName: string) {
    errorCount = 0
    if (measuredValue < min) {
        errorCount += 1
    }
    if (measuredValue > max) {
        errorCount += 1
    }
    datalogger.log(
    datalogger.createCV("DevEUI", DevEUI),
    datalogger.createCV("Testschritt", testName),
    datalogger.createCV("Min", min),
    datalogger.createCV("Max", max),
    datalogger.createCV("Messwert", measuredValue),
    datalogger.createCV("Anzahl Fehler", errorCount)
    )
    if (errorCount > 0) {
        music.playTone(165, music.beat(BeatFraction.Half))
    } else {
        music.playTone(988, music.beat(BeatFraction.Half))
    }
}
let errorCount = 0
let DevEUI = ""
let messwert = 0
function driveAndReadAnalog(drivePin: DigitalPin, readPin: AnalogPin) {
    pins.digitalWritePin(drivePin, 0)
    basic.pause(100)
    messwert = pins.analogReadPin(readPin)
    logTestStep(0, 5, messwert, "drive P" + (drivePin-100) + " low - read P" + (readPin-100))
    pins.digitalWritePin(drivePin, 1)
    basic.pause(100)
    messwert = pins.analogReadPin(readPin)
    logTestStep(1000, 1023, messwert, "drive " + (drivePin-100) + " high - read P" + (readPin-100))
}
function driveAndReadDigital(drivePin: DigitalPin, readPin: DigitalPin) {
    pins.digitalWritePin(drivePin, 0)
    basic.pause(100)
    messwert = pins.digitalReadPin(readPin)
    logTestStep(0, 0, messwert, "drive P" + (drivePin - 100) + " low - read P" + (readPin - 100))
    pins.digitalWritePin(drivePin, 1)
    basic.pause(100)
    messwert = pins.digitalReadPin(readPin)
    logTestStep(1, 1, messwert, "drive P" + (drivePin - 100) + " high - read P" + (readPin - 100))
}
datalogger.deleteLog(datalogger.DeleteType.Full)
datalogger.includeTimestamp(FlashLogTimeStampFormat.Seconds)
datalogger.setColumnTitles(
"DevEUI",
"Testschritt",
"Min",
"Max",
"Messwert",
"Anzahl Fehler"
)
DevEUI = IoTCube.getParameter(eRUI3_PARAM.DEVEUI)
testRAKDevEUI()
test_J1_J2_3V3()
