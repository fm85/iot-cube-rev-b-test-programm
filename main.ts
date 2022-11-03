function testRAKDevEUI () {
    messwert = DevEUI.length
    logTestStep(16, 16, messwert, "length Dev EUI okay (RAK Micro:Bit) comunication)")
}
function test_J1_J3_3V3 () {
    Testing.driveAndReadAnalog(DigitalPin.P0, AnalogPin.P2)
    Testing.driveAndReadDigital(DigitalPin.P14, DigitalPin.P16)
}
function testI2C () {
    IoTCube.setPin(MCP_Pins.USR_LED, true)
    basic.pause(100)
    messwert = IoTCube.getPin(MCP_Pins.USR_LED)
    basic.pause(100)
    logTestStep(0, 0, messwert, "user LED high (I2C Port Expander)")
    IoTCube.setPin(MCP_Pins.USR_LED, false)
    basic.pause(100)
    messwert = IoTCube.getPin(MCP_Pins.USR_LED)
    logTestStep(128, 128, messwert, "user LED low (I2C Port Expander)")
    basic.pause(100)
    IoTCube.setPin(MCP_Pins.RAK_LED, true)
    basic.pause(100)
    messwert = IoTCube.getPin(MCP_Pins.RAK_LED)
    basic.pause(100)
    logTestStep(0, 0, messwert, "RAK LED high (I2C Port Expander)")
    IoTCube.setPin(MCP_Pins.RAK_LED, false)
    basic.pause(100)
    messwert = IoTCube.getPin(MCP_Pins.RAK_LED)
    logTestStep(2, 2, messwert, "RAK LED low (I2C Port Expander)")
}
function test_J6_J7_5V () {
    Testing.driveAndReadDigital(DigitalPin.P0, DigitalPin.P1)
    Testing.driveAndReadDigital(DigitalPin.P14, DigitalPin.P15)
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
        FailedTests += 1
    } else {
        music.playTone(988, music.beat(BeatFraction.Half))
    }
    led.plot(TestsProgress % 5, TestsProgress / 5)
    TestsProgress += 1
}
let errorCount = 0
let FailedTests = 0
let DevEUI = ""
let TestsProgress = 0
let messwert = 0
let NumberOfTests = 0
messwert = 0
basic.showString("Test")
basic.showArrow(ArrowNames.West)
while (!(input.buttonIsPressed(Button.A))) {
	
}
basic.clearScreen()
TestsProgress = 0
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
test_J1_J3_3V3()
test_J6_J7_5V()
testI2C()
if (FailedTests) {
    basic.showIcon(IconNames.No)
} else {
    basic.showIcon(IconNames.Yes)
}
