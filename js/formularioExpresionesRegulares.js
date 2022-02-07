const formulario = document.getElementById('formu');
const inputs = document.querySelectorAll('#formu input');
/*  - Con el "querySelectorAll" se obtiene un arreglo de todos los inputs 
    - con #formu que seria el id hacemos referencia al formulario, y con input hacemos referencia
        a todos los inputs dentro del formulario
*/

// para los ID  se usaba #, y para las clases se usaban el .

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}

const validarFormulario = (evento) => {
	/*console.log('me ejecuto');*/
	/*console.log(evento.target.name);*/

	switch(evento.target.name){
		case "usuario":
			//console.log("funciona");
			
			/*expresiones.usuario.test("valor") podemos probar por consola si funciona o no, nos larga V o F
			dependiendo si lo escrito en el input corresponde con el atributo de la expresion.
			Otra forma es expresiones.usuario.test(evento.target.value) */

			/*PARAMETROS:
				- accedemos a EXPRESIONES que es nuestro objeto, y luego al atributo que deseamos comprobar.
				- EVENTO es el input que realizo un evento, el .target
				- "usuario" vendria a ser el nombre del input*/
			
			validarCampo(expresiones.usuario,evento.target,"usuario");
			

			//PARA HACERLO DINÁMICO SE CREO LA FUNCION "VALIDARCAMPO"
			/*if(expresiones.usuario.test(evento.target.value)){
				//accedemos al DIV con el ID clase grupo__usuario y removemos la clase formu_grupo-incorrecto.
				document.getElementById('grupo__usuario').classList.remove('formu__grupo-incorrecto');
				document.getElementById('grupo__usuario').classList.add('formu__grupo-correcto');
			
				accedemos al DIV con el ID grupo__usuario y luego a su elemento i.
				 en este añadimos la clase del icono.
				document.querySelector('#grupo__usuario i').classList.add('fa-check-circle');
				document.querySelector('#grupo__usuario i').classList.remove('fa-times-circle');
			
				//accedemos al texto de error para mostrarlo
				document.querySelector('#grupo__usuario .formu__input-error').classList.remove('formu__input-error-activo');
			}else{
				//accedemos al DIV con el ID clase grupo__usuario y removemos la clase formu_grupo-correcto.
				document.getElementById('grupo__usuario').classList.add('formu__grupo-incorrecto');
				document.getElementById('grupo__usuario').classList.remove('formu__grupo-correcto');
			
				accedemos al DIV con el ID grupo__usuario y luego a su elemento i.
				 en este añadimos la clase del icono.
				document.querySelector('#grupo__usuario i').classList.add('fa-times-circle');
				document.querySelector('#grupo__usuario i').classList.remove('fa-check-circle');
			
				//accedemos al texto de error para mostrarlo, va con el "." debido que es una clase
				document.querySelector('#grupo__usuario .formu__input-error').classList.add('formu__input-error-activo');
			}*/
		
		break;
		case "nombre":
			validarCampo(expresiones.nombre,evento.target,"nombre");
		break;
		case "password":
			validarCampo(expresiones.password,evento.target,"password");
			/* ponemos esa funcion para que se ejecute en caso de que se cambie la contraseña de nuevo
			debido que si ponia bien ambos campos, quedaba como correcto, y si volvia a modificar la contraseña
			quedaban como que eran iguales.*/
			validarContrasenia2();
		break;
		case "password2":
			validarContrasenia2();
		break;
		case "correo":
			validarCampo(expresiones.correo,evento.target,"correo");
		break;
		case "telefono":
			validarCampo(expresiones.telefono,evento.target,"telefono");
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formu__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formu__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formu__input-error`).classList.remove('formu__input-error-activo');

		campos[campo] = true; //campos['usuario'], campos['telefono'], etc
	}else{
		document.getElementById(`grupo__${campo}`).classList.add('formu__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formu__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formu__input-error`).classList.add('formu__input-error-activo');
	
		campos[campo] = false;
	}
};

const validarContrasenia2 = () =>{
	const inputContra1 = document.getElementById('password');
	const inputContra2 = document.getElementById('password2');

	if(inputContra1.value !== inputContra2.value){
		document.getElementById(`grupo__password2`).classList.add('formu__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formu__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formu__input-error`).classList.add('formu__input-error-activo');	

		campos['password'] = false; 
		/*se pone 'password' ya que es el que se necesita comprobar, el 'password2' se valida si coincide con el
		primero*/
	}else{
		document.getElementById(`grupo__password2`).classList.remove('formu__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formu__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formu__input-error`).classList.remove('formu__input-error-activo');	
	
		campos['password'] = true;
	}
}

/* por cada input, ejecuta un codigo con el parametro INPUT para poder identificarlo. */
inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario); 
	/* cuando presiona una letra se ejecuta "validarFormulario", para probar se puede poner console.log("texto") */
	input.addEventListener('blur', validarFormulario);
	/* cuando salen del input */
});

/*creamos un evento que cuando se precione el boton de submit, se realize una funcion anonima*/
formulario.addEventListener('submit', (e) => {
	e.preventDefault(); /*el usuario ya no envia los datos cuando se pone esta sentencia*/

	const terminos = document.getElementById('terminos');

	if(campos.usuario && campos.nombre && campos.password && campos.telefono && campos.correo && terminos.checked)
	{
		formulario.reset();

		document.getElementById('formu__mensaje-exito').classList.add('formu__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formu__mensaje-exito').classList.remove('formu__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formu__grupo-correcto').forEach((icono) =>{
			icono.classList.remove('formu__grupo-correcto');
		});
	}else{
		document.getElementById('formu__mensaje').classList.add('formu__mensaje-activo');
		setTimeout(() => {
			document.getElementById('formu__mensaje').classList.remove('formu__mensaje-activo');
		}, 5000);
	}
});