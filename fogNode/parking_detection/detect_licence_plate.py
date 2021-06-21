import re
import cv2
from tflite_runtime.interpreter import Interpreter
import pytesseract
import numpy as np
import requests
import json
from utils import publish_local
from utils import current_time_ms
from utils import CLOUD_API_BASE_URL
from config import PARKING_ID


CAMERA_WIDTH = 640
CAMERA_HEIGHT = 480
DETECTION_DELAY_MS = 500 # 1/2 second 
MEMORY_TIME = 60000 # 1 minute

def verify_licence_plate_number_cloud(licence):
    url = CLOUD_API_BASE_URL + "/parks/" + str(PARKING_ID) + "/verify"
    myobj = {'plate': licence}    
    try:
        response = requests.post(url, data = myobj)
        res = json.loads(response.text)
        command = "OPEN" if res['authorized'] else "CLOSE"  
        # publish MQTT command to ESP32
        publish_local(command, "fog/command")
    except Exception as e:
        print(e)

def load_labels(path='labels.txt'):
  """Loads the labels file. Supports files with or without index numbers."""
  with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()
    labels = {}
    for row_number, content in enumerate(lines):
      pair = re.split(r'[:\s]+', content.strip(), maxsplit=1)
      if len(pair) == 2 and pair[0].strip().isdigit():
        labels[int(pair[0])] = pair[1].strip()
      else:
        labels[row_number] = pair[0].strip()
  return labels

def set_input_tensor(interpreter, image):
  """Sets the input tensor."""
  tensor_index = interpreter.get_input_details()[0]['index']
  input_tensor = interpreter.tensor(tensor_index)()[0]
  input_tensor[:, :] = np.expand_dims((image-255)/255, axis=0)


def get_output_tensor(interpreter, index):
  """Returns the output tensor at the given index."""
  output_details = interpreter.get_output_details()[index]
  tensor = np.squeeze(interpreter.get_tensor(output_details['index']))
  return tensor


def detect_objects(interpreter, image, threshold):
  """Returns a list of detection results, each a dictionary of object info."""
  set_input_tensor(interpreter, image)
  interpreter.invoke()
  # Get all output details
  boxes = get_output_tensor(interpreter, 0)
  classes = get_output_tensor(interpreter, 1)
  scores = get_output_tensor(interpreter, 2)
  count = int(get_output_tensor(interpreter, 3))

  results = []
  for i in range(count):
    if scores[i] >= threshold:
      result = {
          'bounding_box': boxes[i],
          'class_id': classes[i],
          'score': scores[i]
      }
      results.append(result)
  return results

def main():
    labels = load_labels()
    interpreter = Interpreter('licence_plate_model.tflite')
    interpreter.allocate_tensors()
    _, input_height, input_width, _ = interpreter.get_input_details()[0]['shape']


    detection_start_time = current_time_ms()
    memory_start_time = current_time_ms()
    short_memory = set()
    cap = cv2.VideoCapture(0)
    while cap.isOpened():
        ret, frame = cap.read()
        if current_time_ms() - detection_start_time >= DETECTION_DELAY_MS:
          detection_start_time = current_time_ms()
          img = cv2.resize(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB), (320,320))
          res = detect_objects(interpreter, img, 0.7)
          for result in res:
              ymin, xmin, ymax, xmax = result['bounding_box']
              xmin = int(max(1,xmin * CAMERA_WIDTH))
              xmax = int(min(CAMERA_WIDTH, xmax * CAMERA_WIDTH))
              ymin = int(max(1, ymin * CAMERA_HEIGHT))
              ymax = int(min(CAMERA_HEIGHT, ymax * CAMERA_HEIGHT))
              cv2.rectangle(frame,(xmin, ymin),(xmax, ymax),(0,255,0),2)
              cv2.putText(frame,"Licence Plate",(xmin, min(ymax, CAMERA_HEIGHT-20)), cv2.FONT_HERSHEY_SIMPLEX, 0.5,(255,255,255),2,cv2.LINE_AA) 
              cropped = frame[ymin:ymax, xmin:xmax]
              # cv2.imshow('cropped', cropped)
              licence_number = pytesseract.image_to_string(cropped, config='--psm 11')
              licence_number = re.sub('[^0-9]', '', licence_number)
              print("Short Memory = " + str(short_memory))
              # call cloud server to verify licence plate (unique ones to prevent repition)
              if licence_number not in short_memory:
              	verify_licence_plate_number_cloud(str(licence_number))
              short_memory.add(licence_number)
        # empty set after 10 seconds
        if current_time_ms() - memory_start_time >= MEMORY_TIME:
          memory_start_time = current_time_ms()
          print("Reseting Short Memory")
          short_memory.clear()  

        cv2.imshow('Survillence Cam 1', frame)
        if cv2.waitKey(1) & 0xFF ==ord('q'):
            cap.release()
            cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
