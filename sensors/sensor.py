import requests # sudo pip3 install requests
import json
import random
from datetime import *
import time

gpio_enabled = False

try:
	from gpiozero import LED
	green_led = LED(2)
	red_led = LED(3)

	gpio_enabled = True
except:
	print("[-] not runnning on an embedded device... disabling GPIO support !")

gateway = "192.168.43.230:3000"
id = 1

while True:

	if gpio_enabled:
		green_led.off()
		red_led.off() 

	qual = random.randint(1,3)

	if qual == 1: # eau de mauvaise qualité, on allume la LED rouge
		red_led.on()
	if qual == 3: # eau de bonne qualité, on allume la LED verte
		green_led.on()

	data = {
		'id': id,
		'sensor_id': 1,
		'datetime' : datetime.now().strftime("%b %d %Y %H:%M:%S"),
		'quantity': 50 + random.randint(-10, 10),
		'quality': qual, # 1 = mauvaise, 2 = moyenne, 3 = bonne
		'humidity': random.randint(50,75), # expérimée en pourcentage
		'temp': random.randint(30, 40), # expérimée en degrés celsius
		'irradiance': 4141
	}

	post_data = json.dumps(data)
	id = id + 1
	print("[!] sending sensor data to gateway...")

	try:
		res = requests.post('http://' + gateway+'/data', data=post_data).content # TODO check retour POST (200 OK)
		print(res)
	except Exception as e:
		print(e)
	
	time.sleep(30)
