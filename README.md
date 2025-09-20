# Prueba técnica – Componente de Vacaciones (React + SCSS)

Vacations App es una aplicación sencilla para gestionar solicitudes de vacaciones. Permite crear nuevas solicitudes, revisar su estado y visualizar de forma clara el balance de días disponibles mediante contadores dinámicos. Su objetivo es facilitar a las personas usuarias el control de sus días de descanso, reduciendo errores y ofreciendo una experiencia organizada y fácil de usar.

## Estructura del proyecto

## Inicio del proyecto

- Ejecutar el comando `pnpm install && pnpm dev`

## Decisiones técnicas

- Utilizar tailwindcss para hacer los estilos de una manera mas sencilla
- Crear un componente `Vacations.jsx` para unificar toda la pantalla
- Utilizar comando [configurar vite](./llm/commands/configure-vite-project.md)
- Crear archivo para el editor y el formato [prettier](./.prettierrc)
- Haremos uso de una herramienta sugerida por `chatgpt` para manejar `server state` llamada `React Query`

## Herramientas

- Utilizamos como gestor de paquetees `pnpm`
- Para crear el proyecto el comando `pnpm create vite`
