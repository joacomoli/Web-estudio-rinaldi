# Estudio Rinaldi - Sitio Web

Sitio web oficial del Estudio Rinaldi - Abogados de Negocios.

## Características

- Diseño minimalista y elegante
- Paleta de colores: Blanco, Negro, Crema y Oro
- Totalmente responsive (móvil, tablet, desktop)
- Formulario de contacto con PHP
- Galería de clientes/marcas
- Navegación suave entre secciones
- Animaciones sutiles al hacer scroll

## Estructura del Proyecto

```
Web-estudio-rinaldi/
├── index.html          # Página principal
├── css/
│   └── style.css      # Estilos principales
├── js/
│   └── main.js        # JavaScript para interactividad
├── php/
│   └── contact.php    # Procesamiento del formulario de contacto
├── marcas/            # Logos de clientes
│   └── logo1.png ... logo45.png
├── logo.png           # Logo del estudio
└── README.md          # Este archivo
```

## Requisitos

- Servidor web con PHP (versión 7.0 o superior)
- Navegador web moderno (Chrome, Firefox, Safari, Edge)

## Instalación

1. Clonar o descargar el proyecto
2. Colocar los archivos en el directorio raíz de tu servidor web
3. Configurar el email de destino en `php/contact.php` (línea 6)
4. Asegurarse de que el servidor tenga permisos de escritura para el archivo `contact_log.txt` (si se desea usar el log)

## Configuración del Formulario de Contacto

Editar el archivo `php/contact.php` y cambiar la línea 6:

```php
$to_email = 'tu-email@ejemplo.com'; // Cambiar por el email real
```

## Uso

1. Abrir `index.html` en un navegador o acceder a través del servidor web
2. Navegar por las diferentes secciones usando el menú superior
3. El formulario de contacto enviará los mensajes al email configurado

## Secciones del Sitio

- **Inicio**: Hero section con información principal
- **Quiénes Somos**: Historia y filosofía del estudio
- **Áreas de Trabajo**: Todas las especialidades legales
- **Profesionales**: Información de los abogados principales
- **Nuestros Clientes**: Galería de logos de empresas clientes
- **Contacto**: Formulario y información de contacto

## Tecnologías Utilizadas

- HTML5
- CSS3 (con variables CSS y Grid/Flexbox)
- JavaScript (Vanilla JS, sin dependencias)
- PHP (para el formulario de contacto)
- Google Fonts (Playfair Display e Inter)

## Personalización

### Colores

Los colores se pueden modificar en `css/style.css` en la sección `:root`:

```css
:root {
    --color-white: #FFFFFF;
    --color-black: #000000;
    --color-cream: #F5F1E8;
    --color-gold: #D4AF37;
    /* ... */
}
```

### Fuentes

Las fuentes se pueden cambiar modificando las importaciones en `index.html` y las variables CSS.

## Notas

- Los logos de clientes se cargan dinámicamente desde la carpeta `marcas/`
- El formulario de contacto requiere un servidor con PHP funcionando
- Para desarrollo local, se puede usar XAMPP, WAMP, o el servidor PHP integrado

## Soporte

Para consultas sobre el sitio web, contactar al Estudio Rinaldi.

---

© 2024 Estudio Rinaldi - Abogados de Negocios

