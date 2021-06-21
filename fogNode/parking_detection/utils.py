from config import PARKING_ID
from colors import COLOR_RED
import re
import time
import cv2
import json
import sys
import paho.mqtt.client as mqtt
import threading

CAPTUR_IMG_DELAY   = 8000  
CLOUD_API_BASE_URL = "http://192.168.2.100:8080"
# MQTT_BROKER_CLOUD  = "fogpark.francecentral.cloudapp.azure.com"
MQTT_BROKER_CLOUD  = "192.168.2.1"
MQTT_BROKER_LOCAL  = "192.168.2.1"

def current_time_ms():
    return time.perf_counter_ns() / 1000000

def capture_image():
    start_time = current_time_ms()
    cam_index = 1 
    print("Staring Image Capture...")
    cam = cv2.VideoCapture(cam_index)
    while True:
        _, frame = cam.read()
        # simple delay, to solve camera issue
        duration = current_time_ms() - start_time
        if(duration >= CAPTUR_IMG_DELAY):
            cv2.imwrite("tmp.png", frame)
            print("Image Saved")
            break
    print("Finishing Image Capture...")
    cam.release()

def draw_contours(image,
                  coordinates,
                  label,
                  font_color,
                  border_color=COLOR_RED,
                  line_thickness=1,
                  font=cv2.FONT_HERSHEY_SIMPLEX,
                  font_scale=0.5):
    cv2.drawContours(image,
                         [coordinates],
                         contourIdx=-1,
                         color=border_color,
                         thickness=2,
                         lineType=cv2.LINE_8)
    moments = cv2.moments(coordinates)

    center = (int(moments["m10"] / moments["m00"]) - 3,
              int(moments["m01"] / moments["m00"]) + 3)

    cv2.putText(image,
                    label,
                    center,
                    font,
                    font_scale,
                    font_color,
                    line_thickness,
                    cv2.LINE_AA)

def publish(message, topic):
    try:    
        client=mqtt.Client("", True, None, mqtt.MQTTv31)
        client.connect(MQTT_BROKER_CLOUD, 1883)
        client.publish(topic, message)
        print("Message Sent to Cloud")
    except Exception as e:
        print("Error: Transmission failed (CLOUD)")

def publish_local(message, topic):
    try:    
        client=mqtt.Client("", True, None, mqtt.MQTTv31)
        client.connect(MQTT_BROKER_LOCAL, 1883)
        client.publish(topic, message)
        print("Message Sent to Gate")
    except Exception as e:
        print("Error: Transmission failed (LOCAL)")



def send_msg_treading_proto(t, m):
    thread = threading.Thread()
    # still