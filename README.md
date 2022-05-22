# Grupo Salinas
 Prueba Técnica
 

## Instrucciones de Instalación

### En la raíz de la carpeta del proyecto

`cd FrontEnd`

`npm install`

`pip install django psycopg2 django-cors-headers`

### Configuración de la base de datos (POSTGRESQL)

* Nombre de la base de datos: `gruposalinas`
* Nombre del usuario/rol: `salinas_us`
* Contraseña del usuario/rol: `123456`
* HOST: `localhost`
* Puerto: `5432`
* Extensión de la DB: `unaccent`

Para restaurar la base de datos, usar el archivo 'backup_db'

## Instrucciones de Ejecución

### Para Django (Dentro de la carpeta BackEnd)

+ Realizar solo en la primer ejecución.
  + `py manage.py makemigrations`
  + `py manage.py migrate`

`py manage.py runserver 0:8002
`

### Para Django (Dentro de la carpeta FrontEnd)
`ng serve`


## Para ejecutar pruebas unitaras

`pip install pytest-django`

`pytest -s`
