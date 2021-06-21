import cv2
import argparse
import yaml
from coordinates_generator import CoordinatesGenerator
from parking_spots_detector import ParkingSpotDetector
from colors import *
from utils import current_time_ms
from utils import capture_image
import logging
import time


def main():

    args = parse_args()
    step = args.step

    # SETP 1 : STATIC COORDINATES GENRETATION
    # STEP 2 : PARKING SPOT STATUS DETECTION 

    if int(step) == 1:
        # take a capture from camera and save it (tmp.png)
        capture_image()
        # start cordinate generator with saved image
        with open("data/coordinates.yml", "w+") as points:
            generator = CoordinatesGenerator("tmp.png", points, COLOR_RED)
            generator.generate()
    elif int(step) == 2:
        # load coordinate data from file
        with open("data/coordinates.yml", "r") as data:
            points = yaml.load(data)
            camera_index = 0
            detector = ParkingSpotDetector(camera_index, points)
            detector.detect_motion()
    else:
        # Error : STEP ARG IS NOT SPICIFIED
        print("Please specify the value (1 or 2) of STEP using --step [1|2]") 

def parse_args():
    parser = argparse.ArgumentParser(description='Parking Spots Detector')
    parser.add_argument("--step",
                        dest="step",
                        required=True,
                        help="Step : step 1 (coordinate generation) or step 2 (video detection)")
    return parser.parse_args()


if __name__ == '__main__':
    main()
