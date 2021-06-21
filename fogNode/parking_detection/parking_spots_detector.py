import cv2 as open_cv
import numpy as np
import logging
import imutils
from utils import draw_contours
from utils import current_time_ms
from utils import publish
from utils import publish_local
from colors import COLOR_GREEN, COLOR_WHITE, COLOR_BLUE
from config import PARKING_ID


class ParkingSpotDetector:
    AREA_RATIO = 0.5
    LAPLACIAN = 1.4
    DETECT_DELAY = 1
    PUBLISH_DALY_MS = 1000
    DEBUG = True

    def __init__(self, video, coordinates):
        self.video = video if video is not None else 0
        self.coordinates_data = coordinates
        self.start_frame = 0
        self.contours = []
        self.bounds = []
        self.mask = []
        if ParkingSpotDetector.DEBUG:
            print("--cordinates")
            print(coordinates)

    def detect_motion(self):
        capture = open_cv.VideoCapture(self.video)
        capture.set(open_cv.CAP_PROP_POS_FRAMES, self.start_frame)

        coordinates_data = self.coordinates_data
        logging.debug("coordinates data: %s", coordinates_data)

        for p in coordinates_data:
            coordinates = self._coordinates(p)
            logging.debug("coordinates: %s", coordinates)

            rect = open_cv.boundingRect(coordinates)
            logging.debug("rect: %s", rect)
            # print(rect)
            # print("\n")
            new_coordinates = coordinates.copy()
            new_coordinates[:, 0] = coordinates[:, 0] - rect[0]
            new_coordinates[:, 1] = coordinates[:, 1] - rect[1]
            logging.debug("new_coordinates: %s", new_coordinates)

            self.contours.append(coordinates)
            self.bounds.append(rect)

            mask = open_cv.drawContours(np.zeros((rect[3], rect[2]),
                                                 dtype=np.uint16),
                                        [new_coordinates],
                                        contourIdx=-1,
                                        color=255,
                                        thickness=-1,
                                        lineType=open_cv.LINE_8)
            # print(mask)
            mask = mask == 255
            # print(mask)
            self.mask.append(mask)
            logging.debug("mask: %s", self.mask)
        statuses = [False] * len(coordinates_data)
        times = [None] * len(coordinates_data)

        start_time = current_time_ms()
        while capture.isOpened():
            detection_delay = current_time_ms()
            result, frame = capture.read()
            if frame is None:
                break

            if not result:
                raise CaptureReadError(
                    "Error reading video capture on frame %s" % str(frame))

            #open_cv.imshow("i1", frame)

            blurred = open_cv.GaussianBlur(frame.copy(), (5, 5), 3)
            #open_cv.imshow("i2", blurred)

            grayed = open_cv.cvtColor(blurred, open_cv.COLOR_BGR2GRAY)
            #open_cv.imshow("i3", grayed)

            new_frame = frame.copy()
            logging.debug("new_frame: %s", new_frame)

            position_in_seconds = capture.get(
                open_cv.CAP_PROP_POS_MSEC) / 1000.0

            for index, c in enumerate(coordinates_data):
                status = self.__apply(grayed, index, c)

                if times[index] is not None and self.same_status(
                        statuses, index, status):
                    times[index] = None
                    continue

                if times[index] is not None and self.status_changed(
                        statuses, index, status):
                    if position_in_seconds - times[
                            index] >= ParkingSpotDetector.DETECT_DELAY:
                        statuses[index] = status
                        times[index] = None
                    continue

                if times[index] is None and self.status_changed(
                        statuses, index, status):
                    times[index] = position_in_seconds

            result = ""
            empty = 0
            full = 0

            for index, p in enumerate(coordinates_data):
                coordinates = self._coordinates(p)
                color = (0, 0, 255) if statuses[index] else COLOR_GREEN
                draw_contours(new_frame, coordinates, str(p["id"] + 1),
                              COLOR_WHITE, color)
                status = color == COLOR_GREEN
                if status:
                    empty += 1
                else:
                    full += 1
                spot = str(p["id"] + 1) + "," + \
                    ("FREE" if color == COLOR_GREEN else "OCCUPAID")
                result += spot + " "
            if ParkingSpotDetector.DEBUG:
                print(result)
            if current_time_ms() - start_time >= ParkingSpotDetector.PUBLISH_DALY_MS:
                start_time = current_time_ms()
                #publish(str(result), "parking/" + str(PARKING_ID))
                #publish_local("FREE "+str(empty)+" - FULL "+str(full),"fog/spots")
            result = ""

            open_cv.imshow("Survillence Cam 2", new_frame)
            k = open_cv.waitKey(1)
            if k == ord("q"):
                break
            detection_delay = current_time_ms() - detection_delay
            print("Detection dely time = " + str(detection_delay) + " ms ")
        capture.release()
        open_cv.destroyAllWindows()

    def __apply(self, grayed, index, p):
        coordinates = self._coordinates(p)
        logging.debug("points: %s", coordinates)

        rect = self.bounds[index]
        logging.debug("rect: %s", rect)

        roi_gray = grayed[rect[1]:(rect[1] + rect[3]),
                          rect[0]:(rect[0] + rect[2])]
        # open_cv.imshow("i5", roi_gray)
        # OLD METHOD
        # laplacian = open_cv.Laplacian(roi_gray, open_cv.CV_64F)
        # logging.debug("laplacian: %s", laplacian)
        # l1 = open_cv.convertScaleAbs(laplacian)
        # status = np.mean(np.abs(
        #     laplacian * self.mask[index])) < ParkingSpotDetector.LAPLACIAN
        # logging.debug("status: %s", status)

        # NEW MEDTHOD
        ret, thresh = open_cv.threshold(
            roi_gray, 150, 255, open_cv.THRESH_BINARY)
        #open_cv.imshow("tresh" + str(index), thresh)

        canny = open_cv.Canny(roi_gray, 10, 200)
        #open_cv.imshow("canny" + str(index), canny)

        cnts = open_cv.findContours(
            canny.copy(), open_cv.RETR_EXTERNAL, open_cv.CHAIN_APPROX_SIMPLE)
        cnts = imutils.grab_contours(cnts)
        cnts = sorted(cnts, key=open_cv.contourArea, reverse=True)[:1]
        if len(cnts) == 0:
            return False
        x, y, w, h = open_cv.boundingRect(cnts[0])
        area1 = w * h
        area2 = rect[2] * rect[3]
        ratio = area1 / area2
        if ParkingSpotDetector.DEBUG:
            # print("x1 = " + str(x) + ", y1 = " + str(y) + ", w = " + str(w) + ", h = " + str(h))
            # print("x1 = " + str(rect[0]) + ", y1 = " + str(rect[1]) + ", w = " + str(rect[2]) + ", h = " + str(rect[3]))
            print("ID = " + str(index) + ", ratio = " + str(area1 / area2))
            #open_cv.rectangle(roi_gray, (x,y), (x+w, y+h), (0,0,0), 2)
            #open_cv.imshow("roi" + str(index), roi_gray)

        coordinates[:, 0] = coordinates[:, 0] - rect[0]
        coordinates[:, 1] = coordinates[:, 1] - rect[1]

        status = ratio >= ParkingSpotDetector.AREA_RATIO

        return status

    @staticmethod
    def _coordinates(p):
        return np.array(p["coordinates"])

    @staticmethod
    def same_status(coordinates_status, index, status):
        return status == coordinates_status[index]

    @staticmethod
    def status_changed(coordinates_status, index, status):
        return status != coordinates_status[index]


class CaptureReadError(Exception):
    pass
