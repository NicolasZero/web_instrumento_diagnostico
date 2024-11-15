import handleExportPDF from "./exportPDF.js";

window.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#myform')
        if(!form) {
            console.error('Form not found');
            return;
        }
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const values = {};
        const data = new FormData(form);// form data
         for (const [key, value] of data) {
            values[key] = value;
         }

        sendForm(values);
        // handleExportPDF(values);

    });
});

const sendForm = async (data) => {
    console.log(data)
    try {
        // data.key = "n1c0145"
        // const response = await fetch('http://localhost:3000/registro/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // });
        // const json = await response.json();
        // if (!json.data) {
        //     console.log('Error:', json.error);
            
        // }else{
        //     handleExportPDF(data);
        //     console.log('Success:',json);
        // }


    }
    catch (error) {
        console.error('Error:', error);
    }
}


