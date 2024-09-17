# Twitch Giphy

## Descripción

Este script te permite mostrar GIFs aleatorios de Giphy en tu stream de Twitch cuando se canjea un reward personalizado.

## Configuración

1. **Obtén tu API Key de Giphy:**
   - Ve a [https://developers.giphy.com/](https://developers.giphy.com/) y crea una cuenta de desarrollador si aún no lo has hecho.
   - Crea una nueva aplicación y selecciona el tipo de SDK como "Website".
   - Copia la API Key que se te proporciona.

2. **Crea un Reward Personalizado en Twitch:**
   - Ve a tu panel de control de creador en Twitch.
   - Ve a la sección de "Puntos de canal" y luego a "Rewards".
   - Crea un nuevo reward personalizado y asígnale un nombre y un costo en puntos de canal.


3. **Añade el Script a tu Overlay:**
   - Utiliza un software de streaming como OBS Studio para añadir una nueva fuente de navegador.
   - Configura la URL de la fuente del navegador para que apunte a la ubicación donde has alojado el script.
   https://seyacat.github.io/TwitchGiphy/?api-key=YOUR_API_KEY&custom-reward-id=YOUR_CUSTOM_REWARD_ID

## Uso

Una vez que hayas configurado todo, cuando un espectador canjee tu reward personalizado, el script buscará en Giphy un GIF aleatorio relacionado con el mensaje del reward y lo mostrará en tu overlay.

## Personalización

Puedes personalizar el script aún más editando el archivo `giphy.js`. Por ejemplo, puedes cambiar la clasificación de contenido de los GIFs, el tiempo que se muestra cada GIF, etc.
