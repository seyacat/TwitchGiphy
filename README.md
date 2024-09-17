# Gif Rotation for Twitch

Este es un simple visualizador de gifs para Twitch que muestra gifs basados en los mensajes del chat.

## Configuración

1.  **Crea una cuenta de desarrollador de Twitch:** Si aún no tienes una, puedes crear una en [https://dev.twitch.tv/](https://dev.twitch.tv/).
2.  **Registra tu aplicación:** En el panel de control de tu desarrollador de Twitch, registra una nueva aplicación.
    *   Establece la URL de redirección OAuth en `http://localhost:8080/`.
    *   Añade `channel:read:redemptions` como un ámbito OAuth.
3.  **Crea un Custom Reward:** En tu panel de control de creador de Twitch, crea un nuevo Custom Reward.
    *   Establece el nombre y el costo como desees.
4.  **Obtén tu clave API de Giphy:** Crea una cuenta de desarrollador de Giphy en [https://developers.giphy.com/](https://developers.giphy.com/) y obtén una clave API.
5.  **Actualiza el archivo `script.js`:**
    *   Reemplaza `YOUR_TWITCH_CLIENT_ID` con el ID de cliente de tu aplicación Twitch.
    *   Reemplaza `YOUR_GIPHY_API_KEY` con tu clave API de Giphy.
    *   Reemplaza `YOUR_CUSTOM_REWARD_ID` con el ID de tu Custom Reward.
6.  **Inicia el servidor web:** Navega hasta el directorio del proyecto en tu terminal y ejecuta `npm start`.
7.  **¡Pruébalo!** Inicia sesión en tu cuenta de Twitch y activa el Custom Reward en tu chat. Los espectadores ahora pueden canjear el reward para mostrar un gif en la transmisión.

## Personalización

Puedes personalizar la apariencia del visualizador de gifs editando el archivo `style.css`. También puedes ajustar la duración de la visualización del gif cambiando el valor de `timeout` en el archivo `script.js`.

## Contribuciones

Las solicitudes de extracción son bienvenidas. Para cambios importantes, abre un issue primero para discutir los cambios que te gustaría hacer.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)