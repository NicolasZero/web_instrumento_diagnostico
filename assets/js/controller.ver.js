import handleExportPDF from "./exportPDF.js";

export const generatePdf = async (id) => {
    try {
        // data.key = "n1c0145"
        const response = await fetch(`http://localhost:3000/registro/${id}`, {
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
            // handleExportPDF(data);
            console.log(data);
        }


    }
    catch (error) {
        console.error('Error:', error);
    }
}

const dino = () => {
    console.log("dino");
    
}

export const getData = async () => {
    try {
        const response = await fetch('http://localhost:3000/registro/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const json = await response.json();
        const data = json.data
        // console.log(JSON.stringify(json));
        // console.log(data)
        $('#example').DataTable({
            layout: {
                topStart: {
                    buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
                }
            },
            data: data,
            columns: [
                {
                    data: 'nombre',
                    title: 'nombre'
                },
                {
                    data: 'apellido',
                    title: 'apellido'
                },
                {
                    data: 'estado_id',
                    title: 'estado'
                },
                {
                    data: 'sede_id',
                    title: 'sede'
                },
                {
                    title: 'pdf'
                }
            ],
            columnDefs: [
                // { targets: 3, visible: false },
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
            // console.log(id)
            
        });
    }
    catch (error) {
        console.error('Error:', error);
    }
}