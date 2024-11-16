const spanishTranslation = {
    "decimal": "",
    "emptyTable": "No hay datos disponibles en la tabla",
    "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
    "infoEmpty": "Mostrando 0 a 0 de 0 entradas",
    "infoFiltered": "(filtrado de _MAX_ entradas totales)",
    "infoPostFix": "",
    "thousands": ".",
    "lengthMenu": "Mostrar _MENU_ entradas",
    "loadingRecords": "Cargando...",
    "processing": "Procesando...",
    "search": "Buscar:",
    "zeroRecords": "No se encontraron registros coincidentes",
    "aria": {
        "orderable": "Ordenar por esta columna",
        "orderableReverse": "Orden inverso por esta columna"
    }
};

export const getData = async () => {
    try {
        const response = await fetch('http://localhost:3000/registro/matriz', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const json = await response.json();
        const data = json.data
        // console.log(JSON.stringify(json));
        console.log(data)
        $('#example').DataTable({
            language: spanishTranslation,
            lengthMenu: [25,100],
            layout: {
                top: {
                    buttons: ['csv', 'excel']
                }
            },
            data: data,
            columns: [
                { data: 'estado_id', title: 'Estado' },
                { data: 'Casa de abrigo', title: 'Casa de abrigo' },
                { data: 'cafim', title: 'cafim' },
                { data: 'compartida', title: 'Compartida' },
                { data: 'defensoria', title: 'Defensoria' },
                { data: 'inamujer', title: 'Inamujer' },
                { data: 'uaim', title: 'uaim' },
                { data: 'total_estado', title: 'Total estado' }
            ],
            "bDestroy": true
        });
    }
    catch (error) {
        console.error('Error:', error);
        if (error) {
            $('#example').append('<div class="alert alert-danger text-center" role="alert">Error al cargar los datos</div>');
            return
        }
        if (!data) {
            $('#example').append('<div class="alert alert-danger text-center" role="alert">No hay datos</div>');
        }
    }
}

