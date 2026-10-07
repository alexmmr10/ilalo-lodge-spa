import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

mockup_path = r'C:\Users\alexm\.gemini\antigravity-ide\brain\227af393-f591-4d11-a4a8-e9f13f7f9399\.user_uploaded\media_1791311849627.png'
user_screen_path = r'C:\Users\alexm\.gemini\antigravity-ide\brain\227af393-f591-4d11-a4a8-e9f13f7f9399\.user_uploaded\media_1791382686093.png'

mockup = Image.open(mockup_path).convert('RGBA')
user_screen = Image.open(user_screen_path).convert('RGBA')

# Screen coordinates in base mockup
x_left = 209
x_right = 581
screen_w = 372
y_top = 100
y_bottom = 934
screen_h = 834

print(f"Loaded mockup: {mockup.size}, user_screen: {user_screen.size}")
