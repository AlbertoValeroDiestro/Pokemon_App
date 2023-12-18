# Instruciones de Instalación
1. Es necesario tener instalado una base de datos MySQL, recomendable XAMPP
o similar. Se ha utilizado `MySQL: MariaDB 10.4.27`.
2. Necesario tener instalado `Node.js v20.10.`. Por lo tanto,
solo se garantiza su funcionamiento con esta versión.
3. Arrancar el proceso demonio de la Base de datos
`mysql -u root`
4. Importante. tener creado un usuario `root` en la base de datos `sin password`. De lo contrario el servidor no arrancaria.
5. Importante. crear una base de datos de nombre `pokemon_app` `CREATE DATABASE pokemon_app`. De lo contrario el servidor no arrancaria.
6. Nos situamos en el directorio `/Pokemon_App/node_backend/` para arrancar nuestrro servidor.
7. Ejecutamos esta instrución para arrancarlo `node ServerApp.js`. Si tenemos usuario `root` sin password en nuestra base de datos `MySQL` y además hemos creado nuestra base de datos `pokemon_app`. El servidor estará llevando a cabo en este momento las migraciones y por consiguiente creando las tablas correspondientes que se utilizan en este proyecto. Además, estará realizando una llamada a la API de origen y acto seguido introduciendo todos los datos en sus tablas correspondientes. Por último, nuestro servidor lanzará por consola `Running at http://localhost:8080/pokemons`. Lo que quiere decir que todo esta terminado y que nuestro servicio esta funcionando en esa dirección.
8. Pasamos a la parte Front-End, nos situamos en el directorio `/Pokemon_App/front_end`, ejecutamos `npm start` y esperamos a que compile. Una vez compilado
nuestro front-end estara en pie para acceder a través de `http://localhost:3000`

# Funcionamiento del Back End (Node.js)

## Estructura de carpetas

### `node_backend`
Funcionamiento general: Tras arrancar nuestro servidor mediante `ServerApp.js`, un servicio se encarga de ejecutar las migraciones. Después, son obtenidos los datos de la API origen. Otro servicio se encarga de almacenar dichos datos en la base de datos local del servidor. Por último, nuestro servidor se mantiene ofreciendo los datos requeridos a través de `http://localhost:8080/pokemons`.

### `config`
Contiene información en formato JSON de configuración para la base de datos y su posterior uso con Sequelize.

### `controller`
Contiene los controladores relacionados con el servidor local.

- `PokemonController.js`: Ofrece acceso a la base de datos local a través del correspondiente mapeo por Sequelize. Concretamente, tiene un método para obtener todos los pokemons y además es un módulo exportable.

### `migrations`
Contiene todos los archivos relacionados con la migración de la base de datos. En este caso, los archivos han sido creados automáticamente mediante las instrucciones correspondientes en la línea de comandos.

### `models`
Contiene todos los modelos que se están usando en la App. En este caso, `Pokemon`, `Type` y `Pokemon_Types`. Utiliza el ORM Sequelize para mapear las tablas y definir las asociaciones.

### `node_modules`
Contiene todos los módulos instalados de Node.js.

### `routes`
Contiene el archivo que define las rutas de nuestra app. En este caso, solo hay un archivo, `routes.js`, que utiliza `Router()` de express para manejar las rutas disponibles en nuestra app.

### `services`
Esta carpeta guarda servicios utilizados en nuestra app. Los servicios son los siguientes:

- `MigrationRunner.js`: Ofrece dos funciones principales, las cuales se utilizan para resetear las tablas de la base de datos y volver a crearlas corriendo las migraciones preconstruidas de la app.

- `DatabaseFiller.js`: Utiliza los datos que ofrece `ExternalAPICaller.js` para introducir los pokemons y sus tipos en la base de datos local.

- `ExternalAPICaller.js`: Ofrece cuatro funciones, de las cuales se exportan dos, principalmente para utilidad externa (`getAllPokemons()` y `getTypeData()`). Las funciones realizan llamadas a la API de origen pokeapi.co mediante axios y formatean los datos recibidos en JSON, conservando solo los datos necesarios.

### `ServerApp.js`
Es el archivo principal de nuestra aplicación. Ejecuta las migraciones, resetea y crea e inserta los datos en la base de datos local del servidor. Además, ofrece como recurso a través de `/pokemons` todos los pokemons almacenados y sus datos relacionados.

# Funcionamiento del Front-End (React)
Tras arrancar nuestra app el servicio estará funcionando en `http://localhost:3000`
## Estructura de carpetas
### `react_front`
En react front se encuentran todos los directorios relacionados con el proyecto Front-End de React.
### `node_modules`
Contiene todos los módulos instalados para uso con React.
### `public`
Archivos públicos que no se procesan por React, archivos estáticos. En nuestro caso, esta creada por defecto.
### `src`

En este directorio se almacena todo el codigo fuente y su estructura con relación a nuestro proyecto de React.
- `App.css`: Este es el archivo principal de hoja de estilos de nuestra aplicación, en nuestro caso ha sido creado por defecto aunque se han realizado
algunas modificaciones de estilo.
- `App.jsx`: Este es el archivo componente de nuestra App principal en cuestión, en el se están definiendo las rutas con gracias a `react-router-dom`.
La app tiene disponible actualmente 2 rutas distintas para la que se utilizan 2 componentes diferentes (`CompShowPokemons`) si no entra ningun tipo de parametro
y (`ShowSinglePokemon`) si entra un parametro llamado `id`.
- `App.test.js`: Es un ejemplo de prueba unitaria si en un futuro se quieren implementar, en nuestro caso ha sido creada de forma automatica.
- `index.css`: Es otro archivo, normalmente de inicio css para nuestra app que se importa en el archivo de inicio index.jsx, también ha sido creado de forma automatica.
- `index.jsx`: Es el punto de entrada principal de nuestra APP, en el se indica en que elemento se va a renderizar nuestra pagina, se importan librerias generales
y de normalización y control y además se indica cual es el componente principal de nuestra APP.
- `reportWebVitals.js`: También ha sido creado de forma automatica y es un archivo que utiliza funciones para medir el rendimiento y reportar medidas.
- `setupTests.js`: Es un archivo autocreado para la instalación de tests unitarios y demás.     

### `components`
En este directorio se almacenan los componentes personalizados que están siendo utilizados por la aplicación.
- `ShowPokemons.jsx`: Este componente es uno de los componentes principales, es utilizado en la raiz principal de nuestra App, y nos muestra
a través de una llamada con Axios a nuestro servidor todos los pokemons que hay disponibles. Además, utiliza estados y efectos para mostrarlos
de forma paginada y con un filtro por busqueda de nombre. Este componente utiliza otros componentes para su renderizado completo.
- `ShowSinglePokemon.jsx`: Es practicamente el mismo componente que ShowPokemons, con una llamada distinta ya que tan solo tiene que mostrar un Pokemon, Además utiliza otro componente distinto SinglePokemonCard, para mostrar el pokemon en cuestión.
- `AnimatedPokemonCard.jsx`: Es un componente utilizado por ShowPokemons. El componente recibe un pokemon desde su componente "padre" y utiliza react-spring para realizar algunas animaciones leves. Además, tambien esta utilizando dentro de si mismo otro componente PokemonCard.
- `PokemonCard.jsx`: PokemonCard es el componente que muestra el contenido de un pokemon y el diseño con el que se muestra realmente. Recibe un pokemon y una posible descripción, dependiendo si recibe descripción o no, además de ser invocado desde un sitio u otro, también actua de una manera distinta. Dentrro de el renderiza un Link de router-dom para navegar hacia el pokemon en cuestión, algo que maneja otro componente, SinglePokemonCard.
- `SinglePokemonCard.jsx`: Es el componente que se renderiza cuando queremos visualizar un solo pokemon en concreto, además este pokemon utiliza el componente PokemonCard pasandole un parametro de descripcion, el cual hace
que el mismo se comporte de manera distinta utilizando el componente WriteFX, para simular la escritura de una descripción de forma animada.
- `WriteFX.jsx`: El componente recibe un texto y simula una animación de escritura con retardo. Recibe un texto y un delay en ms y utiliza los estados propios de React, para simular una animación de escritura de texto.

## Versiones utilizadas

- MySQL: MariaDB 10.4.27
- NodeJS: v20.10.0
