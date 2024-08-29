from gpiozero import LED
import time

led_red = LED(1)
led_green = LED(2)
led_blue = LED(3)



def blinkOnce(red: bool, green: bool, blue: bool, delay: float = 0.5):
    # Schalte die LEDs basierend auf den übergebenen Parametern ein
    if red:
        led_red.on()
    if green:
        led_green.on()
    if blue:
        led_blue.on()

    # Warte für die angegebene Verzögerung
    time.sleep(delay)

    # Schalte alle LEDs wieder aus
    led_red.off()
    led_green.off()
    led_blue.off()

def blinkThreeTimes(red: bool, green: bool, blue: bool, delay: float = 0.5):
    for _ in range(3):
        if red:
            led_red.on()
        if green:
            led_green.on()
        if blue:
            led_blue.on()

        time.sleep(delay)

        led_red.off()
        led_green.off()
        led_blue.off()

        time.sleep(delay)
