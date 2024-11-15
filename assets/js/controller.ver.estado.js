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
                    data: 'estado_id',
                    title: 'estados'
                },
                {
                    data: 'compartida',
                    title: 'compartida'
                },
                {
                    data: 'inamujer',
                    title: 'inamujer'
                },
                {
                    data: 'cafim',
                    title: 'cafim'
                },
                {
                    data: 'Casa de abrigo',
                    title: 'Casa de abrigo'
                },
                {
                    data: 'uaim',
                    title: 'uaim'
                },
                {
                    data: 'defensoria',
                    title: 'defensoria'
                },
                {
                    data: 'total_estado',
                    title: 'total_estado'
                },
            ]
        });
    }
    catch (error) {
        console.error('Error:', error);
    }
}