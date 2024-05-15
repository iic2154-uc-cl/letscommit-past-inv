# Letscommit - Guía de Usuario

El módulo `letscommit` está diseñado para simplificar el proceso de generar y confirmar cambios en tu repositorio Git con mensajes de confirmación generados automáticamente. Esta guía te guiará a través de la instalación, configuración y uso del módulo.

## Instalación

Para instalar el módulo `letscommit`, sigue estos pasos:

1. Abre tu terminal o símbolo del sistema.

2. Ejecuta el siguiente comando para instalar el módulo usando `pip`:

  ```python
  pip install letscommit
  ```


## Primeros Pasos

1. **Iniciar Sesión o Registrarse:**

Antes de usar el módulo `letscommit`, debes iniciar sesión o registrarte para obtener una cuenta:

- Para iniciar sesión, utiliza el comando:
  ```
  letscommit --login
  ```

- Para registrarte y crear una nueva cuenta, utiliza el comando:
  ```
  letscommit --signup
  ```

2. **Verificar el Token:**

Para comprobar si tu token es válido, ejecuta el siguiente comando:

  ```python
  letscommit --check
  ```


## Generar Confirmaciones

Ahora que estás configurado, puedes empezar a generar confirmaciones utilizando el módulo `letscommit`.

1. **Agregar Cambios:**

Antes de generar una confirmación, asegúrate de agregar los cambios que deseas confirmar utilizando el comando `git add`:
  ```python
  git add archivo1 archivo2
  ```


2. **Iniciar Auto Commit:**

Para generar automáticamente y confirmar cambios, utiliza el siguiente comando:

  ```python
  letscommit --start
  ```


El módulo realizará los siguientes pasos:
- Recuperará los cambios de tu repositorio Git.
- Generará una lista de mensajes de confirmación.
- Te permitirá seleccionar un mensaje de confirmación de la lista o proporcionar uno personalizado.
- Creará una confirmación con el mensaje elegido.
- Enviará la información de la confirmación a la API.

3. **Realizar Push:**

Después de generar la confirmación, asegúrate de realizar un push de tus cambios al repositorio remoto utilizando el comando `git push`:

  ```python
  git push origin nombre_de_rama
  ```


## Elegir un Mensaje de Confirmación

El módulo te presentará una lista de mensajes de confirmación generados. Puedes elegir una de las opciones:
- Ingresa `0` para proporcionar un mensaje de confirmación personalizado.
- Ingresa el número correspondiente a uno de los mensajes de confirmación generados.

## Información Adicional

- Si encuentras algún problema o necesitas ayuda, puedes usar la opción `--help` para ver las opciones disponibles y ejemplos de uso:

  ```python
  letscommit --help
  ```

- Recuerda que el módulo se basa en tu repositorio Git y en una API configurada. Asegúrate de tener la configuración de Git necesaria.
