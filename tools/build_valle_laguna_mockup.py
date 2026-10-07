from PIL import Image, ImageDraw, ImageFont
import numpy as np

# 1. Cargar imágenes
mockup_path = r'C:\Users\alexm\.gemini\antigravity-ide\brain\227af393-f591-4d11-a4a8-e9f13f7f9399\.user_uploaded\media_1791311849627.png'
user_screen_path = r'C:\Users\alexm\.gemini\antigravity-ide\brain\227af393-f591-4d11-a4a8-e9f13f7f9399\.user_uploaded\media_1791320384326.png'

mockup = Image.open(mockup_path).convert('RGBA')
user_screen = Image.open(user_screen_path).convert('RGBA')

# Dimensiones exactas de la pantalla en el mockup:
x_left = 209
x_right = 581
screen_w = 372
y_top = 100
y_bottom = 934
screen_h = 834

# 2. Crear lienzo de pantalla blanco puro
screen_canvas = Image.new('RGBA', (screen_w, screen_h), (255, 255, 255, 255))

# Escalar la imagen del usuario para que quepa perfectamente
# Manteniendo 38px en la parte superior para notch/barra y 16px en la parte inferior
target_h = 780
scale = target_h / user_screen.height
target_w = int(user_screen.width * scale)

user_scaled = user_screen.resize((target_w, target_h), Image.Resampling.LANCZOS)
x_offset = (screen_w - target_w) // 2
y_offset = 38

# Pegar la imagen del usuario (100% intacta, sin tocar textos ni fotos)
screen_canvas.paste(user_scaled, (x_offset, y_offset), user_scaled)

draw = ImageDraw.Draw(screen_canvas)

# 3. Dibujar elementos nativos de WhatsApp en la barra superior
# Flecha atrás (<) nativa de WhatsApp
arr_x, arr_y = 15, 42
draw.line([(arr_x + 9, arr_y - 6), (arr_x + 2, arr_y), (arr_x + 9, arr_y + 6)], fill=(40, 40, 40, 255), width=2)
draw.line([(arr_x + 2, arr_y), (arr_x + 16, arr_y)], fill=(40, 40, 40, 255), width=2)

# Tres puntos verticales (⋮) a la derecha
dots_x = screen_w - 18
dots_y = 42
for dy in [-6, 0, 6]:
    draw.ellipse([dots_x - 1.5, dots_y + dy - 1.5, dots_x + 1.5, dots_y + dy + 1.5], fill=(40, 40, 40, 255))

# 4. Barra de estado nativa (Status Bar)
# Oreja izquierda: Hora "1:53"
try:
    font_time = ImageFont.truetype("arialbd.ttf", 12)
    font_small = ImageFont.truetype("arial.ttf", 10)
except:
    font_time = ImageFont.load_default()
    font_small = ImageFont.load_default()

draw.text((22, 11), "1:53", fill=(30, 30, 30, 255), font=font_time)

# Oreja derecha: Señal celular (4 barras), WiFi y Batería
# Señal celular
sig_x = screen_w - 68
for i in range(4):
    h = 3 + i * 2.5
    draw.rectangle([sig_x + i * 4, 19 - h, sig_x + i * 4 + 2.5, 19], fill=(30, 30, 30, 255))

# Icono WiFi (arcos / punto)
wifi_x = screen_w - 48
draw.arc([wifi_x - 6, 9, wifi_x + 6, 21], start=210, end=330, fill=(30, 30, 30, 255), width=2)
draw.arc([wifi_x - 3, 12, wifi_x + 3, 20], start=210, end=330, fill=(30, 30, 30, 255), width=2)
draw.ellipse([wifi_x - 1, 17, wifi_x + 1, 19], fill=(30, 30, 30, 255))

# Icono Batería (borde píldora + relleno)
bat_x = screen_w - 32
draw.rounded_rectangle([bat_x, 10, bat_x + 18, 19], radius=3, outline=(50, 50, 50, 255), width=1)
draw.rectangle([bat_x + 18, 12, bat_x + 19.5, 17], fill=(50, 50, 50, 255))
# Relleno de batería (~60%)
draw.rounded_rectangle([bat_x + 2, 12, bat_x + 11, 17], radius=1.5, fill=(30, 30, 30, 255))

# 5. Hardware Notch (Muesca superior del iPhone)
notch_w = 148
notch_h = 24
notch_left = (screen_w - notch_w) // 2

# Dibujar Notch negro puro con esquinas inferiores redondeadas
notch_box = [notch_left, 0, notch_left + notch_w, notch_h]
draw.rounded_rectangle(notch_box, radius=13, fill=(0, 0, 0, 255))

# Ranura del auricular
ear_w = 44
ear_h = 3.5
ear_x = notch_left + (notch_w - ear_w) // 2
ear_y = 6
draw.rounded_rectangle([ear_x, ear_y, ear_x + ear_w, ear_y + ear_h], radius=1.5, fill=(32, 32, 32, 255))

# Lente de cámara frontal
cam_x = ear_x + ear_w + 12
cam_y = ear_y + 2
draw.ellipse([cam_x - 3, cam_y - 3, cam_x + 3, cam_y + 3], fill=(20, 20, 35, 255))
draw.ellipse([cam_x - 1, cam_y - 1, cam_x + 1, cam_y + 1], fill=(8, 8, 18, 255))

# 6. Sutil reflejo de cristal fotorrealista sobre la pantalla (diagonal suave)
glare = Image.new('RGBA', (screen_w, screen_h), (0, 0, 0, 0))
glare_draw = ImageDraw.Draw(glare)
# Degradado diagonal sutil
for i in range(screen_w + screen_h):
    if 100 < i < 380:
        alpha = int(8 * (1 - abs(i - 240) / 140))
        glare_draw.line([(0, i), (i, 0)], fill=(255, 255, 255, max(0, alpha)), width=1)

screen_canvas = Image.alpha_composite(screen_canvas, glare)

# 7. Máscara de esquinas redondeadas de la pantalla física (radio 36px)
screen_mask = Image.new('L', (screen_w, screen_h), 0)
mask_draw = ImageDraw.Draw(screen_mask)
mask_draw.rounded_rectangle([0, 0, screen_w, screen_h], radius=36, fill=255)

# 8. Componer la pantalla dentro del teléfono sobre la mesa de madera
result = mockup.copy()
result.paste(screen_canvas, (x_left, y_top), screen_mask)

# 9. Guardar la imagen en máxima resolución
output_path = r'C:\Users\alexm\Proyectos\SitioWeb1.1\assets\images\whatsapp_business_valle_laguna_mockup.jpg'
result.convert('RGB').save(output_path, 'JPEG', quality=98)
print(f'Mockup fotorrealista completado con éxito en: {output_path}')
