import handleExportPDF from "../exportPDF.js";
import {columns} from "../datatable.columns.js";

const spanishTranslation = {
    "decimal":        "",
    "emptyTable":     "No hay datos disponibles en la tabla",
    "info":           "Mostrando _START_ a _END_ de _TOTAL_ entradas",
    "infoEmpty":      "Mostrando 0 a 0 de 0 entradas",
    "infoFiltered":   "(filtrado de _MAX_ entradas totales)",
    "infoPostFix":    "",
    "thousands":      ".",
    "lengthMenu":     "Mostrar _MENU_ entradas",
    "loadingRecords": "Cargando...",
    "processing":     "Procesando...",
    "search":         "Buscar:",
    "zeroRecords":    "No se encontraron registros coincidentes",
    "aria": {
        "orderable":  "Ordenar por esta columna",
        "orderableReverse": "Orden inverso por esta columna"
    }
};

export const generatePdf = async (id) => {
    try {
        // data.key = "n1c0145"
        const response = await fetch(`http://diaginm.inamujer.gob.ve:3000/registro/id/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        // console.log(json)
        if (!json.data) {
            console.log('Error:', json.error);
        }else{
            const data = json.data[0]
            console.log(data);
            handleExportPDF(data);
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
}

export const getData = async () => {
    try {
        const response = await fetch('http://diaginm.inamujer.gob.ve:3000/registro/', {
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
            layout: {
                top: {
                    buttons: ['csv', 'excel']
                }
            },
            data: data,
            columns: columns,
            // [
            //     // {
            //     //     data: 'nombre',
            //     //     // visible:false
            //     //     // title: 'nombre'
            //     // },
            //     // {
            //     //     data: 'apellido',
            //     //     // title: 'apellido'
            //     // },
            //     // {
            //     //     data: 'estado_id',
            //     //     // title: 'estado'
            //     // },
            //     // {
            //     //     data: 'sede_id',
            //     //     // title: 'sede'
            //     // },
            //     // {
            //     //     title: ''
            //     // }
            // ],
            columnDefs: [
                // { targets: [0,3], visible: true },
                {
                    targets: -1,
                    orderable: false,

                    render: function (data, type, row, meta) {
                        let fila = meta.row;
                        let botones = `
                <button id="hello" class='btn btn-indigo btn-circle hello' data-id="${row.id}">
                    <i class="bi bi-download"></i>
                </button>`;
                        return botones;
                    }
                }
            ],
            "bDestroy": true
        });

        $('.hello').click(function (e) { 
            e.preventDefault();
            const id = $(this).data().id
            generatePdf(id)
            
        });
    }
    catch (error) {
        console.error('Error:', error);
        if(error){
            $('#example').append('<div class="alert alert-danger text-center" role="alert">Error al cargar los datos</div>');
            return 
        }
        if(!data){
            $('#example').append('<div class="alert alert-danger text-center" role="alert">No hay datos</div>');
        }
       
       
    }
}