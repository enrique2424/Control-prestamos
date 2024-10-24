import Swal from 'sweetalert2';

class SweetAlert2 {
	alert = texto => {
		Swal.fire(texto, '', 'warning');
	};

	success = async () => {
		const res = await Swal.fire({
			title: 'Ejecutar la operacion?',
			text: '',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si',
			cancelButtonText: 'Cancelar'
		});

		return res;
	};

	confirm = () => {
		Swal.fire('Operacion Exitosamente!', '', 'success');
	};

	error = texto => {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: texto,
			footer: ''
		});
	};
}

const swal = new SweetAlert2();

export default swal;
