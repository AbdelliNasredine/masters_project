import yaml
import cv2
import numpy as np

img = cv2.imread("./images/prototype1re.png")
img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
mask = np.zeros(img.shape, np.uint8)
ROIS = []
# reading parking postions
with open("./data/coordinates_1.yml", "r") as data:
    points = yaml.load(data)
    for point in points:
        print(point['id'])
        id = point['id']
        co = point["coordinates"]
        # drawing rectangle success
        # cv2.rectangle(img, (co[0][0], co[0][1]), (co[2][0], co[2][1]),
        #               (0, 255, 0),
        #               thickness=1)

        roi = img[co[0][0]:co[1][0], co[1][1]:co[2][1]]
        cv2.imshow("roi", roi)

        # darwing white rectangles in the mask
        # masked_img = cv2.drawContours(img.copy(), [co], id, 255, -1)

        # for i in range(0, 4):
        # print("p", i, " = ", point["coordinates"][i])

cv2.imshow("image", img)
# cv2.imshow("masked", masked_img)
cv2.waitKey(0)

cv2.destroyAllWindows()