# Punto de Venta

_Para el backend me base en [point-of-sale-api](https://github.com/jceballos29/point-of-sale-api/tree/one-cluster)_

## Comenzando

### Pre-requisitos

1. Clonar el repositorio e ingresar a la carpeta del proyecto

```
git clone https://github.com/jceballos29/point-of-sale-client.git
cd point-of-sale-client/
```

2. Crear el archivo `.env` y agregar las variable, mira el archivo [.env.example](.env.example) para detalles:
```
VITE_API_URL=
VITE_TRYTON_URL=
VITE_COMPANY=
```

  * `VITE_API_URL`: Es el enlace de conexión con al API.
  * `VITE_TRYTON_URL`: Es el enlace que redirige al tryton.
  * `VITE_COMPANY`: Es el nombre de la empresa
  

3. Ingresar a la carpeta [src/constants](src/constants/) allí encontrará dos archivos: [roles.ts](src/constants/roles.ts) y [routes.ts](src/constants/routes.ts), aquí podrá hacer el cambio de las url de las rutas y de los roles de los usuarios como sea necesario

  * `roles.ts`
```
export const Roles = {
  ADMIN: 'admin',
  USER: 'user',
}
```
* `routes.ts`
```
export const Routes = {
  ROOT: '/',
  LOGIN: '/login',
  POINT_OF_SALE: '/point-of-sale'
}
```
4. Deberá ya tener la API en ejecución para que todo funcione correctamente
   
### Instalación 

1. Instalar dependencias

```
npm install
```

2. Ejecutar en modo desarrollo

```
npm run dev
```
- Por defecto el programa se ejecutará en el puerto `5173` en la url [http://localhost:5173/](http://localhost:5173/)

_Ya podrá realizar los cambios que considere pertinentes._

## Despliegue

1. Compilar el programa
```
npm run build
```
Este comando generará un carpeta `/dist` con todos los archivos necesarios para su despliegue. Para probar estos archivos use el comando `npm run preview`

## Construido con

* [React JS](https://react.dev/) - Librería de interfaz de usuario
* [Vite](https://vitejs.dev/) - Servidor de desarrollo local
* [Tailwind CSS](https://rometools.github.io/rome/) -  Framework de CSS
## Autores

* **Juan Ceballos** - *Desarrollador* - [jceballos29](https://github.com/jceballos29)

## Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE.md](LICENSE.md) para detalles