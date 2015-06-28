#!/usr/bin/python

import time
import os
import glob
import time
import RPi.GPIO as GPIO

GPIO.setwarnings(False);
GPIO.setmode(GPIO.BCM)

#Relay 1 connected to pin 2
#Relay 2 connected to pin 3
#Relay 2 connected to pin 17
Relay_pump = 2
Relay_s1 = 3
Relay_s2 = 17
Relay_s3 = 27
pinList = [Relay_pump, Relay_s1, Relay_s2, Relay_s3] # missing spaces

#Turn both relays off to start with
for i in pinList:
    GPIO.setup(i, GPIO.OUT)
    GPIO.output(i, GPIO.HIGH)

#Enable the linux modules to read the one-wire temp devices
os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')

#***********Enter Sensor Unique ID number ************** Can be found with 'ls /sys/bus/w1/devices/'
poolsensor = '28-00000655c121'
syst1sensor = '28-000006908add'
syst2sensor = '28-0000068f6315'
syst3sensor = '28-0000069009a3'
ambiantsensor = '28-0000068faa30'

sensor_id = [poolsensor, syst1sensor, syst2sensor, syst3sensor, ambiantsensor]


#************Read sensors*********
def read_temp_raw(device):
    """Pass this function either 0 or 1 to get the raw data from the
        Temperature Sensor"""
    f = open('/sys/bus/w1/devices/' + device + '/w1_slave' , 'r')
    lines = f.readlines()
    f.close()
    return lines

def read_temp(device):
    """Pass 0 or 1 to get the temperature in celcius of either sensor"""
    lines = read_temp_raw(device) #missing "device"
    while lines[0].strip()[-3:] != 'YES':
        time.sleep(0.2)
        lines = read_temp_raw(device)
    equals_pos = lines[1].find('t=')
    if equals_pos != -1:
        temp_string = lines[1][equals_pos+2:]
        temp_c = float(temp_string) / 1000.0
        return temp_c


#*************Main Routine*******************
try:
    pooltemp = read_temp(poolsensor)
    syst1temp = read_temp(syst1sensor)
    syst2temp = read_temp(syst2sensor)
    syst3temp = read_temp(syst3sensor)
    ambianttemp = read_temp(ambiantsensor)

    systemstats = '{"pool": ' + str(pooltemp) + ', "ambient": ' + str(ambianttemp) + \
                  ',"sol1": ' + str(syst1temp) + \
                  ',"sol2": ' + str(syst2temp) + \
                  ',"sol3": ' + str(syst3temp) + '}'
    print systemstats # send this to node.js (python-shell)

except KeyboardInterrupt:        GPIO.cleanup()

exit()
