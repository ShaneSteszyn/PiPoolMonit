#!/usr/bin/python

#********************eMAIL****************
# Import smtplib to provide email functions
import smtplib
 
# Define SMTP email server details
smtp_server = 'smtp.gmail.com'
smtp_user   = 'xxxxx@gmail.com'
smtp_pass   = 'xxxxxx'

# Define email addresses to use
addr_to   = 'xxxxxx'
addr_from = 'xxxxxx@gmail.com'



import time
import os
import glob
import time
import RPi.GPIO as GPIO

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

#**************Initialize count of system remaining "ON" for pump safety shutoff to avoid pressure creep*********
systoncount = 0


#*************Main Routine*******************
while True:
    try:
        pooltemp = read_temp(poolsensor)
        syst1temp = read_temp(syst1sensor)
        syst2temp = read_temp(syst2sensor)
        syst3temp = read_temp(syst3sensor)
        ambianttemp = read_temp(ambiantsensor)

        systemstats = "Temperature de la piscine:.......... " + str(pooltemp) + " C" + '\n' \
                      "Temperature de l'air ambiant:....... " + str(ambianttemp) + " C" + '\n' \
                      "Temperature du systeme solaire 1:... " + str(syst1temp) + " C" + '\n' \
                      "Temperature du systeme solaire 2:... " + str(syst2temp) + " C" + '\n' \
                      "Temperature du systeme solaire 3:... " + str(syst3temp) + " C"

#*******System #1**********
        if (syst1temp > pooltemp + 5 ):
            if GPIO.input(Relay_s1) == 1:
              systoncount = systoncount + 1
              GPIO.output(Relay_s1, GPIO.LOW)
              s = smtplib.SMTP(smtp_server,587)
              s.ehlo()
              s.starttls()
              s.ehlo()
              s.login(smtp_user,smtp_pass)
              s.sendmail(addr_from, addr_to, 'System Number1 engaged.' + '\n' + '\n' + str(systemstats))
              s.quit()

        elif (syst1temp < pooltemp + 5 ):
            if GPIO.input(Relay_s1) == 0:
              if systoncount == 1:
                GPIO.output(Relay_pump, GPIO.HIGH)
                time.sleep(1)
              GPIO.output(Relay_s1, GPIO.HIGH)
              systoncount = systoncount - 1
              s = smtplib.SMTP(smtp_server,587)
              s.ehlo()
              s.starttls()
              s.ehlo()
              s.login(smtp_user,smtp_pass)
              s.sendmail(addr_from, addr_to, 'System Number1 disengaged.' + '\n' + '\n' + str(systemstats))
              s.quit()

#*******System #2**********
        if (syst2temp > pooltemp + 5 ):
            if GPIO.input(Relay_s2) == 1:
              systoncount = systoncount + 1
              GPIO.output(Relay_s2, GPIO.LOW)
              s = smtplib.SMTP(smtp_server,587)
              s.ehlo()
              s.starttls()
              s.ehlo()
              s.login(smtp_user,smtp_pass)
              s.sendmail(addr_from, addr_to, 'System Number2 engaged.' + '\n' + '\n' + str(systemstats))
              s.quit()

        elif (syst2temp < pooltemp + 5):
            if GPIO.input(Relay_s2) == 0:
              if systoncount == 1:
                GPIO.output(Relay_pump, GPIO.HIGH)
                time.sleep(1)
              GPIO.output(Relay_s2, GPIO.HIGH)
              systoncount = systoncount - 1
              s = smtplib.SMTP(smtp_server,587)
              s.ehlo()
              s.starttls()
              s.ehlo()
              s.login(smtp_user,smtp_pass)
              s.sendmail(addr_from, addr_to, 'System Number2 disengaged.' + '\n' + '\n' + str(systemstats))
              s.quit()

#*******System #3**********       
        if (syst3temp > pooltemp + 5 ):
            if GPIO.input(Relay_s3) == 1:
              systoncount = systoncount + 1
              GPIO.output(Relay_s3, GPIO.LOW)
              s = smtplib.SMTP(smtp_server,587)
              s.ehlo()
              s.starttls()
              s.ehlo()
              s.login(smtp_user,smtp_pass)
              s.sendmail(addr_from, addr_to, 'System Number3 engaged.' + '\n' + '\n' + str(systemstats))
              s.quit()

        elif (syst3temp < pooltemp + 5 ):
            if GPIO.input(Relay_s3) == 0:
              if systoncount == 1:
                GPIO.output(Relay_pump, GPIO.HIGH)
                time.sleep(1)
              GPIO.output(Relay_s3, GPIO.HIGH)
              systoncount = systoncount - 1
              s = smtplib.SMTP(smtp_server,587)
              s.ehlo()
              s.starttls()
              s.ehlo()
              s.login(smtp_user,smtp_pass)
              s.sendmail(addr_from, addr_to, 'System Number3 disengaged.' + '\n' + '\n' + str(systemstats))
              s.quit()
#*******Start Pump********** 
        if GPIO.input(Relay_s1) == 0 or GPIO.input(Relay_s2) == 0 or GPIO.input(Relay_s3) == 0:
          GPIO.output(Relay_pump, GPIO.LOW)
	
        print "Temperature de la piscine: " , pooltemp , " C"
        print "Temperature Ambiante: " , ambianttemp , " C"
        print "Temperature du systeme solaire 1: " , syst1temp , " C"
        print "Temperature du systeme solaire 2: " , syst2temp , " C"
        print "Temperature du systeme solaire 3: " , syst3temp , " C"


    # Stop on Ctrl+C and clean up GPIO pins
    except KeyboardInterrupt:        GPIO.cleanup()
#s.quit()