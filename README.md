# Control de Préstamos y Cobros 💼💸

Este proyecto es una aplicación web desarrollada con **React** y **Material-UI** para gestionar el control de préstamos y cobros de manera eficiente. Proporciona una interfaz intuitiva para administrar clientes, registrar préstamos, realizar cobros y buscar detalles sobre el estado de cada operación financiera.

## Características ✨

- Gestión de préstamos y cobros.
- Gestión de registro de clientes.
- Gestión de billetera.
- Gestión de cartillas de control de pagos.
- Interfaz de usuario moderna basada en **Material-UI**.
- Integración con **Firebase** para autenticación.
- Soporte para **i18n** (internacionalización).
- Integración con gráficos interactivos usando **ApexCharts**.
- Búsquedas y filtrado de datos.
- Responsive design optimizado para dispositivos móviles.

## Tecnologías utilizadas 💻

- **⚛️ React**: Framework principal de desarrollo.
- **🛠️ Redux**: Para la gestión del estado de la aplicación.
- **🎨 Material-UI**: Biblioteca de componentes de interfaz de usuario.
- **🔗 Axios**: Cliente HTTP para realizar peticiones a las APIs.
- **🔥 Firebase**: Autenticación y almacenamiento en la nube.
- **🌍 i18next**: Soporte para internacionalización.
- **📊 ApexCharts**: Visualización interactiva de datos.
- **💨 TailwindCSS**: Para el diseño responsivo.



## Requisitos Previos

Antes de comenzar, tener instalado lo siguiente:

- Node.js v14 o superior
- Yarn v1.22 o superior
- Firebase CLI

### Instalación de Firebase CLI

Instalar la herramienta de Firebase CLI ejecutando:

```bash
npm install -g firebase-tools
```


1. **Node.js**: Recomendamos utilizar la versión `16.x` de Node.js. Si estás utilizando `NVM` (Node Version Manager), puedes instalar y usar esta versión con los siguientes comandos:

```bash
    nvm install 16
    nvm use 16
```

2. **Yarn**: El proyecto usa Yarn como gestor de paquetes. Si no tienes Yarn instalado, puedes hacerlo con:

```bash
    npm install -g yar
```

## Instalación 🛠️

Sigue estos pasos para configurar el entorno de desarrollo local:



1. Clona el repositorio:
   ```bash
   git clone https://github.com/enrique2424/Control-prestamos.git
   cd control-prestamos
   
## Instalación de Dependencias

Ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

```bash
yarn install
```

## Ejecutar el Proyecto

Una vez instaladas las dependencias, puedes ejecutar el proyecto localmente con el siguiente comando:

```bash
yarn start
```

Esto iniciará la aplicación utilizando **Craco** (Create React App Configuration Override).

## Comandos Útiles

- **Compilar el Proyecto para Producción**:
  
    ```bash
    yarn build
    ```

    Esto generará una versión optimizada del proyecto en el directorio `build/`.

- **Correr Tests**:

    ```bash
    yarn test
    ```

    Ejecuta los tests definidos en el proyecto.

- **Analizar el Bundle**:

    ```bash
    yarn analyze
    ```

    Esto ejecutará una compilación y generará un análisis del tamaño de los archivos generados en el bundle de producción.

## Detalles del Proyecto

Este proyecto utiliza diversas dependencias para su correcto funcionamiento, tales como:

- **Craco** template para la personalización.
- **Babel** para la transformación de JSX y TypeScript.
- **PostCSS 7 compatibility** para TailwindCSS.

## Demo en Producción

Puedes acceder a la versión en producción del proyecto utilizando el siguiente enlace:

- **URL del sitio en producción**: [CONTROL DE PRESTAMOS](https://app-cobros-91ea7.web.app/)

### Credenciales de Acceso (Demo)

Credenciales para usuario cobrador:

- **Usuario**: ejemplo@gmail.com
- **Contraseña**: 123456




