/**
 * 判断何时做何事
 * 
 * 6:30起床
 * 
 * 7:00早餐
 * 
 * 8:00户外运动
 * 
 * 12:00午餐
 * 
 * 18:00晚餐
 * 
 * 21:00睡觉
 * 
 * 舵机指针指向某个角度
 * 
 * 15
 * 
 * 45
 * 
 * 75
 * 
 * 105
 * 
 * 135
 * 
 * 165
 */
function thingsAndServo () {
    timeanddate.numericTime(function (hour, minute, second, month, day, year) {
        if (hour == 6 && minute == 30) {
            pins.servoWritePin(AnalogPin.P16, 15)
        } else if (hour == 7 && minute == 0) {
            pins.servoWritePin(AnalogPin.P16, 45)
        } else if (hour == 8 && minute == 0) {
            pins.servoWritePin(AnalogPin.P16, 75)
        } else if (hour == 12 && minute == 0) {
            pins.servoWritePin(AnalogPin.P16, 105)
        } else if (hour == 18 && minute == 0) {
            pins.servoWritePin(AnalogPin.P16, 135)
        } else if (hour == 21 && minute == 0) {
            pins.servoWritePin(AnalogPin.P16, 165)
        }
    })
}
function blink () {
    if (timeanddate.secondsSinceReset() % 2 == 0) {
        tm.showDP(1, true)
    } else {
        tm.showDP(1, false)
    }
}
function adjustTM () {
    timeanddate.numericTime(function (hour, minute, second, month, day, year) {
        if (input.buttonIsPressed(Button.A)) {
            if (hour >= 24) {
                timeanddate.set24HourTime(0, minute, 0)
            }
            timeanddate.set24HourTime(hour + 1, minute, 0)
            basic.pause(200)
        }
        if (input.buttonIsPressed(Button.B)) {
            if (minute >= 60) {
                timeanddate.set24HourTime(hour, 0, 0)
            }
            timeanddate.set24HourTime(hour, minute + 1, 0)
            basic.pause(200)
        }
    })
}
function autoIntensity () {
    tm.intensity(pins.map(
    input.lightLevel(),
    0,
    255,
    0,
    10
    ))
}
let tm: TM1637.TM1637LEDs = null
tm = TM1637.create(
DigitalPin.P1,
DigitalPin.P2,
7,
4
)
timeanddate.set24HourTime(12, 0, 0)
basic.forever(function () {
    adjustTM()
    blink()
    thingsAndServo()
})
basic.forever(function () {
    timeanddate.numericTime(function (hour, minute, second, month, day, year) {
        tm.showNumber(hour * 100 + minute)
    })
})
