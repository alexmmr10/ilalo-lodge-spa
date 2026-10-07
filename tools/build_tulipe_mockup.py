import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def build_tulipe_mockup():
    mockup_path = r'C:\Users\alexm\.gemini\antigravity-ide\brain\227af393-f591-4d11-a4a8-e9f13f7f9399\.user_uploaded\media_1791382686093.png'
    base_mockup_path = r'C:\Users\alexm\.gemini\antigravity-ide\brain\227af393-f591-4d11-a4a8-e9f13f7f9399\.user_uploaded\media_1791311849627.png'

    mockup = Image.open(base_mockup_path).convert('RGBA')
    raw_user = Image.open(mockup_path).convert('RGBA')

    # Phone screen bounds in base mockup
    x_left = 209
    x_right = 581
    screen_w = 372
    y_top = 100
    screen_h = 840

    # 1. Screen Canvas (Pure White background)
    screen_canvas = Image.new('RGBA', (screen_w, screen_h), (255, 255, 255, 255))

    # 2. Extract clean circular logo from raw screenshot
    center_x = 108
    center_y = 97
    radius = 31
    logo_square = raw_user.crop((center_x - radius, center_y - radius, center_x + radius, center_y + radius))
    
    # Scale logo cleanly
    logo_target_size = 78
    logo_scaled = logo_square.resize((logo_target_size, logo_target_size), Image.Resampling.LANCZOS)
    
    logo_mask = Image.new('L', (logo_target_size, logo_target_size), 0)
    draw_lmask = ImageDraw.Draw(logo_mask)
    draw_lmask.ellipse([0, 0, logo_target_size, logo_target_size], fill=255)

    # 3. Extract profile body (from y=140 to y=965: title, phone, buttons, info, map, facebook, instagram)
    body_crop = raw_user.crop((0, 140, 460, 965))
    
    # Scale body to fit screen width exactly
    body_w = screen_w
    scale = body_w / body_crop.width
    body_h = int(body_crop.height * scale)
    body_scaled = body_crop.resize((body_w, body_h), Image.Resampling.LANCZOS)

    # 4. Paste centered logo in header and profile body
    logo_x = (screen_w - logo_target_size) // 2
    logo_y = 35 # positioned comfortably below notch
    screen_canvas.paste(logo_scaled, (logo_x, logo_y), logo_mask)

    # Body position
    body_y = logo_y + logo_target_size + 12
    screen_canvas.paste(body_scaled, (0, body_y), body_scaled)

    draw = ImageDraw.Draw(screen_canvas)

    # Subtle circular outline for the avatar
    draw.ellipse([logo_x, logo_y, logo_x + logo_target_size, logo_y + logo_target_size], outline=(225, 225, 225, 255), width=1)

    # 5. WhatsApp Navigation Bar Icons
    # Left back arrow (<)
    arr_x, arr_y = 16, 44
    draw.line([(arr_x + 9, arr_y - 6), (arr_x + 2, arr_y), (arr_x + 9, arr_y + 6)], fill=(40, 40, 40, 255), width=2)
    draw.line([(arr_x + 2, arr_y), (arr_x + 16, arr_y)], fill=(40, 40, 40, 255), width=2)

    # Right three dots (⋮)
    dots_x = screen_w - 18
    dots_y = 44
    for dy in [-6, 0, 6]:
        draw.ellipse([dots_x - 1.5, dots_y + dy - 1.5, dots_x + 1.5, dots_y + dy + 1.5], fill=(40, 40, 40, 255))

    # 6. Status Bar (Time, Signal, WiFi, Battery)
    try:
        font_time = ImageFont.truetype("arialbd.ttf", 12)
    except:
        font_time = ImageFont.load_default()

    # Time "1:32" (exact time from user screenshot)
    draw.text((22, 11), "1:32", fill=(30, 30, 30, 255), font=font_time)

    # Cellular signal (4 bars)
    sig_x = screen_w - 68
    for i in range(4):
        h = 3 + i * 2.5
        draw.rectangle([sig_x + i * 4, 19 - h, sig_x + i * 4 + 2.5, 19], fill=(30, 30, 30, 255))

    # WiFi icon
    wifi_x = screen_w - 48
    draw.arc([wifi_x - 6, 9, wifi_x + 6, 21], start=210, end=330, fill=(30, 30, 30, 255), width=2)
    draw.arc([wifi_x - 3, 12, wifi_x + 3, 20], start=210, end=330, fill=(30, 30, 30, 255), width=2)
    draw.ellipse([wifi_x - 1, 17, wifi_x + 1, 19], fill=(30, 30, 30, 255))

    # Battery icon (~52% as in screenshot)
    bat_x = screen_w - 32
    draw.rounded_rectangle([bat_x, 10, bat_x + 18, 19], radius=3, outline=(50, 50, 50, 255), width=1)
    draw.rectangle([bat_x + 18, 12, bat_x + 19.5, 17], fill=(50, 50, 50, 255))
    draw.rounded_rectangle([bat_x + 2, 12, bat_x + 10, 17], radius=1.5, fill=(30, 30, 30, 255))

    # 7. Hardware Notch
    notch_w = 148
    notch_h = 24
    notch_left = (screen_w - notch_w) // 2
    draw.rounded_rectangle([notch_left, 0, notch_left + notch_w, notch_h], radius=13, fill=(0, 0, 0, 255))

    # Ear speaker slit
    ear_w = 44
    ear_h = 3.5
    ear_x = notch_left + (notch_w - ear_w) // 2
    ear_y = 6
    draw.rounded_rectangle([ear_x, ear_y, ear_x + ear_w, ear_y + ear_h], radius=1.5, fill=(32, 32, 32, 255))

    # Front camera lens
    cam_x = ear_x + ear_w + 12
    cam_y = ear_y + 2
    draw.ellipse([cam_x - 3, cam_y - 3, cam_x + 3, cam_y + 3], fill=(20, 20, 35, 255))
    draw.ellipse([cam_x - 1, cam_y - 1, cam_x + 1, cam_y + 1], fill=(8, 8, 18, 255))

    # 8. Subtle glass glare
    glare = Image.new('RGBA', (screen_w, screen_h), (0, 0, 0, 0))
    glare_draw = ImageDraw.Draw(glare)
    for i in range(screen_w + screen_h):
        if 100 < i < 380:
            alpha = int(7 * (1 - abs(i - 240) / 140))
            glare_draw.line([(0, i), (i, 0)], fill=(255, 255, 255, max(0, alpha)), width=1)
    screen_canvas = Image.alpha_composite(screen_canvas, glare)

    # 9. Screen rounded corner mask (radius 38)
    screen_mask = Image.new('L', (screen_w, screen_h), 0)
    mask_draw = ImageDraw.Draw(screen_mask)
    mask_draw.rounded_rectangle([0, 0, screen_w, screen_h], radius=38, fill=255)

    # 10. Composite onto base mockup
    result = mockup.copy()
    result.paste(screen_canvas, (x_left, y_top), screen_mask)

    # 11. Save outputs
    output_workspace = r'C:\Users\alexm\Proyectos\SitioWeb1.1\assets\images\tulipe_love_glamping_mockup.jpg'
    output_short = r'C:\Users\alexm\Proyectos\SitioWeb1.1\assets\images\tulipe_love_mockup.jpg'
    output_artifact = r'C:\Users\alexm\.gemini\antigravity-ide\brain\227af393-f591-4d11-a4a8-e9f13f7f9399\tulipe_love_glamping_mockup.jpg'

    rgb_result = result.convert('RGB')
    rgb_result.save(output_workspace, 'JPEG', quality=98)
    rgb_result.save(output_short, 'JPEG', quality=98)
    rgb_result.save(output_artifact, 'JPEG', quality=98)

    print(f"Mockup generado con éxito en:\n1. {output_workspace}\n2. {output_short}\n3. {output_artifact}")

if __name__ == '__main__':
    build_tulipe_mockup()
