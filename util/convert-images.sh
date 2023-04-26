#!/bin/sh

convert ./artworks/icon.png -density 144 -units PixelsPerInch -geometry 128x128 ./src/images/icon-128.png
convert ./artworks/icon.png -density 144 -units PixelsPerInch -geometry 48x48 ./src/images/icon-48.png
convert ./artworks/icon.png -density 144 -units PixelsPerInch -geometry 32x32 ./src/images/icon-32.png
convert ./artworks/icon.png -density 144 -units PixelsPerInch -geometry 16x16 ./src/images/icon-16.png

convert ./artworks/action_dark_ui.png -density 144 -units PixelsPerInch -geometry 48x48 ./src/images/action_dark_ui-48.png
convert ./artworks/action_dark_ui.png -density 144 -units PixelsPerInch -geometry 32x32 ./src/images/action_dark_ui-32.png
convert ./artworks/action_dark_ui.png -density 144 -units PixelsPerInch -geometry 24x24 ./src/images/action_dark_ui-24.png
convert ./artworks/action_dark_ui.png -density 144 -units PixelsPerInch -geometry 16x16 ./src/images/action_dark_ui-16.png

convert ./artworks/action_light_ui.png -density 144 -units PixelsPerInch -geometry 48x48 ./src/images/action_light_ui-48.png
convert ./artworks/action_light_ui.png -density 144 -units PixelsPerInch -geometry 32x32 ./src/images/action_light_ui-32.png
convert ./artworks/action_light_ui.png -density 144 -units PixelsPerInch -geometry 24x24 ./src/images/action_light_ui-24.png
convert ./artworks/action_light_ui.png -density 144 -units PixelsPerInch -geometry 16x16 ./src/images/action_light_ui-16.png
