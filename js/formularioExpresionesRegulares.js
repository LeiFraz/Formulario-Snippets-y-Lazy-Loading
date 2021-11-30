const formulario = document.getElementById('formu');
const inputs = document.querySelectorAll('#formu input');
/*  - Con el "querySelectorAll" se obtiene un arreglo de todos los inputs 
    - con #formu que seria el id hacemos referencia al formulario, y con input hacemos referencia
        a todos los inputs dentro del formulario
*/

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const validarFormulario = () => {
	console.log('me ejecuto');
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

/*creamos un evento que cuando se precione el boton de submit, se realize una funcion anonima*/
formulario.addEventListener('submit', (e) => {
	e.preventDefault(); /*el usuario ya no envia los datos cuando se pone esta sentencia*/
});