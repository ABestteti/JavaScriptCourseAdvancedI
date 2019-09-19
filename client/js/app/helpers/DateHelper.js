class DateHelper {
	// DateHelper class is actually a static one once its
	// methods are all static.

	constructor() {
		throw new Error('The class DateHelper cannot be instantiated.');
	}

    static textoParaData(texto) {
   		// Convert the "texto"  parameter
		// to date object. Using spread operator "..."
		// pass to Date's constructor.
		// Using split to create an array from the string, and then
		// this array will have its elements changed by map function, which
		// encapsulates a arrow function "=>" to manipulate each element from 
		// the array. All this work has to be done to prepare the month and substract 1
		// from it. This is due to in Javascript month representation begins with 
		// 0 (January) till 11 (December).

        return new Date(...texto.split('-').map((item, indice) => item - (indice % 2)));
    }

    static dataParaTexto(data) {

		if (!!/^\d{4}-\d{2}-\d{2}$/.test(data)) {
			throw new Error('Invalid date format, expected yyyy-mm-dd.');
		}

        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }
}