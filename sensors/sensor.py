import requests # sudo pip3 install requests
import json
import random
from datetime import *
import time

gpio_enabled = False

try:
	from gpiozero import LED
	import atexit # extinction des LEDs à la fin du script
	green_led = LED(2)
	red_led = LED(3)

	gpio_enabled = True

	def exit_handler():
		green_led.off()
		red_led.off()

	atexit.register(exit_handler)

except:
	print("[-] not runnning on an embedded device... disabling GPIO support !")

gateway = "ec2-3-83-159-102.compute-1.amazonaws.com:3000"
id = 1

quantity = 50
temp = 30

while True:

	quantity = abs(quantity + random.randint(-5, 5))
	temp = abs(temp + random.randint(-2, 2))
	qual = random.randint(1,3)

	if gpio_enabled:
		green_led.off()
		red_led.off() 

		if qual == 1: # eau de mauvaise qualité, on allume la LED rouge
			red_led.on()
		if qual == 3: # eau de bonne qualité, on allume la LED verte
			green_led.on()

	data = {
		'id': id,
		'sensor_id': 1,
		'datetime' : datetime.now().strftime("%b %d %Y %H:%M:%S"),
		'quantity': quantity,
		'quality': qual, # 1 = mauvaise, 2 = moyenne, 3 = bonne
		'humidity': random.randint(50,75), # exprimée en pourcentage
		'temp': temp, # expérimée en degrés celsius
		'irradiance': 500
	}

	# alertes sur tout
	# quantité initiale

	post_data = json.dumps(data)
	id = id + 1
	print("[!] sending sensor data to gateway...")

	try:
		res = requests.post('http://' + gateway + '/captor/data', data=post_data).content # TODO check retour POST (200 OK)
		print(res)
	except Exception as e:
		print(e)
	
	time.sleep(20)

# TODO au dessus de ça, c'est une alerte
# quantity < 50, quality 5, 
# moyenne a peu près nulle
# quantity en moyenne ça va diminuer pour throw une alerte*
