/**
 * ILALÓ LODGE & SPA™ · CLIENT LOGIC, THEME MANAGER, I18N & BOOKING ENGINE
 * Developer & Architect: Dev.Alex (dev.alex.pro)
 * Standard: devalex-web-mastery (Defensive Security, Zero innerHTML with dynamic data)
 * Inspired by Luxury Lodge & Spa standards (El Jardín Lodge & Spa™)
 */

'use strict';

/* ---------------------------------------------------------
   1. EARLY INITIALIZATION (ANTI-FLICKER THEME & LANGUAGE)
   --------------------------------------------------------- */
(function initPreferences() {
  try {
    const savedTheme = localStorage.getItem('ilalo_theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }

    const savedLang = localStorage.getItem('ilalo_lang');
    if (savedLang === 'en') {
      document.documentElement.setAttribute('lang', 'en');
    } else {
      document.documentElement.setAttribute('lang', 'es');
    }
  } catch (e) {
    // Fallback gracefully if storage is restricted
  }
})();

/* ---------------------------------------------------------
   2. BILINGUAL I18N DICTIONARY (SPANISH & ENGLISH)
   --------------------------------------------------------- */
const TRANSLATIONS = {
  es: {
    // Meta & Document
    doc_title: 'ILALÓ LODGE & SPA™ · Hotel de Naturaleza, Cabañas & Domos en Ecuador',
    // Announcement Ribbon
    announcement_badge: 'Promoción Directa',
    announcement_text: '¡Reserva en línea 👉 $124 por persona | Desayuno de campo & Circuito Spa incluidos!',
    announcement_cta: 'Ver Disponibilidad >',
    // Header & Logo
    logo_subtitle: 'HOTEL DE NATURALEZA · ECUADOR',
    nav_sanctuary: 'El Santuario',
    nav_domes: 'Cabañas & Domos',
    nav_spa: 'Spa & Bienestar',
    nav_packages: 'Paquetes',
    nav_gastronomy: 'Restaurante & Bar',
    nav_experiences: 'Excursiones',
    nav_location: 'Ubicación',
    nav_faq: 'Políticas & FAQ',
    nav_reserve: 'Reservar Ahora',
    nav_reserve_drawer: 'Cotizar Estadía',
    nav_drawer_sub: 'Atención personalizada 24/7 · Valle de Tumbaco, Quito',
    nav_gallery: 'GALERÍA',
    footer_nav_gallery: 'Galería Fotográfica',
    gallery_badge: 'GALERÍA EXCLUSIVA',
    gallery_title: 'Postales de Nuestro Santuario en el Ilaló',
    gallery_desc: 'Explora los rincones, atardeceres dorados, tinas humeantes y noches estrelladas que te esperan en tu próxima escapada.',
    // Theme & Lang labels
    theme_to_light: 'Cambiar a tema claro',
    theme_to_dark: 'Cambiar a tema oscuro',
    lang_toggle_title: 'Switch to English',
    lang_label: 'EN',
    // El Jardín Lodge Layout Keys
    nav_home: 'INICIO',
    hero_pill_btn: 'Ver Disponibilidad',
    hero_cta_explore: 'Explorar Cabañas',
    // Sticky bar
    sticky_from: 'Tarifa desde:',
    sticky_btn: 'Reservar Ahora',
    hero_headline: 'Hotel Destino en el Volcán Ilaló con cabañas y domos privados, vistas al valle y experiencias auténticas, a solo 25 minutos de Quito.',
    split_1_eyebrow: 'ALOJAMIENTO',
    split_1_title: 'CABAÑAS PRIVADAS',
    split_1_desc: 'Experimenta vistas panorámicas que te transportan a la belleza única de los Andes. Cada habitación es un espacio diseñado para ofrecer no solo comodidad sino también una conexión auténtica con la Naturaleza.',
    split_1_btn: 'VER CABAÑAS',
    split_2_eyebrow: 'GASTRONOMÍA',
    split_2_title: 'EL HUERTO RESTAURANTE',
    split_2_desc: 'Es un refugio gastronómico que te sumerge en la esencia de la cocina con identidad. Cada plato es una maravillosa combinación de sabores auténticos y texturas sorprendentes cosechados directamente en nuestra huerta andina.',
    split_2_btn: 'VER DETALLES',
    // Hero Section
    hero_pill: 'Hotel de Naturaleza & Spa · A 25 min de Quito',
    hero_title: 'Conéctate con la Magia del Ilaló y el Cielo Andino',
    hero_subtitle: 'Cabañas geodésicas de lujo privado, tinas nórdicas de cedro con hidromasaje caliente, santuario de spa holístico y alta gastronomía orgánica con vistas al valle de Tumbaco.',
    hero_cta_reserve: 'Consultar Disponibilidad',
    hero_cta_explore: 'Explorar Cabañas & Domos',
    hero_perk_tub: 'Tina Nórdica Privada en Cada Domo',
    hero_perk_breakfast: 'Desayuno de Huerto Incluido',
    hero_perk_vat: 'Turistas Extranjeros Exentos de 15% IVA',
    // Hero Quick Search
    search_checkin: 'Llegada (Check-in)',
    search_checkout: 'Salida (Check-out)',
    search_guests: 'Huéspedes',
    search_category: 'Tipo de Suite / Domo',
    search_btn: 'Consultar Tarifas',
    opt_guests_2: '2 Adultos (Pareja)',
    opt_guests_3: '3 Personas',
    opt_guests_1: '1 Persona (Retiro)',
    opt_dome_master: 'Volcán Master Suite & Spa',
    opt_dome_const: 'Constelaciones Deluxe Dome',
    opt_dome_forest: 'Bosque Nativo Eco-Lodge',
    // Sanctuary Section
    sanctuary_badge: 'Santuario Andino',
    sanctuary_title: 'Un Refugio de Paz y Bienestar en las Laderas del Volcán',
    sanctuary_desc_1: 'Inspirado en la serenidad de los lodges de naturaleza más exclusivos de Sudamérica, ILALÓ LODGE & SPA™ fue concebido como un santuario privado donde el lujo contemporáneo dialoga en absoluta armonía con la energía milenaria del Volcán Ilaló.',
    sanctuary_desc_2: 'Rodeado de más de 12 hectáreas de bosque andino nativo, senderos de silencio y aire puro de montaña, aquí el tiempo se detiene para permitirte renovar tus sentidos con tinas termales calientes al aire libre, spa de terapias ancestrales y cocina del huerto orgánico.',
    stat_altitude: 'Microclima templado privilegiado',
    stat_area: 'Bosque andino protegido y privado',
    stat_privacy: 'Tinas de hidromasaje y decks individuales',
    stat_dist: 'De Quito y Aeropuerto Mariscal Sucre',
    sanctuary_cap_1_title: 'Hidroterapia en Cedro Aromático',
    sanctuary_cap_1_sub: 'Agua caliente a 38°C con sales minerales volcánicas',
    sanctuary_cap_2_title: 'Arquitectura Geodésica de Lujo',
    sanctuary_cap_2_sub: 'Aislamiento acústico y térmico con vistas al cielo',
    // Domes Section
    domes_badge: 'Alojamiento Boutique',
    domes_title: 'Nuestras Cabañas & Domos Privados',
    domes_desc: 'Cada unidad cuenta con terraza privada suspendida sobre el valle, tina nórdica caliente de cedro con hidromasaje exclusivo, chimenea a leña y vistas panorámicas despejadas.',
    card_tag_popular: 'Suite Signature',
    card_tag_stargazing: 'Stargazing View',
    card_tag_nature: 'Inmersión Natural',
    tag_price_master: 'Desde $195',
    tag_price_const: 'Desde $165',
    tag_price_forest: 'Desde $145',
    dome_master_badge: 'Suite Principal con Spa',
    dome_master_title: 'Volcán Master Suite & Spa',
    dome_master_spec: 'Capacidad 2-3 Huéspedes · 48 m² · Cama King Size',
    amenity_deck_tub: 'Jacuzzi de Cedro en Deck',
    amenity_fireplace: 'Chimenea Nórdica de Leña',
    amenity_view_360: 'Vista Panorámica 360°',
    amenity_minibar: 'Minibar Gourmet & Cava',
    dome_const_badge: 'Domo Astronómico',
    dome_const_title: 'Constelaciones Deluxe Dome',
    dome_const_spec: 'Capacidad 2 Huéspedes · 42 m² · Cama Queen Size',
    amenity_stargaze_roof: 'Techo Panorámico Estelar',
    amenity_telescope: 'Telescopio Astronómico',
    amenity_alpaca: 'Ropa de Cama en Alpaca',
    amenity_bath_panoramic: 'Baño Panorámico & Tina',
    dome_forest_badge: 'Eco-Lodge & Jardines',
    dome_forest_title: 'Bosque Nativo Eco-Lodge',
    dome_forest_spec: 'Capacidad 2 Huéspedes · 38 m² · Cama Queen Size · Pet Friendly',
    amenity_sunken_tub: 'Tina de Cedro Sumergida',
    amenity_catamaran: 'Red Catamarán al Vacío',
    amenity_firepit: 'Fogata de Piedra Privada',
    amenity_aromatherapy: 'Aromaterapia de Bosque',
    btn_select: 'Reservar Suite',
    per_night: 'USD / por noche (desde $124/pers)',
    hint_watch_video: '▶ Ver Video & 360°',
    tag_video_tour: 'Tour en Video',
    vis_badge: 'Experiencia Inmersiva',
    vis_sub: 'Explora cada perspectiva del domo: mueve el cursor o desliza para sentir la profundidad 3D.',
    p_video: '▶ Video Tour HD',
    p_exterior: 'Exterior & Deck',
    p_interior: 'Suite & Chimenea',
    p_spa: 'Spa & Tina',
    p_gastro: 'Gastronomía',
    vis_rate_label: 'Tarifa por noche:',
    vis_book_btn: 'Cotizar Este Domo',
    // Spa Section
    spa_badge: 'Santuario de Bienestar',
    spa_title: 'Spa Termal & Terapias Holísticas',
    spa_desc: 'Diseñado para restaurar el equilibrio vital mediante el poder curativo de las aguas termales, piedras volcánicas calientes y esencias botánicas del huerto.',
    spa_item_1_title: 'Circuito Hidrotermal en Cedro',
    spa_item_1_desc: 'Tinas nórdicas artesanales a 38°C con sales minerales volcánicas ricas en azufre y magnesio, ubicadas en terrazas privadas con vista al atardecer andino.',
    spa_p1_b1: '✓ Agua renovada para cada huésped',
    spa_p1_b2: '✓ Infusión de eucalipto y arrayán',
    spa_item_2_title: 'Masajes con Piedras Volcánicas',
    spa_item_2_desc: 'Terapia descontracturante para parejas o individual de 60/90 minutos. Las piedras de basalto absorben tensiones musculares y transmiten calor profundo.',
    spa_p2_b1: '✓ Terapeutas certificadas en sitio',
    spa_p2_b2: '✓ Aceites orgánicos de lavanda y jojoba',
    spa_item_3_title: 'Baño de Vapor & Aromaterapia',
    spa_item_3_desc: 'Ritual de desintoxicación celular con vapor de hierbas andinas recolectadas en nuestros jardines. Purifica vías respiratorias y revitaliza la piel.',
    spa_p3_b1: '✓ Hierbas medicinales frescas',
    spa_p3_b2: '✓ Ducha fría de contraste revitalizante',
    spa_item_4_title: 'Solárium & Barra de Té Andino',
    spa_item_4_desc: 'Área de reposo con camastros ergonómicos, mantas de lana suave y servicio ilimitado de infusiones orgánicas, té de cedrón, menta y fruta deshidratada.',
    spa_p4_b1: '✓ Acceso incluido para huéspedes',
    spa_p4_b2: '✓ Vistas panorámicas hacia el Cotopaxi',
    spa_banner_title: '¿Deseas personalizar tu circuito de spa?',
    spa_banner_sub: 'Agrega paquetes de masajes en pareja o exfoliaciones botánicas directamente en tu reserva.',
    spa_banner_btn: 'Cotizar con Spa Incluido',
    // Packages Section
    packages_badge: 'Experiencias Completas',
    packages_title: 'Paquetes & Escapadas Todo Incluido',
    packages_desc: 'Diseñados para celebraciones de aniversario, propuestas de matrimonio o retiros de reconexión sin preocuparte por ningún detalle.',
    pkg_1_tag: 'El Más Escogido',
    pkg_1_title: 'Escapada Romántica & Suite',
    pkg_1_sub: '1 Noche para 2 Personas en Volcán Master Suite',
    pkg_1_f1: '✓ Tina nórdica de cedro privada con sales y pétalos',
    pkg_1_f2: '✓ Cena romántica gourmet de 3 tiempos a la luz de las velas',
    pkg_1_f3: '✓ 1 Botella de espumante o vino de autor de bienvenida',
    pkg_1_f4: '✓ Desayuno artesanal del huerto servido en la terraza',
    pkg_1_f5: '✓ Fogata nocturna privada con kit para asar malvaviscos',
    pkg_1_f6: '✓ Late Check-out especial hasta las 13:00 hrs',
    pkg_2_tag: 'Reconexión Total',
    pkg_2_title: 'Retiro Spa & Wellness Total',
    pkg_2_sub: '1 Noche para 2 Personas con Terapias Incluidas',
    pkg_2_f1: '✓ Alojamiento en Domo Suite con hidromasaje privado',
    pkg_2_f2: '✓ 2 Masajes corporales completos de 60 min con piedras calientes',
    pkg_2_f3: '✓ Circuito hidrotermal en tina con sales minerales volcánicas',
    pkg_2_f4: '✓ Sesión de aromaterapia y baño de vapor herbal',
    pkg_2_f5: '✓ Tabla de quesos madurados, frutos secos e infusiones orgánicas',
    pkg_2_f6: '✓ Desayuno saludable campestre con frutas andinas',
    pkg_3_tag: 'Naturaleza Activa',
    pkg_3_title: 'Aventura & Cumbre Ilaló',
    pkg_3_sub: '2 Noches de Inmersión Andina para 2 Personas',
    pkg_3_f1: '✓ 2 Noches en Constelaciones Dome o Bosque Nativo',
    pkg_3_f2: '✓ Guía privado de senderismo hasta la cruz y mirador 360° del Ilaló',
    pkg_3_f3: '✓ Canasta gourmet de picnic andino para la cumbre',
    pkg_3_f4: '✓ Acceso ilimitado a tina caliente y fogata con leña de eucalipto',
    pkg_3_f5: '✓ Sesión nocturna de observación astronómica con telescopio',
    pkg_3_f6: '✓ 2 Desayunos de cortesía completos para ambos días',
    pkg_select_btn: 'Elegir Paquete',
    // Gastronomy Section
    gastro_badge: 'Cocina de Origen & Huerto',
    gastro_title: 'Sabores del Valle de Tumbaco & Cava Andina',
    gastro_desc: 'Nuestro restaurante "El Huerto del Ilaló" fusiona las tradiciones culinarias de la serranía ecuatoriana con técnicas modernas de autor, utilizando vegetales y hierbas cosechados diariamente en nuestra propia huerta orgánica.',
    gastro_item_1_title: 'Desayuno Campestre de Cortesía:',
    gastro_item_1_text: ' Pan artesanal horneado a la leña, huevos de campo orgánicos, quesos frescos andinos, mermeladas caseras de mora silvestre y café arábica de altura.',
    gastro_item_2_title: 'Cenas Románticas Privadas en Terraza:',
    gastro_item_2_text: ' Menú de 3 tiempos con opciones como medallones de lomo fino al romero volcánico, trucha andina fresca en mantequilla de almendras y risotto de setas del bosque.',
    gastro_item_3_title: 'Cava de Vinos & Coctelería Botánica:',
    gastro_item_3_text: ' Maridajes con bodegas seleccionadas sudamericanas, cervezas artesanales de los valles y cócteles con macerados de hierbas aromáticas locales.',
    gastro_cta: 'Agregar Cena Gourmet a Mi Reserva',
    gastro_media_badge: 'Servicio Privado en Terraza',
    // Experiences & Excursions
    exp_badge: 'Ecoturismo & Descubrimiento',
    exp_title: 'Excursiones & Aventuras en el Entorno',
    exp_desc: 'Ubicado en un punto estratégico entre Quito y los valles termales, nuestro lodge es el punto de partida perfecto para explorar la naturaleza andina.',
    exp_3_title: 'Ascenso a la Cruz del Ilaló',
    exp_3_desc: 'Senderismo guiado o autoguiado por senderos ecológicos hasta la cumbre (3,185 msnm). Mirador de 360° hacia los valles de Tumbaco, Los Chillos y volcanes nevados.',
    exp_1_title: 'Ruta de Fuentes Termales',
    exp_1_desc: 'Visita guiada a las vertientes termales milenarias de La Merced y El Tingo que brotan de las profundidades del volcán, famosas por sus propiedades terapéuticas.',
    exp_2_title: 'Fogata Andina & Astronomía',
    exp_2_desc: 'Noches mágicas de fogata con leña de eucalipto aromático, cata de vinos sudamericanos y sesión guiada de avistamiento de constelaciones con telescopio óptico.',
    exp_4_title: 'Birdwatching & Flora Nativa',
    exp_4_desc: 'Observación matutina de más de 30 especies de aves andinas registradas en la propiedad: colibríes espada, quindes andinos y tangaras entre orquídeas silvestres.',
    // Calculator & Booking Engine
    calc_badge: 'Reserva Directa Garantizada',
    calc_title: 'Calcula y Reserva Tu Estadía',
    calc_desc: 'Tarifas transparentes sin intermediarios. Cotiza tu estadía, selecciona paquetes o adicionales y confirma de inmediato vía WhatsApp con nuestro concierge.',
    vat_policy_title: 'Beneficio Fiscal para Turistas Extranjeros:',
    vat_policy_desc: 'Los huéspedes no residentes en Ecuador están exentos del 15% de IVA presentando su pasaporte y sello de turista vigente al hacer el check-in.',
    calc_label_checkin: 'Fecha de Llegada (Check-in)',
    calc_label_checkout: 'Fecha de Salida (Check-out)',
    calc_label_dome: 'Cabaña o Domo',
    calc_label_guests: 'Número de Huéspedes',
    calc_label_pkg: 'Paquete Especial (Opcional)',
    pkg_opt_none: 'Ninguno (Tarifa Estándar)',
    pkg_opt_romance: 'Paquete Escapada Romántica & Suite ($260)',
    pkg_opt_spa: 'Paquete Retiro Spa & Wellness Total ($290)',
    pkg_opt_adventure: 'Paquete Aventura & Cumbre Ilaló ($380)',
    calc_addons_title: 'Experiencias de Bienestar & Adicionales',
    calc_addon_spa: 'Masaje en Pareja de 60 min con Piedras Volcánicas',
    calc_addon_dinner: 'Cena Romántica 3 Tiempos a la Carta + Botella de Vino',
    calc_addon_firewood: 'Fogata Nocturna Privada + Kit Gourmet S\'mores',
    calc_summary_title: 'Resumen de Cotización',
    calc_sum_duration: 'Duración de Estadía:',
    calc_sum_dome_rate: 'Alojamiento:',
    calc_sum_addons: 'Servicios Adicionales:',
    calc_sum_breakfast: 'Desayuno Campestre:',
    calc_sum_free: '¡Gratis Incluido!',
    calc_sum_wifi: 'Wifi Satelital & Estacionamiento:',
    calc_sum_included: 'Incluidos',
    calc_sum_total: 'Total Estimado:',
    btn_whatsapp_reserve: 'Confirmar Disponibilidad en WhatsApp',
    calc_security_note: '🔒 Reserva directa oficial · Sin comisiones ni cargos ocultos',
    night_singular: 'noche',
    night_plural: 'noches',
    // Location
    loc_badge: 'Ubicación & Acceso',
    loc_title: 'En las Faldas del Guardián Andino',
    loc_desc: 'Ubicados en la ladera oriental del Volcán Ilaló en el valle de Tumbaco, gozamos de un microclima templado privilegiado (18°C a 24°C) todo el año, protegidos del viento frío y con vistas estelares libres de contaminación lumínica.',
    loc_bullet_1: '📍 Desde Quito: A solo 25 minutos por la autopista Ruta Viva y Vía Intervalles.',
    loc_bullet_2: '✈️ Desde el Aeropuerto UIO: 30 minutos directos. Ofrecemos servicio de transfer privado VIP bajo reserva.',
    loc_bullet_3: '🚗 Tipo de Acceso: Vía pavimentada hasta el portón del resort. Apto para todo tipo de autos (sedán, SUV o 4x4).',
    loc_bullet_4: '🛡️ Seguridad: Propiedad privada con estacionamiento cerrado y vigilancia permanente 24/7.',
    loc_btn_maps: 'Abrir Coordenadas en Google Maps / Waze',
    loc_resort_name: 'ILALÓ LODGE & SPA™',
    loc_resort_address: 'Sector La Cruz, Laderas del Volcán Ilaló, Tumbaco, Pichincha, Ecuador.',
    loc_resort_altitude: 'Altitud: 2,650 msnm · Clima: 18°C a 24°C · Coordenadas GPS Disponibles',
    // Reviews
    reviews_badge: 'Testimonios Verificados',
    reviews_title: 'La Experiencia de Quienes Vivieron la Magia',
    reviews_desc: 'Reconocido por más de 340 huéspedes como el mejor hotel de naturaleza y spa en los alrededores de Quito.',
    rev_1_text: '"La vista desde el jacuzzi al anochecer con Quito encendiéndose a lo lejos no tiene comparación en Ecuador. El domo es súper cálido, impecable y el servicio de desayuno delicioso."',
    rev_1_author: 'María Camila & Esteban',
    rev_1_meta: 'Celebración de Aniversario · Octubre 2026',
    rev_2_text: '"La atención a los detalles es de nivel mundial. Dormir mirando las estrellas a través de la cúpula y levantarse con el aroma de los eucaliptos me renovó por completo. Volveremos sin duda."',
    rev_2_author: 'David Santillán',
    rev_2_meta: 'Retiro Creativo & Spa · Septiembre 2026',
    rev_3_text: '"La cena romántica fue sublime y la fogata con malvaviscos bajo la Vía Láctea superó todas nuestras expectativas. Es el mejor lodge de naturaleza de la provincia con diferencia."',
    rev_3_author: 'Valeria Paredes',
    rev_3_meta: 'Escapada de Fin de Semana · Agosto 2026',
    // FAQ
    faq_badge: 'Políticas Claras',
    faq_title: 'Preguntas Frecuentes & Políticas del Lodge',
    faq_desc: 'Información esencial para que planifiques tu estadía con total tranquilidad y transparencia.',
    faq_q_vat: '¿Aplica la exención del 15% de IVA para turistas extranjeros?',
    faq_a_vat: 'Sí. De acuerdo con la Ley de Turismo del Ecuador, los turistas extranjeros no residentes que presenten su pasaporte físico con sello de entrada migratoria vigente de turista están 100% exentos del pago del 15% de IVA en su hospedaje.',
    faq_q1: '¿Qué horario tienen el check-in y el check-out?',
    faq_a1: 'El horario de Check-in es a partir de las 15:00 hrs y el Check-out regular es hasta las 11:30 hrs. En los paquetes especiales el Check-out se extiende de cortesía hasta las 13:00 hrs según disponibilidad.',
    faq_q2: '¿Cómo se mantiene la temperatura dentro del domo por la noche?',
    faq_a2: 'Todas las suites cuentan con aislamiento térmico multicapa importado, chimeneas de leña nórdicas de alto rendimiento y edredones de plumón y lana de alpaca virgen. La temperatura interior se mantiene templada y confortable (21°C a 23°C).',
    faq_q3: '¿El jacuzzi de cedro es 100% privado en cada cabaña?',
    faq_a3: 'Totalmente. Cada suite dispone de su propia tina nórdica o hidromasaje exclusivo en su terraza privada. El agua se renueva y desinfecta cuidadosamente antes de cada llegada y se calienta a 38°C para tu hora solicitada.',
    faq_q4: '¿Aceptan mascotas (Pet Friendly)?',
    faq_a4: 'En la cabaña Bosque Nativo aceptamos perritos de razas pequeñas y medianas educados previa notificación. En las áreas comunes y suites Volcán Master se preserva el espacio libre de mascotas por estrictas normas de bienestar y alergias.',
    // Footer
    footer_desc: 'Santuario de alta montaña donde el confort de lujo y la inmensidad del cielo andino se encuentran. Hospitalidad consciente, spa termal y preservación sustentable del Volcán Ilaló.',
    footer_address: 'Puerto / Sector La Cruz, Volcán Ilaló · Tumbaco, Quito · Pichincha, Ecuador',
    footer_nav_title: 'Navegación',
    footer_nav_sanctuary: 'El Santuario',
    footer_nav_domes: 'Cabañas & Domos',
    footer_nav_spa: 'Spa & Hidroterapia',
    footer_nav_packages: 'Paquetes Especiales',
    footer_nav_gastro: 'Restaurante El Huerto',
    footer_nav_calc: 'Cotizador en Línea',
    footer_contact_title: 'Contacto & Reservas',
    footer_contact_reception: '⏰ Atención Concierge: 08:00 - 22:00',
    footer_contact_loc: '📍 Sector La Cruz, Laderas del Ilaló, Tumbaco',
    footer_contact_shuttle: '🚐 Servicio de Transfer Aeropuerto UIO Disponible',
    footer_sust_title: 'Sostenibilidad & Sellos',
    footer_sust_desc: 'Operamos con energía solar limpia, biogestión de aguas para reforestación nativa y productos orgánicos de comercio justo de productores del valle.',
    footer_badge_eco: '🌿 100% Eco-Lodge Sustentable',
    footer_badge_top: '⭐ Travellers\' Choice 2026',
    footer_rights: '© 2026 ILALÓ LODGE & SPA™. Todos los derechos reservados. Puerto La Cruz, Tumbaco, Ecuador.',
    footer_dev_text: 'Diseñado & Desarrollado por:',
    // Sticky bar & WhatsApp
    sticky_from: 'Tarifa desde:',
    sticky_btn: 'Reservar Ahora',
    whatsapp_concierge: '¿Dudas? Chatea con nosotros',
    // Modal
    modal_title: 'Consulta Directa con Concierge',
    modal_desc: '¿Tienes una petición especial para una propuesta de matrimonio, cumpleaños o evento privado? Déjanos tus datos:',
    modal_label_name: 'Nombre Completo',
    modal_placeholder_name: 'Ej: Carolina Morales',
    modal_label_email: 'Correo Electrónico',
    modal_placeholder_email: 'tu-correo@ejemplo.com',
    modal_btn_close: 'Cerrar',
    modal_btn_submit: 'Enviar Solicitud',
    modal_success: '¡Gracias {name}! Hemos recibido tu consulta para Ilaló Lodge & Spa. Nuestro concierge se comunicará a {email} en breve.'
  },

  en: {
    // Meta & Document
    doc_title: 'ILALÓ LODGE & SPA™ · Nature Hotel, Cabins & Domes in Ecuador',
    // Announcement Ribbon
    announcement_badge: 'Direct Offer',
    announcement_text: 'Book online direct 👉 $124 per person | Country Breakfast & Spa Circuit included!',
    announcement_cta: 'Check Availability >',
    // Header & Logo
    logo_subtitle: 'NATURE HOTEL · ECUADOR',
    nav_sanctuary: 'The Sanctuary',
    nav_domes: 'Cabins & Domes',
    nav_spa: 'Spa & Wellness',
    nav_packages: 'Packages',
    nav_gastronomy: 'Dining & Bar',
    nav_experiences: 'Excursions',
    nav_location: 'Location',
    nav_faq: 'Policies & FAQ',
    nav_reserve: 'Book Now',
    nav_reserve_drawer: 'Request a Quote',
    nav_drawer_sub: '24/7 Personalized Concierge · Tumbaco Valley, Quito',
    nav_gallery: 'GALLERY',
    footer_nav_gallery: 'Photo Gallery',
    gallery_badge: 'EXCLUSIVE GALLERY',
    gallery_title: 'Postcards from Our Sanctuary on Ilaló',
    gallery_desc: 'Explore the corners, golden sunsets, steaming hot tubs and starry skies waiting for you on your next escape.',
    // Theme & Lang labels
    theme_to_light: 'Switch to light theme',
    theme_to_dark: 'Switch to dark theme',
    lang_toggle_title: 'Cambiar a Español',
    lang_label: 'ES',
    // El Jardín Lodge Layout Keys
    nav_home: 'HOME',
    hero_pill_btn: 'Check Availability',
    hero_headline: 'Destination Hotel at Ilaló Volcano with private cabins and domes, valley views and authentic experiences, just 25 minutes from Quito.',
    split_1_eyebrow: 'ACCOMMODATION',
    split_1_title: 'PRIVATE CABINS',
    split_1_desc: 'Experience panoramic views that transport you to the unique beauty of the Andes. Each room is a space designed to offer not only comfort but also an authentic connection with Nature.',
    split_1_btn: 'VIEW CABINS',
    split_2_eyebrow: 'GASTRONOMY',
    split_2_title: 'EL HUERTO RESTAURANT',
    split_2_desc: 'It is a culinary refuge that immerses you in the essence of authentic identity cuisine. Each dish is a wonderful combination of flavors and surprising textures harvested directly from our Andean organic farm.',
    split_2_btn: 'VIEW DETAILS',
    // Hero Section
    hero_pill: 'Nature Hotel & Spa · Just 25 min from Quito',
    hero_title: 'Connect with the Magic of Ilaló and the Andean Sky',
    hero_subtitle: 'Private luxury geodesic cabins, hot cedar Nordic tubs with hydrotherapy, holistic wellness spa, and organic farm cuisine overlooking Tumbaco Valley.',
    hero_cta_reserve: 'Check Availability',
    hero_cta_explore: 'Explore Cabins & Domes',
    hero_perk_tub: 'Private Nordic Hot Tub in Every Dome',
    hero_perk_breakfast: 'Farm-to-Table Breakfast Included',
    hero_perk_vat: 'Foreign Tourists Exempt from 15% VAT',
    // Hero Quick Search
    search_checkin: 'Check-in Date',
    search_checkout: 'Check-out Date',
    search_guests: 'Guests',
    search_category: 'Suite / Dome Category',
    search_btn: 'Check Rates',
    opt_guests_2: '2 Adults (Couple)',
    opt_guests_3: '3 Guests',
    opt_guests_1: '1 Guest (Solo Retreat)',
    opt_dome_master: 'Volcán Master Suite & Spa',
    opt_dome_const: 'Constellations Deluxe Dome',
    opt_dome_forest: 'Native Forest Eco-Lodge',
    // Sanctuary Section
    sanctuary_badge: 'Andean Sanctuary',
    sanctuary_title: 'A Sanctuary of Peace & Wellness on the Volcano Slopes',
    sanctuary_desc_1: 'Inspired by the serenity of South America\'s most exclusive nature lodges, ILALÓ LODGE & SPA™ was crafted as a private sanctuary where contemporary luxury harmonizes with the ancient energy of Mount Ilaló.',
    sanctuary_desc_2: 'Surrounded by over 12 hectares of protected Andean native forest, silence trails, and crisp mountain air, time stands still to rejuvenate your senses with outdoor hot thermal tubs, ancestral spa therapies, and organic farm gastronomy.',
    stat_altitude: 'Privileged mild year-round climate',
    stat_area: 'Protected private Andean forest',
    stat_privacy: 'Individual hot tubs & private decks',
    stat_dist: 'From Quito & Mariscal Sucre Airport',
    sanctuary_cap_1_title: 'Hydrotherapy in Aromatic Cedar',
    sanctuary_cap_1_sub: 'Hot mineral water at 38°C (100°F) with volcanic salts',
    sanctuary_cap_2_title: 'Luxury Geodesic Architecture',
    sanctuary_cap_2_sub: 'Acoustic and thermal insulation with sky views',
    // Domes Section
    domes_badge: 'Boutique Lodging',
    domes_title: 'Our Private Cabins & Domes',
    domes_desc: 'Each unit features a private suspended deck over the valley, hot cedar Nordic tub with exclusive hydrotherapy, wood fireplace, and unobstructed panoramic vistas.',
    card_tag_popular: 'Signature Suite',
    card_tag_stargazing: 'Stargazing View',
    card_tag_nature: 'Natural Immersion',
    tag_price_master: 'From $195',
    tag_price_const: 'From $165',
    tag_price_forest: 'From $145',
    dome_master_badge: 'Master Suite with Spa',
    dome_master_title: 'Volcán Master Suite & Spa',
    dome_master_spec: 'Capacity 2-3 Guests · 48 m² · King Size Bed',
    amenity_deck_tub: 'Cedar Hot Tub on Deck',
    amenity_fireplace: 'Nordic Wood Fireplace',
    amenity_view_360: '360° Panoramic View',
    amenity_minibar: 'Gourmet Minibar & Cellar',
    dome_const_badge: 'Astronomical Dome',
    dome_const_title: 'Constellations Deluxe Dome',
    dome_const_spec: 'Capacity 2 Guests · 42 m² · Queen Size Bed',
    amenity_stargaze_roof: 'Panoramic Stargazing Dome',
    amenity_telescope: 'Astronomical Telescope',
    amenity_alpaca: 'Alpaca Wool Bedding',
    amenity_bath_panoramic: 'Panoramic Bath & Tub',
    dome_forest_badge: 'Eco-Lodge & Gardens',
    dome_forest_title: 'Native Forest Eco-Lodge',
    dome_forest_spec: 'Capacity 2 Guests · 38 m² · Queen Size Bed · Pet Friendly',
    amenity_sunken_tub: 'Sunken Cedar Hot Tub',
    amenity_catamaran: 'Suspended Catamaran Net',
    amenity_firepit: 'Private Stone Firepit',
    amenity_aromatherapy: 'Forest Aromatherapy',
    btn_select: 'Book Suite',
    per_night: 'USD / per night (from $124/guest)',
    hint_watch_video: '▶ Watch Video & 360°',
    tag_video_tour: 'Video Tour',
    vis_badge: 'Immersive Experience',
    vis_sub: 'Explore each dome perspective: move cursor or swipe to feel the 3D depth.',
    p_video: '▶ HD Video Tour',
    p_exterior: 'Exterior & Deck',
    p_interior: 'Suite & Fireplace',
    p_spa: 'Spa & Hot Tub',
    p_gastro: 'Dining',
    vis_rate_label: 'Rate per night:',
    vis_book_btn: 'Book This Dome',
    // Spa Section
    spa_badge: 'Wellness Sanctuary',
    spa_title: 'Thermal Spa & Holistic Therapies',
    spa_desc: 'Designed to restore balance through the restorative power of thermal waters, hot volcanic stones, and garden botanical essences.',
    spa_item_1_title: 'Cedar Hydrothermal Circuit',
    spa_item_1_desc: 'Artisanal Nordic tubs heated to 38°C with volcanic mineral salts rich in sulfur and magnesium, set on private sunset terraces.',
    spa_p1_b1: '✓ Fresh water renewed for each guest',
    spa_p1_b2: '✓ Eucalyptus and myrtle infusions',
    spa_item_2_title: 'Hot Volcanic Stone Massages',
    spa_item_2_desc: 'Deep tissue therapy for couples or individuals (60/90 min). Basalt stones relieve muscle tension and channel deep warmth.',
    spa_p2_b1: '✓ Certified in-house therapists',
    spa_p2_b2: '✓ Organic lavender and jojoba oils',
    spa_item_3_title: 'Steam Bath & Aromatherapy',
    spa_item_3_desc: 'Cellular detox ritual with herbal steam harvested from our gardens. Purifies respiratory tract and rejuvenates skin.',
    spa_p3_b1: '✓ Fresh medicinal herbs',
    spa_p3_b2: '✓ Revitalizing cold contrast shower',
    spa_item_4_title: 'Solarium & Andean Tea Bar',
    spa_item_4_desc: 'Relaxation lounge with ergonomic loungers, soft wool throws, and unlimited herbal tea bar with mint, lemon verbena, and dried fruits.',
    spa_p4_b1: '✓ Complimentary for lodge guests',
    spa_p4_b2: '✓ Panoramic views towards Cotopaxi',
    spa_banner_title: 'Want to customize your spa circuit?',
    spa_banner_sub: 'Add couple massage packages or botanical scrubs directly to your stay reservation.',
    spa_banner_btn: 'Book with Spa Included',
    // Packages Section
    packages_badge: 'All-Inclusive Stays',
    packages_title: 'Packages & All-Inclusive Getaways',
    packages_desc: 'Designed for anniversaries, wedding proposals, or deep reconnection retreats with zero stress.',
    pkg_1_tag: 'Most Popular',
    pkg_1_title: 'Romantic Getaway & Suite',
    pkg_1_sub: '1 Night for 2 in Volcán Master Suite',
    pkg_1_f1: '✓ Private cedar Nordic tub with mineral salts and flower petals',
    pkg_1_f2: '✓ 3-Course gourmet candlelight romantic dinner',
    pkg_1_f3: '✓ 1 Welcome bottle of sparkling or reserve wine',
    pkg_1_f4: '✓ Artisanal farm breakfast served on terrace',
    pkg_1_f5: '✓ Private campfire with s\'mores roasting kit',
    pkg_1_f6: '✓ Complimentary late check-out until 1:00 PM',
    pkg_2_tag: 'Total Rejuvenation',
    pkg_2_title: 'Total Spa & Wellness Retreat',
    pkg_2_sub: '1 Night for 2 with Included Therapies',
    pkg_2_f1: '✓ Dome Suite stay with private heated hydrotherapy',
    pkg_2_f2: '✓ 2 Full-body 60 min hot volcanic stone massages',
    pkg_2_f3: '✓ Hydrothermal tub circuit with volcanic mineral salts',
    pkg_2_f4: '✓ Aromatherapy session and herbal steam bath',
    pkg_2_f5: '✓ Aged cheese board, nuts, and organic herbal infusions',
    pkg_2_f6: '✓ Healthy country breakfast with Andean fruits',
    pkg_3_tag: 'Active Nature',
    pkg_3_title: 'Adventure & Ilaló Summit',
    pkg_3_sub: '2 Nights Andean Immersion for 2',
    pkg_3_f1: '✓ 2 Nights in Constellations Dome or Native Forest',
    pkg_3_f2: '✓ Private trekking guide to the cross and 360° summit viewpoint',
    pkg_3_f3: '✓ Gourmet Andean picnic basket for summit hike',
    pkg_3_f4: '✓ Unlimited hot tub access & eucalyptus campfire',
    pkg_3_f5: '✓ Night stargazing session with optical telescope',
    pkg_3_f6: '✓ 2 Full complimentary breakfasts for both days',
    pkg_select_btn: 'Choose Package',
    // Gastronomy Section
    gastro_badge: 'Origin Cuisine & Farm',
    gastro_title: 'Tumbaco Valley Flavors & Andean Cellar',
    gastro_desc: 'Our restaurant "El Huerto del Ilaló" fuses Ecuadorian Andean culinary heritage with contemporary signature techniques, using vegetables and herbs harvested daily from our organic garden.',
    gastro_item_1_title: 'Complimentary Country Breakfast:',
    gastro_item_1_text: ' Wood-fired artisan bread, free-range organic eggs, fresh Andean cheeses, wild blackberry jam, and high-altitude Arabica coffee.',
    gastro_item_2_title: 'Private Romantic Dinners on Terrace:',
    gastro_item_2_text: ' 3-Course menu with options including rosemary beef tenderloin, fresh Andean trout in almond butter, and wild mushroom risotto.',
    gastro_item_3_title: 'Wine Cellar & Botanical Cocktails:',
    gastro_item_3_text: ' Curated South American wine pairings, craft valley beers, and botanical cocktails macerated with wild local herbs.',
    gastro_cta: 'Add Gourmet Dinner to My Stay',
    gastro_media_badge: 'Private Terrace Dining',
    // Experiences & Excursions
    exp_badge: 'Ecotourism & Discovery',
    exp_title: 'Excursions & Surrounding Adventures',
    exp_desc: 'Nestled between Quito and thermal valleys, our lodge is the perfect springboard for Andean discovery.',
    exp_3_title: 'Hike to the Ilaló Cross',
    exp_3_desc: 'Guided or self-guided nature hike to the summit (3,185 m). 360° viewpoint overlooking Tumbaco and Chillos valleys and snow-capped peaks.',
    exp_1_title: 'Natural Thermal Springs Trail',
    exp_1_desc: 'Guided outing to ancestral hot springs in La Merced and El Tingo emerging from volcano depths, renowned for healing minerals.',
    exp_2_title: 'Andean Campfire & Astronomy',
    exp_2_desc: 'Magical campfire nights with fragrant eucalyptus wood, wine tasting, and guided stargazing through an optical telescope.',
    exp_4_title: 'Birdwatching & Native Flora',
    exp_4_desc: 'Morning birding with over 30 species recorded: sword-billed hummingbirds, Andean quindes, and tanagers among wild orchids.',
    // Calculator & Booking Engine
    calc_badge: 'Guaranteed Direct Booking',
    calc_title: 'Calculate & Book Your Stay',
    calc_desc: 'Transparent rates with zero intermediaries. Calculate your stay, select packages or add-ons, and confirm via WhatsApp with our concierge.',
    vat_policy_title: 'Tax Exemption for International Tourists:',
    vat_policy_desc: 'Non-resident guests in Ecuador are 100% exempt from the 15% VAT upon presenting a passport with valid tourist entry stamp at check-in.',
    calc_label_checkin: 'Check-in Date',
    calc_label_checkout: 'Check-out Date',
    calc_label_dome: 'Cabin or Dome',
    calc_label_guests: 'Number of Guests',
    calc_label_pkg: 'Special Package (Optional)',
    pkg_opt_none: 'None (Standard Rate)',
    pkg_opt_romance: 'Romantic Getaway & Suite Package ($260)',
    pkg_opt_spa: 'Total Spa & Wellness Retreat Package ($290)',
    pkg_opt_adventure: 'Adventure & Ilaló Summit Package ($380)',
    calc_addons_title: 'Wellness Experiences & Add-ons',
    calc_addon_spa: '60 min Couple Massage with Hot Volcanic Stones',
    calc_addon_dinner: '3-Course A La Carte Romantic Dinner + Wine Bottle',
    calc_addon_firewood: 'Private Night Campfire + Gourmet S\'mores Kit',
    calc_summary_title: 'Booking Quote Summary',
    calc_sum_duration: 'Stay Duration:',
    calc_sum_dome_rate: 'Accommodation:',
    calc_sum_addons: 'Add-on Services:',
    calc_sum_breakfast: 'Country Breakfast:',
    calc_sum_free: 'Free Included!',
    calc_sum_wifi: 'Satellite Wifi & Parking:',
    calc_sum_included: 'Included',
    calc_sum_total: 'Estimated Total:',
    btn_whatsapp_reserve: 'Confirm Availability on WhatsApp',
    calc_security_note: '🔒 Official direct booking · No commissions or hidden fees',
    night_singular: 'night',
    night_plural: 'nights',
    // Location
    loc_badge: 'Location & Access',
    loc_title: 'On the Slopes of the Andean Guardian',
    loc_desc: 'Nestled on the eastern slope of Ilaló Volcano in Tumbaco Valley, we enjoy a mild microclimate (18°C - 24°C / 64°F - 75°F) year-round, shielded from mountain winds with pollution-free starlight skies.',
    loc_bullet_1: '📍 From Quito: Just 25 minutes via Ruta Viva and Intervalles highways.',
    loc_bullet_2: '✈️ From UIO Airport: 30 direct minutes. VIP private shuttle available upon reservation.',
    loc_bullet_3: '🚗 Access Road: Paved road directly to resort gate. Suitable for all vehicle types (sedan, SUV, or 4x4).',
    loc_bullet_4: '🛡️ Security: Gated private estate with enclosed parking and 24/7 security.',
    loc_btn_maps: 'Open Coordinates in Google Maps / Waze',
    loc_resort_name: 'ILALÓ LODGE & SPA™',
    loc_resort_address: 'La Cruz Sector, Slopes of Ilaló Volcano, Tumbaco, Pichincha, Ecuador.',
    loc_resort_altitude: 'Altitude: 2,650 m (8,690 ft) · Climate: 18°C - 24°C · GPS Coordinates Available',
    // Reviews
    reviews_badge: 'Verified Testimonials',
    reviews_title: 'What Guests Say After Living the Magic',
    reviews_desc: 'Recognized by over 340 guests as the premier nature and spa lodge near Quito.',
    rev_1_text: '"The view from the hot tub at dusk with Quito lighting up in the distance is unmatched in Ecuador. The dome is warm, spotless, and the breakfast service is superb."',
    rev_1_author: 'Maria Camila & Esteban',
    rev_1_meta: 'Anniversary Celebration · October 2026',
    rev_2_text: '"World-class attention to detail. Sleeping under the stars through the dome canopy and waking up to the aroma of eucalyptus completely rejuvenated me. We will return."',
    rev_2_author: 'David Santillan',
    rev_2_meta: 'Creative Retreat & Spa · September 2026',
    rev_3_text: '"The romantic dinner was sublime and the campfire with s\'mores under the Milky Way exceeded all expectations. Hands down the best nature lodge in the province."',
    rev_3_author: 'Valeria Paredes',
    rev_3_meta: 'Weekend Getaway · August 2026',
    // FAQ
    faq_badge: 'Clear Policies',
    faq_title: 'Frequently Asked Questions & Lodge Policies',
    faq_desc: 'Essential information to plan your stay with complete peace of mind and transparency.',
    faq_q_vat: 'Does the 15% VAT exemption apply to international tourists?',
    faq_a_vat: 'Yes. Under Ecuadorian Tourism Law, non-resident foreign tourists presenting their physical passport with a valid tourist entry stamp are 100% exempt from the 15% VAT on lodging.',
    faq_q1: 'What are the check-in and check-out times?',
    faq_a1: 'Standard Check-in is from 3:00 PM and Check-out is until 11:30 AM. For special packages, late check-out is extended until 1:00 PM subject to availability.',
    faq_q2: 'How is the temperature maintained inside the dome at night?',
    faq_a2: 'All suites feature multi-layer thermal insulation, high-efficiency Nordic wood fireplaces, and down and virgin alpaca wool duvets, maintaining a cozy 21°C - 23°C (70°F - 73°F).',
    faq_q3: 'Is the cedar hot tub 100% private in each cabin?',
    faq_a3: 'Absolutely. Every suite features its own exclusive Nordic tub or hydrotherapy on its private deck. Fresh water is renewed and sanitized before every arrival and heated to 38°C (100°F).',
    faq_q4: 'Are pets allowed (Pet Friendly)?',
    faq_a4: 'In the Native Forest cabin we welcome well-behaved small and medium dogs with prior notice. In common areas and Volcán Master suites, spaces are pet-free for allergies and quietness.',
    // Footer
    footer_desc: 'High-mountain sanctuary where luxury comfort meets the infinite Andean sky. Mindful hospitality, thermal spa, and sustainable conservation on Mt. Ilaló.',
    footer_address: 'La Cruz Sector, Ilaló Volcano · Tumbaco, Quito · Pichincha, Ecuador',
    footer_nav_title: 'Navigation',
    footer_nav_sanctuary: 'The Sanctuary',
    footer_nav_domes: 'Cabins & Domes',
    footer_nav_spa: 'Spa & Hydrotherapy',
    footer_nav_packages: 'Special Packages',
    footer_nav_gastro: 'El Huerto Restaurant',
    footer_nav_calc: 'Online Calculator',
    footer_contact_title: 'Contact & Reservations',
    footer_contact_reception: '⏰ Concierge Desk: 08:00 - 22:00',
    footer_contact_loc: '📍 La Cruz Sector, Slopes of Ilaló, Tumbaco',
    footer_contact_shuttle: '🚐 UIO Airport Private Transfer Available',
    footer_sust_title: 'Sustainability & Seals',
    footer_sust_desc: 'We operate with clean solar energy, water management for native reforestation, and fair-trade organic products from local farmers.',
    footer_badge_eco: '🌿 100% Eco-Lodge Sustainable',
    footer_badge_top: '⭐ Travellers\' Choice 2026',
    footer_rights: '© 2026 ILALÓ LODGE & SPA™. All rights reserved. La Cruz, Tumbaco, Ecuador.',
    footer_dev_text: 'Designed & Developed by:',
    // Sticky bar & WhatsApp
    sticky_from: 'Rates from:',
    sticky_btn: 'Book Now',
    whatsapp_concierge: 'Need help? Chat with us',
    // Modal
    modal_title: 'Direct Inquiry with Concierge',
    modal_desc: 'Have a special request for a wedding proposal, birthday, or private event? Share your details with us:',
    modal_label_name: 'Full Name',
    modal_placeholder_name: 'e.g. Caroline Smith',
    modal_label_email: 'Email Address',
    modal_placeholder_email: 'your-email@example.com',
    modal_btn_close: 'Close',
    modal_btn_submit: 'Submit Request',
    modal_success: 'Thank you {name}! We have received your inquiry for Ilaló Lodge & Spa. Our concierge will reach out to {email} shortly.'
  }
};

/* ---------------------------------------------------------
   3. PRICING & PACKAGE METRICS (TRANSPARENT VALUE ENGINE)
   --------------------------------------------------------- */
const DOME_PRICES = {
  master: { price: 195, nameEs: 'Volcán Master Suite & Spa', nameEn: 'Volcán Master Suite & Spa' },
  constelaciones: { price: 165, nameEs: 'Constelaciones Deluxe Dome', nameEn: 'Constellations Deluxe Dome' },
  bosque: { price: 145, nameEs: 'Bosque Nativo Eco-Lodge', nameEn: 'Native Forest Eco-Lodge' }
};

const ADDON_PRICES = {
  spa: 45,
  dinner: 55,
  firewood: 15
};

const PACKAGES = {
  romance: {
    dome: 'master',
    addons: ['dinner', 'firewood'],
    nameEs: 'Paquete Escapada Romántica & Suite',
    nameEn: 'Romantic Getaway & Suite Package',
    fixedTotal: 260
  },
  spa: {
    dome: 'master',
    addons: ['spa'],
    nameEs: 'Paquete Retiro Spa & Wellness Total',
    nameEn: 'Total Spa & Wellness Retreat Package',
    fixedTotal: 290
  },
  adventure: {
    dome: 'constelaciones',
    addons: ['firewood'],
    nights: 2,
    nameEs: 'Paquete Aventura & Cumbre Ilaló',
    nameEn: 'Adventure & Ilaló Summit Package',
    fixedTotal: 380
  }
};

/* ---------------------------------------------------------
   4. MAIN APPLICATION ORCHESTRATION
   --------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  let currentLang = 'es';
  try {
    currentLang = localStorage.getItem('ilalo_lang') || 'es';
  } catch (e) {
    currentLang = 'es';
  }

  // Navigation & Theme Elements
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const themeToggle = document.getElementById('themeToggle');
  const themeToggleMobile = document.getElementById('themeToggleMobile');
  const langToggle = document.getElementById('langToggle');
  const langToggleMobile = document.getElementById('langToggleMobile');

  // Calculator Elements
  const checkInInput = document.getElementById('calcCheckIn');
  const checkOutInput = document.getElementById('calcCheckOut');
  const domeSelect = document.getElementById('calcDome');
  const guestsSelect = document.getElementById('calcGuests');
  const packageSelect = document.getElementById('calcPackageSelect');
  const addonSpa = document.getElementById('addonSpa');
  const addonDinner = document.getElementById('addonDinner');
  const addonFirewood = document.getElementById('addonFirewood');

  const summaryNights = document.getElementById('summaryNights');
  const summaryDomeRate = document.getElementById('summaryDomeRate');
  const summaryAddons = document.getElementById('summaryAddons');
  const summaryTotal = document.getElementById('summaryTotal');
  const btnReserveWhatsApp = document.getElementById('btnReserveWhatsApp');

  /* -------------------------------------------------------
     A. THEME TOGGLE CONTROLLER
     ------------------------------------------------------- */
  function updateThemeUI(isDark) {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.es;
    // Si está en modo oscuro, el botón ofrece cambiar a modo claro
    const tooltipText = isDark ? dict.theme_to_light : dict.theme_to_dark;
    [themeToggle, themeToggleMobile].forEach((btn) => {
      if (btn) {
        btn.setAttribute('aria-label', tooltipText);
        btn.setAttribute('title', tooltipText);
      }
    });
  }

  function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'light');
      try { localStorage.setItem('ilalo_theme', 'light'); } catch (e) {}
      updateThemeUI(false);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('ilalo_theme', 'dark'); } catch (e) {}
      updateThemeUI(true);
    }
  }

  // Inicializar estado del tooltip según el tema actual cargado
  const initialIsDark = document.documentElement.getAttribute('data-theme') === 'dark';
  updateThemeUI(initialIsDark);

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

  /* -------------------------------------------------------
     B. LANGUAGE SWITCHER CONTROLLER (ES / EN)
     ------------------------------------------------------- */
  function applyLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang);
    try { localStorage.setItem('ilalo_lang', lang); } catch (e) {}

    const dict = TRANSLATIONS[lang];

    // Document title
    if (dict.doc_title) {
      document.title = dict.doc_title;
    }

    // Update all elements with data-i18n attribute strictly via textContent
    const i18nElements = document.querySelectorAll('[data-i18n]');
    i18nElements.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    // Update input placeholders
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    // Update Language Toggle Badges & Floating Widget (Screenshots 1 & 2)
    const langLabels = document.querySelectorAll('.lang-label-text');
    langLabels.forEach((badge) => {
      badge.textContent = dict.lang_label;
    });

    const langFlag = document.getElementById('langFlag');
    const langText = document.getElementById('langText');
    if (langFlag) langFlag.textContent = lang === 'en' ? '🇺🇸' : '🇪🇸';
    if (langText) langText.textContent = lang === 'en' ? 'EN' : 'ES';

    [langToggle, langToggleMobile].forEach((btn) => {
      if (btn) {
        btn.setAttribute('aria-label', dict.lang_toggle_title);
        btn.setAttribute('title', dict.lang_toggle_title);
      }
    });

    // Update Theme Toggle Tooltip based on current theme and language
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    updateThemeUI(isDark);

    // Refresh quote calculations and messages in target language
    recalculateQuote();
  }

  function toggleLanguage() {
    const nextLang = currentLang === 'es' ? 'en' : 'es';
    applyLanguage(nextLang);
  }

  if (langToggle) langToggle.addEventListener('click', toggleLanguage);
  if (langToggleMobile) langToggleMobile.addEventListener('click', toggleLanguage);

  /* -------------------------------------------------------
     C. MOBILE DRAWER NAVIGATION
     ------------------------------------------------------- */
  const openDrawer = () => {
    mobileNav.classList.add('active');
    mobileNavBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    mobileNav.classList.remove('active');
    mobileNavBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  };

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', openDrawer);
    if (mobileNavClose) mobileNavClose.addEventListener('click', closeDrawer);
    if (mobileNavBackdrop) mobileNavBackdrop.addEventListener('click', closeDrawer);
    mobileLinks.forEach(link => link.addEventListener('click', closeDrawer));

    // Accessibility: Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        closeDrawer();
      }
    });
  }

  /* -------------------------------------------------------
     D. INTERACTIVE RATE CALCULATOR & QUOTE ENGINE
     ------------------------------------------------------- */
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDateValue = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (checkInInput && checkOutInput) {
    checkInInput.min = formatDateValue(today);
    checkInInput.value = formatDateValue(today);

    checkOutInput.min = formatDateValue(tomorrow);
    checkOutInput.value = formatDateValue(tomorrow);

    checkInInput.addEventListener('change', () => {
      const inDate = new Date(checkInInput.value);
      if (isNaN(inDate.getTime())) return;
      const minOut = new Date(inDate);
      minOut.setDate(minOut.getDate() + 1);
      checkOutInput.min = formatDateValue(minOut);
      if (new Date(checkOutInput.value) <= inDate) {
        checkOutInput.value = formatDateValue(minOut);
      }
      recalculateQuote();
    });

    checkOutInput.addEventListener('change', recalculateQuote);
  }

  [domeSelect, guestsSelect, addonSpa, addonDinner, addonFirewood].forEach((el) => {
    if (el) {
      el.addEventListener('change', () => {
        // If user manually modifies fields, reset package select to 'none' if inconsistent
        recalculateQuote();
      });
    }
  });

  /* -------------------------------------------------------
     E. PACKAGES SYNCHRONIZATION CONTROLLER
     ------------------------------------------------------- */
  function applyPackage(pkgKey) {
    if (!PACKAGES[pkgKey]) return;
    const pkg = PACKAGES[pkgKey];

    if (domeSelect) {
      domeSelect.value = pkg.dome;
    }
    if (packageSelect) {
      packageSelect.value = pkgKey;
    }

    // Toggle add-ons corresponding to package inclusions
    if (addonSpa) addonSpa.checked = pkg.addons.includes('spa');
    if (addonDinner) addonDinner.checked = pkg.addons.includes('dinner');
    if (addonFirewood) addonFirewood.checked = pkg.addons.includes('firewood');

    // Adjust duration if multi-night package
    if (pkg.nights && checkInInput && checkOutInput) {
      const inDate = new Date(checkInInput.value);
      if (!isNaN(inDate.getTime())) {
        const outDate = new Date(inDate);
        outDate.setDate(outDate.getDate() + pkg.nights);
        checkOutInput.value = formatDateValue(outDate);
      }
    }

    recalculateQuote();

    const reservationSection = document.getElementById('reservar');
    if (reservationSection) {
      reservationSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const packageButtons = document.querySelectorAll('.btn-select-package');
  packageButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pkgKey = btn.getAttribute('data-package');
      if (pkgKey) applyPackage(pkgKey);
    });
  });

  if (packageSelect) {
    packageSelect.addEventListener('change', () => {
      if (packageSelect.value !== 'none') {
        applyPackage(packageSelect.value);
      } else {
        recalculateQuote();
      }
    });
  }

  function recalculateQuote() {
    if (!checkInInput || !checkOutInput || !domeSelect) return;

    const inDate = new Date(checkInInput.value);
    const outDate = new Date(checkOutInput.value);

    // Calculate nights safely
    const diffTime = outDate.getTime() - inDate.getTime();
    let nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (nights < 1 || isNaN(nights)) nights = 1;

    const isEn = currentLang === 'en';
    const pkgKey = packageSelect ? packageSelect.value : 'none';

    let totalEstimate = 0;
    let domeSubtotal = 0;
    let addonsSubtotal = 0;
    const selectedAddonsList = [];

    const domeKey = domeSelect.value;
    const domeInfo = DOME_PRICES[domeKey] || DOME_PRICES['master'];

    // Check if an all-inclusive package is active
    if (pkgKey !== 'none' && PACKAGES[pkgKey]) {
      const pkg = PACKAGES[pkgKey];
      totalEstimate = pkg.fixedTotal;
      domeSubtotal = pkg.fixedTotal;
      selectedAddonsList.push(isEn ? pkg.nameEn : pkg.nameEs);
    } else {
      domeSubtotal = domeInfo.price * nights;

      if (addonSpa && addonSpa.checked) {
        addonsSubtotal += ADDON_PRICES.spa;
        selectedAddonsList.push(isEn ? 'Spa & Hot Stone Massage ($45)' : 'Sesión Spa & Piedras Volcánicas ($45)');
      }
      if (addonDinner && addonDinner.checked) {
        addonsSubtotal += ADDON_PRICES.dinner;
        selectedAddonsList.push(isEn ? 'Romantic 3-Course Dinner ($55)' : 'Cena Romántica 3 Tiempos ($55)');
      }
      if (addonFirewood && addonFirewood.checked) {
        addonsSubtotal += ADDON_PRICES.firewood;
        selectedAddonsList.push(isEn ? 'Private Campfire & S\'mores ($15)' : 'Fogata Privada & S\'mores ($15)');
      }

      totalEstimate = domeSubtotal + addonsSubtotal;
    }

    const nightWord = nights > 1 ? (isEn ? 'nights' : 'noches') : (isEn ? 'night' : 'noche');

    // Secure DOM text assignment (strictly textContent, zero innerHTML)
    if (summaryNights) {
      summaryNights.textContent = `${nights} ${nightWord}`;
    }
    if (summaryDomeRate) {
      const perNightText = isEn ? 'night' : 'noche';
      summaryDomeRate.textContent = `$${domeSubtotal} USD ($${domeInfo.price}/${perNightText})`;
    }
    if (summaryAddons) {
      summaryAddons.textContent = `$${addonsSubtotal} USD`;
    }
    if (summaryTotal) {
      animateCounter(totalEstimate);
    }

    // Build Sanitized WhatsApp Link in active language
    if (btnReserveWhatsApp && guestsSelect) {
      const guests = guestsSelect.value;
      const domeName = isEn ? domeInfo.nameEn : domeInfo.nameEs;
      const pkgName = (pkgKey !== 'none' && PACKAGES[pkgKey]) ? (isEn ? PACKAGES[pkgKey].nameEn : PACKAGES[pkgKey].nameEs) : (isEn ? 'Standard Stay' : 'Estadía Estándar');
      const addonsText = selectedAddonsList.length > 0 ? selectedAddonsList.join(', ') : (isEn ? 'None' : 'Ninguno');

      let cleanMessage = '';
      if (isEn) {
        cleanMessage = `Hello ILALÓ LODGE & SPA! I would like to book my stay:
- Accommodation: ${domeName}
- Package Option: ${pkgName}
- Check-in: ${checkInInput.value}
- Check-out: ${checkOutInput.value} (${nights} ${nightWord})
- Guests: ${guests}
- Inclusions: ${addonsText}
- Estimated Total: $${totalEstimate} USD
Do you have availability for these dates?`;
      } else {
        cleanMessage = `¡Hola ILALÓ LODGE & SPA! Deseo consultar disponibilidad para mi estadía:
- Alojamiento: ${domeName}
- Opción / Paquete: ${pkgName}
- Llegada (Check-in): ${checkInInput.value}
- Salida (Check-out): ${checkOutInput.value} (${nights} ${nightWord})
- Huéspedes: ${guests}
- Inclusiones: ${addonsText}
- Total Estimado: $${totalEstimate} USD
¿Tienen disponibilidad para estas fechas?`;
      }

      const encodedMessage = encodeURIComponent(cleanMessage);
      btnReserveWhatsApp.href = `https://wa.me/593999999999?text=${encodedMessage}`;
    }
  }

  /* -------------------------------------------------------
     F. HERO QUICK SEARCH BAR SYNC
     ------------------------------------------------------- */
  const heroIn = document.getElementById('heroCheckIn');
  const heroOut = document.getElementById('heroCheckOut');
  if (heroIn && heroOut) {
    heroIn.min = formatDateValue(today);
    heroIn.value = formatDateValue(today);
    heroOut.min = formatDateValue(tomorrow);
    heroOut.value = formatDateValue(tomorrow);

    heroIn.addEventListener('change', () => {
      const inDate = new Date(heroIn.value);
      if (isNaN(inDate.getTime())) return;
      const minOut = new Date(inDate);
      minOut.setDate(minOut.getDate() + 1);
      heroOut.min = formatDateValue(minOut);
      if (new Date(heroOut.value) <= inDate) {
        heroOut.value = formatDateValue(minOut);
      }
    });
  }

  const heroCheckAvailability = document.getElementById('heroCheckAvailability');
  if (heroCheckAvailability) {
    heroCheckAvailability.addEventListener('click', (e) => {
      e.preventDefault();
      const heroGuests = document.getElementById('heroGuests');
      const heroDome = document.getElementById('heroDome');

      if (heroIn && heroIn.value && checkInInput) checkInInput.value = heroIn.value;
      if (heroOut && heroOut.value && checkOutInput) checkOutInput.value = heroOut.value;
      if (heroGuests && heroGuests.value && guestsSelect) guestsSelect.value = heroGuests.value;
      if (heroDome && heroDome.value && domeSelect) domeSelect.value = heroDome.value;

      recalculateQuote();

      const reservationSection = document.getElementById('reservar');
      if (reservationSection) {
        reservationSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  const heroQuickSearch = document.getElementById('heroQuickSearch');
  if (heroQuickSearch) {
    heroQuickSearch.addEventListener('submit', (e) => {
      e.preventDefault();
      if (heroCheckAvailability) heroCheckAvailability.click();
    });
  }

  /* -------------------------------------------------------
     G. MODAL DIALOG CONTROLLER (ACCESSIBLE NATIVE <dialog>)
     ------------------------------------------------------- */
  const contactModal = document.getElementById('contactModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');
  const contactForm = document.getElementById('quickInquiryForm');

  const showModal = () => {
    if (contactModal) {
      if (typeof contactModal.showModal === 'function') {
        contactModal.showModal();
      } else {
        contactModal.setAttribute('open', '');
      }
    }
  };

  const hideModal = () => {
    if (contactModal) {
      if (typeof contactModal.close === 'function') {
        contactModal.close();
      } else {
        contactModal.removeAttribute('open');
      }
    }
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', hideModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', hideModal);
  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      const rect = contactModal.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        hideModal();
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('modalClientName');
      const emailInput = document.getElementById('modalClientEmail');

      if (!nameInput || !emailInput) return;

      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();

      // Defensive email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!nameVal || !emailRegex.test(emailVal)) {
        alert(currentLang === 'en' ? 'Please enter a valid name and email address.' : 'Por favor ingrese un nombre y correo electrónico válido.');
        return;
      }

      // Safe text replacement without innerHTML
      const modalSuccessMsg = document.getElementById('modalSuccessMsg');
      if (modalSuccessMsg) {
        const template = TRANSLATIONS[currentLang].modal_success;
        modalSuccessMsg.textContent = template.replace('{name}', nameVal).replace('{email}', emailVal);
        modalSuccessMsg.style.display = 'block';
      }

      contactForm.reset();
      setTimeout(hideModal, 4500);
    });
  }

  /* -------------------------------------------------------
     H. DOME CARD DIRECT SELECTOR BUTTONS
     ------------------------------------------------------- */
  const selectDomeButtons = document.querySelectorAll('.btn-select-dome');
  selectDomeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedType = btn.getAttribute('data-dome-type');
      if (selectedType && domeSelect) {
        domeSelect.value = selectedType;
        if (packageSelect) packageSelect.value = 'none';
        recalculateQuote();
      }
      const reservationSection = document.getElementById('reservar');
      if (reservationSection) {
        reservationSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* -------------------------------------------------------
     I. HEADER ELEVATION & HERO SCROLL INDICATOR
     ------------------------------------------------------- */
  const header = document.querySelector('.lodge-header') || document.querySelector('.header');
  const heroScrollIndicator = document.getElementById('heroScrollIndicator');
  if (header || heroScrollIndicator) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      if (header) {
        if (scrollY > 30) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
      if (heroScrollIndicator) {
        if (scrollY > 40) {
          heroScrollIndicator.classList.add('is-hidden');
        } else {
          heroScrollIndicator.classList.remove('is-hidden');
        }
      }
    }, { passive: true });
  }

  /* -------------------------------------------------------
     J. NUMERICAL COUNTER ANIMATION ENGINE
     ------------------------------------------------------- */
  let currentAnimatedTotal = 195;
  function animateCounter(targetVal) {
    const totalEl = document.getElementById('summaryTotal');
    if (!totalEl) return;
    const startVal = currentAnimatedTotal;
    const diff = targetVal - startVal;
    if (diff === 0) {
      totalEl.textContent = `$${targetVal} USD`;
      return;
    }
    const duration = 380;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(startVal + diff * ease);
      totalEl.textContent = `$${val} USD`;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        currentAnimatedTotal = targetVal;
        totalEl.textContent = `$${targetVal} USD`;
      }
    }
    requestAnimationFrame(update);
  }

  /* -------------------------------------------------------
     K. MODAL DE VIDEO EXCLUSIVO PARA VOLCÁN MASTER SUITE
     ------------------------------------------------------- */
  const domeVisualizerModal = document.getElementById('domeVisualizerModal');
  const visualizerCloseBtn = document.getElementById('visualizerCloseBtn');
  const visualizerVideo = document.getElementById('visualizerVideo');

  function openMasterVideoModal() {
    if (!domeVisualizerModal) return;
    if (visualizerVideo) {
      visualizerVideo.currentTime = 0;
      visualizerVideo.play().catch(() => {});
    }
    if (typeof domeVisualizerModal.showModal === 'function') {
      domeVisualizerModal.showModal();
    } else {
      domeVisualizerModal.setAttribute('open', '');
    }
  }

  function closeMasterVideoModal() {
    if (visualizerVideo) {
      visualizerVideo.pause();
    }
    if (domeVisualizerModal) {
      if (typeof domeVisualizerModal.close === 'function') {
        domeVisualizerModal.close();
      } else {
        domeVisualizerModal.removeAttribute('open');
      }
    }
  }

  if (visualizerCloseBtn) visualizerCloseBtn.addEventListener('click', closeMasterVideoModal);

  if (domeVisualizerModal) {
    domeVisualizerModal.addEventListener('click', (e) => {
      const rect = domeVisualizerModal.getBoundingClientRect();
      const inBox = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!inBox) closeMasterVideoModal();
    });
  }

  // Activar reproducción de video al hacer clic ÚNICAMENTE en Volcán Master Suite
  const masterCardMedia = document.querySelector('.lodge-card-media[data-dome-key="master"]');
  if (masterCardMedia) {
    masterCardMedia.addEventListener('click', openMasterVideoModal);
    masterCardMedia.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openMasterVideoModal();
      }
    });
  }

  /* -------------------------------------------------------
     L. ANIMACIÓN CINEMÁTICA DE ESTRELLAS Y VÍA LÁCTEA (SPA TERMAL)
     ------------------------------------------------------- */
  function initSpaCelestialAnimation() {
    const canvas = document.getElementById('spaStarsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId;
    const stars = [];
    const STAR_COUNT = 95;

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    }

    function initStars() {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random(),
          y: Math.random() * 0.9, // Distribuidas sobre las montañas en el cielo
          radius: Math.random() * 1.4 + 0.5,
          baseAlpha: Math.random() * 0.45 + 0.35,
          twinkleSpeed: Math.random() * 0.035 + 0.012,
          twinklePhase: Math.random() * Math.PI * 2,
          color: Math.random() > 0.35 ? '#ffffff' : (Math.random() > 0.5 ? '#e0f0ff' : '#ffe9c7'),
          isShootingCandidate: Math.random() < 0.15
        });
      }
    }

    // Estrella fugaz ocasional hiper-fluida
    let shootingStar = null;
    let nextShootingTime = Date.now() + 3500;

    function maybeTriggerShootingStar(now) {
      if (!shootingStar && now > nextShootingTime) {
        shootingStar = {
          x: Math.random() * width * 0.8 + width * 0.1,
          y: Math.random() * height * 0.35,
          len: Math.random() * 80 + 50,
          speed: Math.random() * 12 + 10,
          angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
          alpha: 1,
          life: 0,
          maxLife: 28
        };
        nextShootingTime = now + Math.random() * 7000 + 4500;
      }
    }

    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          loop();
        }
      });
    }, { threshold: 0.1 });
    observer.observe(canvas);

    function loop() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('save-data')) {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          ctx.beginPath();
          ctx.arc(s.x * width, s.y * height, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = s.baseAlpha;
          ctx.fill();
        }
        animationFrameId = null;
        return;
      }

      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);
      const now = Date.now();

      // Render de estrellas con respiración luminosa
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.twinklePhase += s.twinkleSpeed;
        const currentAlpha = s.baseAlpha + Math.sin(s.twinklePhase) * 0.35;
        const clampedAlpha = Math.max(0.08, Math.min(1, currentAlpha));

        const posX = s.x * width;
        const posY = s.y * height;

        ctx.beginPath();
        ctx.arc(posX, posY, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = clampedAlpha;
        ctx.fill();

        // Aura de brillo para estrellas mayores
        if (s.radius > 1.2 && clampedAlpha > 0.6) {
          ctx.beginPath();
          ctx.arc(posX, posY, s.radius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = clampedAlpha * 0.22;
          ctx.fill();
        }
      }

      // Render de estrella fugaz
      maybeTriggerShootingStar(now);
      if (shootingStar) {
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.life++;
        shootingStar.alpha = 1 - (shootingStar.life / shootingStar.maxLife);

        ctx.save();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = Math.max(0, shootingStar.alpha);
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(
          shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.len,
          shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.len
        );
        ctx.stroke();
        ctx.restore();

        if (shootingStar.life >= shootingStar.maxLife) {
          shootingStar = null;
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(loop);
    }

    window.addEventListener('resize', () => {
      resizeCanvas();
    });

    resizeCanvas();
    initStars();
    loop();
  }

  // Inicializar canvas de estrellas
  initSpaCelestialAnimation();

  /* -------------------------------------------------------
     M. MOTOR CINEMÁTICO 4K: LLAMAS REALISTAS & LUCES DE BALCÓN (GASTRONOMÍA)
     ------------------------------------------------------- */
  function initGastronomyLightsEngine() {
    const canvas = document.getElementById('gastroLightsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animId = null;
    let isVisible = true;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          loop();
        }
      });
    }, { threshold: 0.1 });
    observer.observe(canvas);

    // Velas reales fotografiados en astronomy.jpg (coordenadas normalizadas sobre el fuego real)
    // Coordenadas calculadas exactamente sobre la mecha de cada vela
    const CANDLES = [
      // 1. Vela blanca delgada y alta en el candelabro de la mesa
      { x: 0.248, y: 0.142, baseRadius: 18, innerRadius: 5.5, freq: 0.08, phase: 0 },
      // 2. Vela cilíndrica blanca gruesa en la mesa
      { x: 0.522, y: 0.355, baseRadius: 28, innerRadius: 8.5, freq: 0.065, phase: 1.7 },
      // 3. Portavelas / vela de fondo en la mesa
      { x: 0.812, y: 0.445, baseRadius: 22, innerRadius: 7.0, freq: 0.075, phase: 3.2 },
      // 4. Frasco velón en el piso de madera (derecha)
      { x: 0.472, y: 0.355, baseRadius: 24, innerRadius: 7.5, freq: 0.055, phase: 2.4 },
      // 5. Vela en el piso de madera (extremo izquierdo)
      { x: 0.102, y: 0.415, baseRadius: 20, innerRadius: 6.5, freq: 0.06, phase: 4.1 },
      // 6. Vela en el piso de madera (medio izquierda)
      { x: 0.288, y: 0.245, baseRadius: 19, innerRadius: 6.0, freq: 0.07, phase: 5.3 }
    ];

    // Bombillas reales de la guirnalda sobre la barandilla de madera
    const BULBS = [
      { x: 0.038, y: 0.495, r: 8,  speed: 0.035, phase: 0.2 },
      { x: 0.085, y: 0.475, r: 9,  speed: 0.028, phase: 1.5 },
      { x: 0.145, y: 0.460, r: 10, speed: 0.042, phase: 3.1 },
      { x: 0.222, y: 0.445, r: 11, speed: 0.031, phase: 0.8 },
      { x: 0.298, y: 0.435, r: 9,  speed: 0.025, phase: 2.2 },
      { x: 0.368, y: 0.428, r: 10, speed: 0.038, phase: 4.5 },
      { x: 0.440, y: 0.420, r: 9,  speed: 0.029, phase: 1.1 },
      { x: 0.512, y: 0.415, r: 11, speed: 0.033, phase: 3.7 },
      { x: 0.582, y: 0.410, r: 9,  speed: 0.027, phase: 5.0 },
      { x: 0.655, y: 0.405, r: 10, speed: 0.041, phase: 0.4 },
      { x: 0.725, y: 0.400, r: 9,  speed: 0.030, phase: 2.9 },
      { x: 0.800, y: 0.395, r: 10, speed: 0.036, phase: 4.2 }
    ];

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    }

    let time = 0;

    function renderFrame() {
      ctx.clearRect(0, 0, width, height);
      time += 0.05;

      // 1. Resplandor cinemático de las bombillas de la guirnalda (Bokeh & Filament)
      for (let i = 0; i < BULBS.length; i++) {
        const b = BULBS[i];
        const px = b.x * width;
        const py = b.y * height;
        const pulse = Math.sin(time * b.speed * 40 + b.phase);
        const intensity = 0.55 + pulse * 0.25;

        // Halo óptico cálido (bloom difuso)
        const haloGrad = ctx.createRadialGradient(px, py, 0, px, py, b.r * 2.6);
        haloGrad.addColorStop(0, `rgba(255, 205, 95, ${0.45 * intensity})`);
        haloGrad.addColorStop(0.4, `rgba(255, 145, 30, ${0.18 * intensity})`);
        haloGrad.addColorStop(1, 'rgba(255, 120, 0, 0)');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(px, py, b.r * 2.6, 0, Math.PI * 2);
        ctx.fill();

        // Filamento incandescente de alta intensidad
        const coreGrad = ctx.createRadialGradient(px, py, 0, px, py, b.r * 0.8);
        coreGrad.addColorStop(0, `rgba(255, 255, 240, ${0.85 * intensity})`);
        coreGrad.addColorStop(0.5, `rgba(255, 225, 130, ${0.65 * intensity})`);
        coreGrad.addColorStop(1, 'rgba(255, 180, 50, 0)');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(px, py, b.r * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Respiración luminosa y llama de fuego física de cada vela
      for (let i = 0; i < CANDLES.length; i++) {
        const c = CANDLES[i];
        const cx = c.x * width;
        const cy = c.y * height;

        // Ondulación termodinámica orgánica (múltiples armónicos)
        const flicker1 = Math.sin(time * c.freq * 45 + c.phase);
        const flicker2 = Math.cos(time * c.freq * 80 + c.phase * 1.5);
        const naturalNoise = (flicker1 * 0.7 + flicker2 * 0.3);
        const flameHeightMod = 1 + naturalNoise * 0.16;
        const flameTilt = naturalNoise * 2.2; // inclinación física en grados por micro-corrientes de aire

        // A. Resplandor difuso de la vela (calidez ambiental alrededor de la llama)
        const ambientR = c.baseRadius * (1.6 + naturalNoise * 0.2);
        const ambientGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, ambientR);
        ambientGrad.addColorStop(0, `rgba(255, 175, 45, ${0.52 + naturalNoise * 0.15})`);
        ambientGrad.addColorStop(0.35, `rgba(255, 125, 20, ${0.22 + naturalNoise * 0.08})`);
        ambientGrad.addColorStop(1, 'rgba(255, 90, 0, 0)');

        ctx.fillStyle = ambientGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, ambientR, 0, Math.PI * 2);
        ctx.fill();

        // B. Llama física estilizada de alta definición (Gota de fuego luminosa)
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate((flameTilt * Math.PI) / 180);

        const flameW = c.innerRadius * (1 - naturalNoise * 0.08);
        const flameH = c.innerRadius * 2.2 * flameHeightMod;

        // Núcleo caliente interno (azul base + ámbar + centro blanco)
        const flameGrad = ctx.createRadialGradient(0, flameH * 0.15, 0, 0, 0, flameH);
        flameGrad.addColorStop(0, 'rgba(255, 255, 250, 0.95)');
        flameGrad.addColorStop(0.25, 'rgba(255, 220, 110, 0.85)');
        flameGrad.addColorStop(0.65, 'rgba(255, 120, 20, 0.65)');
        flameGrad.addColorStop(0.9, 'rgba(90, 110, 255, 0.25)'); // Base azul de combustión pura
        flameGrad.addColorStop(1, 'rgba(255, 80, 0, 0)');

        ctx.fillStyle = flameGrad;
        ctx.beginPath();
        // Dibujo de curva Bezier para forma de lágrima de llama perfecta
        ctx.moveTo(0, -flameH * 0.6);
        ctx.bezierCurveTo(flameW, -flameH * 0.2, flameW, flameH * 0.35, 0, flameH * 0.35);
        ctx.bezierCurveTo(-flameW, flameH * 0.35, -flameW, -flameH * 0.2, 0, -flameH * 0.6);
        ctx.fill();

        ctx.restore();
      }
    }

    function loop() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('save-data')) {
        renderFrame();
        animId = null;
        return;
      }
      if (!isVisible) {
        animId = null;
        return;
      }
      renderFrame();
      animId = requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);
    resize();
    loop();
  }

  // Inicializar motor de velas y guirnaldas
  initGastronomyLightsEngine();

  /* -------------------------------------------------------
     N. HERO VIDEO DE ALTA DEFINICIÓN (AUTOPLAY CONTINUO)
     ------------------------------------------------------- */
  const heroVideoBg = document.getElementById('heroVideoBg');
  if (heroVideoBg) {
    heroVideoBg.play().catch(() => {
      // Si el navegador requiere interacción por políticas de autoplay
      const startVideoOnce = () => {
        heroVideoBg.play().catch(() => {});
        window.removeEventListener('click', startVideoOnce);
        window.removeEventListener('scroll', startVideoOnce);
        window.removeEventListener('touchstart', startVideoOnce);
      };
      window.addEventListener('click', startVideoOnce, { passive: true });
      window.addEventListener('scroll', startVideoOnce, { passive: true });
      window.addEventListener('touchstart', startVideoOnce, { passive: true });
    });

    // Pausar reproducción cuando el usuario scrollea abajo para ahorrar recursos
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          heroVideoBg.play().catch(() => {});
        } else {
          heroVideoBg.pause();
        }
      });
    }, { threshold: 0.1 });
    heroObserver.observe(heroVideoBg);
  }

  /* -------------------------------------------------------
     O. GALLERY LIGHTBOX CONTROLLER (HIGH DEFINITION MODAL)
     ------------------------------------------------------- */
  const galleryModal = document.getElementById('galleryLightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxIndex = document.getElementById('lightboxIndex');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');
  const galleryItems = document.querySelectorAll('.gallery-clickable');

  const galleryData = [
    { src: 'assets/images/gallery/gallery-1-sunset.webp', fallback: 'assets/images/gallery/gallery-1-sunset.jpg', caption: 'Atardecer dorado en Volcán Master Suite con tina nórdica privada y vista a los Andes.' },
    { src: 'assets/images/gallery/gallery-2-interior.webp', fallback: 'assets/images/gallery/gallery-2-interior.jpg', caption: 'Suite interior con chimenea a leña, cama king size y domo panorámico para observación nocturna.' },
    { src: 'assets/images/gallery/gallery-3-spa.webp', fallback: 'assets/images/gallery/gallery-3-spa.jpg', caption: 'Circuito hidrotermal en tina nórdica artesanal de cedro a 38°C en medio de la naturaleza.' },
    { src: 'assets/images/gallery/gallery-4-dinner.webp', fallback: 'assets/images/gallery/gallery-4-dinner.jpg', caption: 'Cena gourmet a la luz de las velas en terraza privada con vista al valle nocturno iluminado.' },
    { src: 'assets/images/gallery/gallery-5-stargazing.webp', fallback: 'assets/images/gallery/gallery-5-stargazing.jpg', caption: 'Observación astronómica guiada bajo la Vía Láctea con telescopio óptico profesional y fogata.' },
    { src: 'assets/images/gallery/gallery-6-breakfast.webp', fallback: 'assets/images/gallery/gallery-6-breakfast.jpg', caption: 'Desayuno artesanal con pan caliente, frutas andinas, café de altura y vista a los cañones del Ilaló.' },
    { src: 'assets/images/gallery/gallery-7-massage.webp', fallback: 'assets/images/gallery/gallery-7-massage.jpg', caption: 'Masaje descontracturante con piedras calientes de basalto volcánico en pabellón abierto.' },
    { src: 'assets/images/gallery/gallery-8-hiking.webp', fallback: 'assets/images/gallery/gallery-8-hiking.jpg', caption: 'Rutas ecológicas y trekking hasta la cumbre del Volcán Ilaló con vista al volcán Cotopaxi.' },
    { src: 'assets/images/gallery/gallery-9-refugio.webp', fallback: 'assets/images/gallery/gallery-9-refugio.jpg', caption: 'Cabaña alpina de madera y cristal para familias, con fogata de piedra y jardines nativos.' }
  ];

  let currentGalleryIndex = 0;

  function showGalleryItem(index) {
    if (!galleryModal || index < 0 || index >= galleryData.length) return;
    currentGalleryIndex = index;
    const item = galleryData[index];
    if (lightboxImg) {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.caption;
      lightboxImg.onerror = () => {
        lightboxImg.src = item.fallback;
      };
    }
    if (lightboxCaption) lightboxCaption.textContent = item.caption;
    if (lightboxIndex) lightboxIndex.textContent = String(index + 1);
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.getAttribute('data-index') || '0', 10);
      showGalleryItem(idx);
      if (galleryModal && typeof galleryModal.showModal === 'function') {
        galleryModal.showModal();
      }
    });
  });

  if (lightboxCloseBtn && galleryModal) {
    lightboxCloseBtn.addEventListener('click', () => galleryModal.close());
    galleryModal.addEventListener('click', (e) => {
      if (e.target === galleryModal) galleryModal.close();
    });
  }

  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', () => {
      const nextIdx = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
      showGalleryItem(nextIdx);
    });
  }

  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', () => {
      const nextIdx = (currentGalleryIndex + 1) % galleryData.length;
      showGalleryItem(nextIdx);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!galleryModal || !galleryModal.open) return;
    if (e.key === 'ArrowLeft' && lightboxPrevBtn) lightboxPrevBtn.click();
    if (e.key === 'ArrowRight' && lightboxNextBtn) lightboxNextBtn.click();
    if (e.key === 'Escape') galleryModal.close();
  });

  // Initial calculation and language hydration
  applyLanguage(currentLang);
  recalculateQuote();

  /* -------------------------------------------------------
     P. ACTIVE NAV LINK — INTERSECTION OBSERVER
     Highlights the correct nav item as sections come into view
     ------------------------------------------------------- */
  const navSections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.lodge-nav-link[href^="#"]');

  if (navLinks.length > 0 && navSections.length > 0) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === '#' + id) {
              link.classList.add('is-active');
            } else {
              link.classList.remove('is-active');
            }
          });
        }
      });
    }, { threshold: 0.25, rootMargin: '-10% 0px -60% 0px' });

    navSections.forEach((section) => navObserver.observe(section));
  }

  /* -------------------------------------------------------
     Q. STICKY BOTTOM BOOKING BAR (Mobile)
     Shows after scrolling past hero section
     ------------------------------------------------------- */
  const stickyBar = document.getElementById('stickyBookingBar');
  const heroSection = document.querySelector('.lodge-hero-section') || document.querySelector('section');

  if (stickyBar && heroSection) {
    const stickyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          stickyBar.classList.add('visible');
        } else {
          stickyBar.classList.remove('visible');
        }
      });
    }, { threshold: 0.1 });
    stickyObserver.observe(heroSection);
  }

  /* -------------------------------------------------------
     R. SAVE-DATA & SLOW CONNECTION DETECTION
     Disables video autoplay and reduces canvas animations
     only on explicit Save-Data or 2G connections
     ------------------------------------------------------- */
  (function handleSlowConnection() {
    try {
      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const isSaveData = conn && conn.saveData === true;
      const isVerySlow = conn && (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g');

      if (isSaveData || isVerySlow) {
        const heroV = document.getElementById('heroVideoBg');
        if (heroV) {
          heroV.pause();
        }
        document.documentElement.classList.add('save-data');
      } else {
        const heroV = document.getElementById('heroVideoBg');
        if (heroV && heroV.paused) {
          heroV.play().catch(() => {});
        }
      }
    } catch (e) {}
  })();

});
