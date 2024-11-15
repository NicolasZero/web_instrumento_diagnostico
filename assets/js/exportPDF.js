// import fkg from "../img/"
// La funcion toBase64 convierte una imagen a base64 para poder ser usada en el pdf
function toBase64(url) {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.crossOrigin = 'anonymous';
        image.onload = function () {
            let canvas = document.createElement("canvas");
            canvas.width = this.naturalWidth;
            canvas.height = this.naturalHeight;
            canvas.getContext("2d").drawImage(this, 0, 0);
            resolve(canvas.toDataURL("image/png").split(",")[1]);
        };
        image.src = url;
    });
}

// crear variables para las imagenes a usar en el pdf
let imagen1
let imagen2

// cargar las imagenes en base64
async function loadImages() {
    try {
        imagen1 = await toBase64('https://th.bing.com/th/id/OIP.N1HgJ7u7uFxu69myO4t8FwHaCx?rs=1&pid=ImgDetMain');
        imagen2 = await toBase64('https://3.bp.blogspot.com/-9fKARIk6pVQ/Vvgp8HHgooI/AAAAAAAAABo/Jze4savfueUIinmwLdvoLo9J17sBL3__w/s1600/inamujer.jpg');
        console.log('Images loaded');
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

loadImages();


function handleExportPDF(
    data
) {
    // Convertir los valores de las props que sean numericos a string
function convertNumbersToStrings(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'number') {
            obj[key] = obj[key].toString();
        }
    }
    return obj;
}
    const dataFormObject = convertNumbersToStrings(data);
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxWidthHeading = pageWidth - 20; // Maximum width for the text (with some padding)
    const title = "Reporte respuesta de formulario";

    // asi se agregan las imagenes al pdf
    doc.addImage(imagen1, "PNG", 10, 5, 60, 15);
    doc.addImage(imagen2, "PNG", 170, 0, 25, 25);

    // Seccion 1
    const titleSection1 = "Coordinación estadal"
    const subTitleSection1 = "Responsable de la coordinación estadal"
    const { nombre, apellido, cedula, telefono, correo } = dataFormObject;

    const SubTitleSection1a = "Ubicación administrativa"
    const { avenida_calle, edifi_casa_sede, nombre_edifi_casa_sede, num_piso,
        telefono_infraestructura, estado_id, municipio_id, ciudad, parroquia_id, zona_postal } = dataFormObject;

    //seccion 2

    const titleSection2 = "Datos y condiciones de la infraestructura"
    const subTitleSection2 = "Infraestructura"
    const { sede_id, propia, propia_desc, alquilada, alquilada_desc, apoyo_interinstitucional, apoyo_interinstitucional_dec,
        techos, techos_desc, paredes,
        paredes_desc, pisos, pisos_desc, otra_infraestructura
    } = dataFormObject;


    //Seccion 3 

    const titleSection3 = "Servicios publicos"
    const { electricidad, electricidad_desc, agua, agua_desc, telefonia, telefonia_desc,
        internet, internet_desc, otro_servicio_publico } = dataFormObject;


    //Seccion 4
    const titleSection4 = "Bienes nacionales"
    const { num_bien1, tipo_bien1, num_bien2, tipo_bien2, num_bien3, tipo_bien3, num_bien4, tipo_bien4, num_bien5, tipo_bien5
        , num_bien6, tipo_bien6, num_bien7, tipo_bien7, num_bien8, tipo_bien8, num_bien9, tipo_bien9, num_bien10, tipo_bien10,
        num_bien11, tipo_bien11, num_bien12, tipo_bien12, num_bien13, tipo_bien13, num_bien14, tipo_bien14, num_bien15, tipo_bien15,
        num_bien16, tipo_bien16, num_bien17, tipo_bien17, num_bien18, tipo_bien18, num_bien19, tipo_bien19, num_bien20, tipo_bien20, } = dataFormObject;


    //Seccion 5
    const titleSection5 = "Vehículo asignado"
    const subTitleSection5 = "Automóvil"
    const { automovil, cant_auto, num_placa_auto1, modelo_auto1, condiciones_auto1, num_placa_auto2, modelo_auto2, condiciones_auto2, num_placa_auto3, modelo_auto3, condiciones_auto3,
        num_placa_auto4, modelo_auto4, condiciones_auto4, num_placa_auto5, modelo_auto5, condiciones_auto5
    } = dataFormObject;


    // Seccion 5a
    const subTitleSection5a = "Autobus"
    const { autobus, cant_bus, num_placa_bus1, modelo_bus1, condiciones_bus1, num_placa_bus2, modelo_bus2, condiciones_bus2, num_placa_bus3, modelo_bus3, condiciones_bus3,
        num_placa_bus4, modelo_bus4, condiciones_bus4, num_placa_bus5, modelo_bus5, condiciones_bus5,
        otros, cant_otro, num_placa_otro, modelo_otro, condiciones_otro
    } = dataFormObject;


    // Seccion 6
    const titleSection6 = "Talento humano"
    const { cant_mujeres, mujeres_activas, mujeres_reposo, mujeres_vacaciones, cant_hombres, hombres_activos, hombres_reposo,
        hombres_vacaciones
    } = dataFormObject;


    //Seccion 7

    const titleSection7 = "Equipos médicos"
    const { equipo_medico1, equipo_medico2, equipo_medico3, equipo_medico4, equipo_medico5, equipo_medico6, equipo_medico7, equipo_medico8, equipo_medico9, equipo_medico10, } = dataFormObject;

    // Seccion 8
    const titleSection8 = "Observaciones y recomendaciones"
    const { observacion, recomendaciones } = dataFormObject;

    //Seccion 9
    const titleSection9 = "Testigo No. 1"
    const titleSection9a = "Testigo No. 2"
    const titleSection9b = "Enlace inamujer"
    const { nombre_testigo1, cedula_testigo1, apellido_testigo1, cargo_testigo1, nombre_testigo2,
        cedula_testigo2, apellido_testigo2, cargo_testigo2, nombre_enlace_inm, apellido_enlace_inm, cedula_enlace_inm, cargo_enlace_inm
    } = dataFormObject;

    // Add title main
    // doc.setFontSize(20);
    // const titleWidth = doc.getTextWidth(title);
    // const titleX = (pageWidth - titleWidth) / 2;
    // const titleY = 20;
    // doc.setFont("helvetica", "bold");
    // doc.text(title, titleX, titleY, { maxWidth: maxWidthHeading });

    // Add title for section 1
    doc.setFontSize(16);
    const subtitleWidth = doc.getTextWidth(titleSection1);
    const subtitleX = (pageWidth - subtitleWidth) / 2;
    const subtitleY = 35;
    const colorTitleSection = [112, 48, 160];

    // Draw background rectangle for the subtitle
    doc.setFillColor(colorTitleSection[0], colorTitleSection[1], colorTitleSection[2]); // Black background
    doc.rect(0, subtitleY - 7, pageWidth, 10, 'F');


    // Draw white text 
    doc.setTextColor(255, 255, 255); // White text
    doc.text(titleSection1, subtitleX, subtitleY, { maxWidth: maxWidthHeading });

    // Reset text color to black for the rest of the document
    doc.setTextColor(0, 0, 0);

    // Add section 1
    doc.setFontSize(10);
    const section1Width = doc.getTextWidth(subTitleSection1);
    const section1X = (pageWidth - section1Width) / 2;
    const section1Y = 50;

    doc.setFillColor(0, 0, 0); // Black background
    doc.rect(0, section1Y - 5, pageWidth, 7, 'F');

    doc.setTextColor(255, 255, 255); // White text
    doc.text(subTitleSection1, section1X, section1Y, { maxWidth: maxWidthHeading });

    doc.setTextColor(0, 0, 0);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    let yPosition = 70; // Starting y position for the text
    const lineHeight = 10; // Height of each line of text
    let inputHeight = 8; // Height of the input box
    let inputWidth = 100; // Width of the input box

    const section1Data = [
        { label: "Nombre", value: nombre },
        { label: "Apellido", value: apellido },
        { label: "Cédula", value: cedula },
        { label: "Teléfono", value: telefono },
        { label: "Correo", value: correo }
    ];


    section1Data.forEach(({ label, value }) => {
        if (yPosition + lineHeight + inputHeight > pageHeight) {
            doc.addPage();
            yPosition = 20; // Reset y position for the new page
        }
        doc.text(`${label}:`, 20, yPosition, { maxWidth: maxWidthHeading });
        doc.rect(80, yPosition - inputHeight + 2, inputWidth, inputHeight); // Draw input box
        doc.text(value, 82, yPosition, { maxWidth: maxWidthHeading }); // Draw value inside input box
        yPosition += lineHeight + inputHeight; // Move down for the next line
    });

    // Add section 1.a
    doc.setFontSize(10);
    const section1aWidth = doc.getTextWidth(SubTitleSection1a);
    const section1aX = (pageWidth - section1aWidth) / 2;
    const section1aY = 160;

    doc.setFillColor(0, 0, 0); // Black background
    doc.rect(0, section1aY - 5, pageWidth, 7, 'F');

    doc.setTextColor(255, 255, 255); // White text
    doc.text(SubTitleSection1a, section1aX, section1aY, { maxWidth: maxWidthHeading });

    doc.setTextColor(0, 0, 0);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const section1aData = [
        { label: "Avenida o calle", value: avenida_calle },
        { label: "Edificio, casa o sede", value: edifi_casa_sede },
        { label: "Nombre del edificio, casa o sede", value: nombre_edifi_casa_sede },
        { label: "Piso N°", value: num_piso },
        { label: "Teléfono", value: telefono_infraestructura },
        { label: "Estado", value: estado_id },
        { label: "Municipio", value: municipio_id },
        { label: "Ciudad", value: ciudad },
        { label: "Parroquia", value: parroquia_id },
        { label: "Zona postal", value: zona_postal },
    ];

    section1aData.forEach(({ label, value }) => {
        if (yPosition + lineHeight + inputHeight > pageHeight) {
            doc.addPage();
            yPosition = 0; // Reset y position for the new page
        }
        doc.text(`${label}:`, 10, yPosition + 15, { maxWidth: maxWidthHeading });
        doc.rect(80, yPosition - inputHeight + 17, inputWidth, inputHeight);
        if(typeof value === "number"){
            value = value.toString();
            doc.text(String(value), 82, yPosition + 15, { maxWidth: maxWidthHeading });
        }// Draw input box
        doc.text(String(value), 82, yPosition + 15, { maxWidth: maxWidthHeading }); // Draw value inside input box
        yPosition += lineHeight + inputHeight; // Move down for the next line
    });

    // Add title for section 2
    doc.addPage();
    yPosition = 10;
    doc.setFontSize(16);
    const section2Width = doc.getTextWidth(titleSection2);
    const section2X = (pageWidth - section2Width) / 2;
    const section2Y = yPosition;

    doc.setFillColor(colorTitleSection[0], colorTitleSection[1], colorTitleSection[2]); // Black background
    doc.rect(0, section2Y - 7, pageWidth, 10, 'F');

    doc.setTextColor(255, 255, 255); // White text
    doc.text(titleSection2, section2X, section2Y, { maxWidth: maxWidthHeading });

    doc.setTextColor(0, 0, 0);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const section2Data = [
        { label: "Sede", value: sede_id },
        { label: "Propia", value: propia, checkbox: true },
        { label: "Descripción de la sede propia", value: propia_desc, expand: true },
        { label: "Alquilada", value: alquilada, checkbox: true },
        { label: "Descripción de la sede alquilada", value: alquilada_desc, expand: true },
        { label: "Apoyo interinstitucional", value: apoyo_interinstitucional, checkbox: true },
        { label: "Descripcion apoyo interintitucional", value: apoyo_interinstitucional_dec, expand: true },
        { label: "Techos", value: techos, checkbox: true },
        { label: "Descripción de los techos", value: techos_desc, expand: true },
        { label: "Paredes", value: paredes, checkbox: true },
        { label: "Descripción de las paredes", value: paredes_desc, expand: true },
        { label: "Pisos", value: pisos, checkbox: true },
        { label: "Descripción de los pisos", value: pisos_desc, expand: true },
        { label: "Otra infraestructura", value: otra_infraestructura, expand: true },
    ];

    // Variables for the expandable inputs
    let inputHeightDesc = 15,
        inputWidthDesc = 125;

    section2Data.forEach(({ label, value, checkbox, expand }) => {
        if (yPosition + lineHeight + inputHeight > pageHeight) {
            doc.addPage();
            yPosition = 0; // Reset y position for the new page
        }
        doc.text(`${label}:`, 10, yPosition + 15, { maxWidth: maxWidthHeading });
        if (expand) {
            doc.rect(80, yPosition - inputHeight + 15, inputWidthDesc, inputHeightDesc);
            doc.text(String(value), 82, yPosition + 12, { maxWidth: 120 });
        }
        if (!expand) {
            if (checkbox && value !== "") {
                value = value ? "Sí" : "No";
            }
            doc.rect(80, yPosition - inputHeight + 18, inputWidth, inputHeight);
            doc.text(String(value), 82, yPosition + 15, { maxWidth: maxWidthHeading });
        }


        // Draw value inside input box
        yPosition += lineHeight + inputHeight; // Move down for the next line
    });

    // Add title for section 3
    doc.addPage();
    yPosition = 10;
    doc.setFontSize(16);
    const section3Width = doc.getTextWidth(titleSection3);
    const section3X = (pageWidth - section3Width) / 2;
    const section3Y = yPosition;

    doc.setFillColor(colorTitleSection[0], colorTitleSection[1], colorTitleSection[2]); // Black background
    doc.rect(0, section3Y - 7, pageWidth, 10, 'F');

    doc.setTextColor(255, 255, 255); // White text
    doc.text(titleSection3, section3X, section3Y, { maxWidth: maxWidthHeading });

    doc.setTextColor(0, 0, 0);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const section3Data = [
        { label: "Electricidad", value: electricidad, checkbox: true },
        { label: "Descripción de la electricidad", value: electricidad_desc, expand: true },
        { label: "Agua", value: agua, checkbox: true },
        { label: "Descripción del agua", value: agua_desc, expand: true },
        { label: "Telefonía", value: telefonia, checkbox: true },
        { label: "Descripción de la telefonía", value: telefonia_desc, expand: true },
        { label: "Internet", value: internet, checkbox: true },
        { label: "Descripción del internet", value: internet_desc, expand: true },
        { label: "Otro servicio público", value: otro_servicio_publico, expand: true },
    ];

    section3Data.forEach(({ label, value, checkbox, expand }) => {
        if (yPosition + lineHeight + inputHeight > pageHeight) {
            doc.addPage();
            yPosition = 0; // Reset y position for the new page
        }
        doc.text(`${label}:`, 10, yPosition + 15, { maxWidth: maxWidthHeading });
        if (expand) {
            doc.rect(80, yPosition - inputHeight + 15, inputWidthDesc, inputHeightDesc);
            doc.text(String(value), 82, yPosition + 12, { maxWidth: 120 });
        }
        if (!expand) {
            if (checkbox && value !== "") {
                value = value ? "Sí" : "No";
            }
            doc.rect(80, yPosition - inputHeight + 18, inputWidth, inputHeight);
            doc.text(String(value), 82, yPosition + 15, { maxWidth: maxWidthHeading });
        } // Draw value inside input box
        yPosition += lineHeight + inputHeight; // Move down for the next line
    });

    // Add title for section 4
    doc.addPage();
    yPosition = 10;
    doc.setFontSize(16);
    const section4Width = doc.getTextWidth(titleSection4);
    const section4X = (pageWidth - section4Width) / 2;
    const section4Y = yPosition;

    doc.setFillColor(colorTitleSection[0], colorTitleSection[1], colorTitleSection[2]); // Black background
    doc.rect(0, section4Y - 7, pageWidth, 10, 'F');

    doc.setTextColor(255, 255, 255); // White text
    doc.text(titleSection4, section4X, section4Y, { maxWidth: maxWidthHeading });

    doc.setTextColor(0, 0, 0);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const section4Data = [
        { n: "1", label: "N° de bien", value: num_bien1, tipo: tipo_bien1 },
        { n: "2", label: "N° de bien", value: num_bien2, tipo: tipo_bien2 },
        { n: "3", label: "N° de bien", value: num_bien3, tipo: tipo_bien3 },
        { n: "4", label: "N° de bien", value: num_bien4, tipo: tipo_bien4 },
        { n: "5", label: "N° de bien", value: num_bien5, tipo: tipo_bien5 },
        { n: "6", label: "N° de bien", value: num_bien6, tipo: tipo_bien6 },
        { n: "7", label: "N° de bien", value: num_bien7, tipo: tipo_bien7 },
        { n: "8", label: "N° de bien", value: num_bien8, tipo: tipo_bien8 },
        { n: "9", label: "N° de bien", value: num_bien9, tipo: tipo_bien9 },
        { n: "10", label: "N° de bien", value: num_bien10, tipo: tipo_bien10 },
        { n: "11", label: "N° de bien", value: num_bien11, tipo: tipo_bien11 },
        { n: "12", label: "N° de bien", value: num_bien12, tipo: tipo_bien12 },
        { n: "13", label: "N° de bien", value: num_bien13, tipo: tipo_bien13 },
        { n: "14", label: "N° de bien", value: num_bien14, tipo: tipo_bien14 },
        { n: "15", label: "N° de bien", value: num_bien15, tipo: tipo_bien15 },
        { n: "16", label: "N° de bien", value: num_bien16, tipo: tipo_bien16 },
        { n: "17", label: "N° de bien", value: num_bien17, tipo: tipo_bien17 },
        { n: "18", label: "N° de bien", value: num_bien18, tipo: tipo_bien18 },
        { n: "19", label: "N° de bien", value: num_bien19, tipo: tipo_bien19 },
        { n: "20", label: "N° de bien", value: num_bien20, tipo: tipo_bien20 },

    ];

    // Reset y position for the new pag
    section4Data.forEach(({ label, value, n, tipo }) => {
        if (yPosition + lineHeight + inputHeight > pageHeight) {
            doc.addPage();
            yPosition = 0; // Reset y position for the new page
        }
        // doc.text(`${index}:`, 2, yPosition + 40, { maxWidth: maxWidthHeading });
        doc.text(`${n}. ${label}:`, 10, yPosition + 25, { maxWidth: maxWidthHeading });
        doc.rect(50, yPosition - inputHeight + 27, 50, inputHeight);
        doc.text(String(value), 52, yPosition + 25, { maxWidth: maxWidthHeading });
        doc.text(`Tipo:`, 115, yPosition + 23, { maxWidth: maxWidthHeading });
        doc.rect(130, yPosition - inputHeight + 27, 50, inputHeight);
        doc.text(String(tipo), 132, yPosition + 25, { maxWidth: maxWidthHeading });
        yPosition += lineHeight + inputHeight; // Move down for the next line
    });

    // Add title for section 5
    doc.addPage();
    yPosition = 10;
    doc.setFontSize(16);
    const section5Width = doc.getTextWidth(titleSection5);
    const section5X = (pageWidth - section5Width) / 2;
    const section5Y = 15;

    doc.setFillColor(colorTitleSection[0], colorTitleSection[1], colorTitleSection[2]); // Black background
    doc.rect(0, section5Y - 7, pageWidth, 10, 'F');

    doc.setTextColor(255, 255, 255); // White text
    doc.text(titleSection5, section5X, section5Y, { maxWidth: maxWidthHeading });

    doc.setTextColor(0, 0, 0);

    doc.setFontSize(10);
    const subTitleSection5Width = doc.getTextWidth(subTitleSection5);
    const subTitleSection5X = (pageWidth - subTitleSection5Width) / 2;
    const subTitleSection5Y = 30;

    doc.setFillColor(0, 0, 0); // Black background
    doc.rect(0, subTitleSection5Y - 5, pageWidth, 7, 'F');

    doc.setTextColor(255, 255, 255); // White text
    doc.text(subTitleSection5, subTitleSection5X, subTitleSection5Y, { maxWidth: maxWidthHeading });

    doc.setTextColor(0, 0, 0);

    doc.setFontSize(10);
    const section5Data = [
        { n: "1", placa: num_placa_auto1, modelo: modelo_auto1, condiciones: condiciones_auto1 },
        { n: "2", placa: num_placa_auto2, modelo: modelo_auto2, condiciones: condiciones_auto2 },
        { n: "3", placa: num_placa_auto3, modelo: modelo_auto3, condiciones: condiciones_auto3 },
        { n: "4", placa: num_placa_auto4, modelo: modelo_auto4, condiciones: condiciones_auto4 },
        { n: "5", placa: num_placa_auto5, modelo: modelo_auto5, condiciones: condiciones_auto5 },

    ];


    doc.text(`Automovil:`, 14, yPosition + 35, { maxWidth: maxWidthHeading });
    doc.rect(35, yPosition - inputHeight + 38, 60, inputHeight);
    doc.text(String(automovil === "on" ? "Si" : "No"), 38, yPosition + 35, { maxWidth: maxWidthHeading });


    doc.text(`Cantidad N°:`, 108, yPosition + 35, { maxWidth: maxWidthHeading });
    doc.rect(130, yPosition - inputHeight + 38, 60, inputHeight);
    doc.text(String(cant_auto), 133, yPosition + 35, { maxWidth: maxWidthHeading });

    section5Data.forEach(({ placa, n, modelo, condiciones }) => {
        const maxWidthcondiciones = pageWidth - 40; // Maximum width for the text (with some padding)

        if (yPosition + lineHeight + inputHeight + (condiciones.length / 20) > pageHeight) {
            doc.addPage();
            yPosition = 0; // Reset y position for the new page
        }

        doc.text(`${n}. N° de placa:`, 10, yPosition + 50, { maxWidth: maxWidthHeading });
        doc.rect(35, yPosition - inputHeight + 53, 60, inputHeight);
        doc.text(String(placa), 38, yPosition + 50, { maxWidth: maxWidthHeading });
        doc.text(`Modelo:`, 115, yPosition + 50, { maxWidth: maxWidthHeading });
        doc.rect(130, yPosition - inputHeight + 53, 60, inputHeight);
        doc.text(String(modelo), 133, yPosition + 50, { maxWidth: maxWidthHeading });
        doc.text(`Condiciones:`, 10, yPosition + 58, { maxWidth: maxWidthHeading });
        doc.text(String(condiciones), 33, yPosition + 58, { maxWidth: maxWidthcondiciones });

        yPosition += lineHeight + inputHeight + (condiciones.length / 25); // Move down for the next line




    });

    // Add title for section 5a
    doc.addPage();
    yPosition = -5;
    doc.setFontSize(10);
    const subTitleSection5aWidth = doc.getTextWidth(subTitleSection5a);
    const subTitleSection5aX = (pageWidth - subTitleSection5aWidth) / 2;
    const subTitleSection5aY = 15;

    doc.setFillColor(0, 0, 0); // Black background
    doc.rect(0, subTitleSection5aY - 5, pageWidth, 7, 'F');

    doc.setTextColor(255, 255, 255); // White text
    doc.text(subTitleSection5a, subTitleSection5aX, subTitleSection5aY, { maxWidth: maxWidthHeading });

    doc.setTextColor(0, 0, 0);

    doc.setFontSize(10);
    const section5aData = [
        { n: "1", placa: num_placa_bus1, modelo: modelo_bus1, condiciones: condiciones_bus1 },
        { n: "2", placa: num_placa_bus2, modelo: modelo_bus2, condiciones: condiciones_bus2 },
        { n: "3", placa: num_placa_bus3, modelo: modelo_bus3, condiciones: condiciones_bus3 },
        { n: "4", placa: num_placa_bus4, modelo: modelo_bus4, condiciones: condiciones_bus4 },
        { n: "5", placa: num_placa_bus5, modelo: modelo_bus5, condiciones: condiciones_bus5 },

    ];

    const section5bData = [
        { label: "Otros (Especifique)", value: otros },
        { label: "Cantidad N°", value: cant_otro },
        { label: "N° de placa", value: num_placa_otro },
        { label: "Modelo", value: modelo_otro },
    ]

    doc.text(`Autobus:`, 14, yPosition + 35, { maxWidth: maxWidthHeading });
    doc.rect(35, yPosition - inputHeight + 38, 60, inputHeight);
    doc.text(String(autobus === "on" ? "Si" : "No"), 38, yPosition + 35, { maxWidth: maxWidthHeading });


    doc.text(`Cantidad N°:`, 108, yPosition + 35, { maxWidth: maxWidthHeading });
    doc.rect(130, yPosition - inputHeight + 38, 60, inputHeight);
    doc.text(String(cant_bus), 133, yPosition + 35, { maxWidth: maxWidthHeading });

    section5aData.forEach(({ placa, n, modelo, condiciones }) => {
        const maxWidthcondiciones = pageWidth - 40; // Maximum width for the text (with some padding)

        if (yPosition + lineHeight + inputHeight + (condiciones.length / 20) > pageHeight) {
            doc.addPage();
            yPosition = 0; // Reset y position for the new page
        }

        doc.text(`${n}. N° de placa:`, 10, yPosition + 50, { maxWidth: maxWidthHeading });
        doc.rect(35, yPosition - inputHeight + 53, 60, inputHeight);
        doc.text(String(placa), 38, yPosition + 50, { maxWidth: maxWidthHeading });
        doc.text(`Modelo:`, 115, yPosition + 50, { maxWidth: maxWidthHeading });
        doc.rect(130, yPosition - inputHeight + 53, 60, inputHeight);
        doc.text(String(modelo), 133, yPosition + 50, { maxWidth: maxWidthHeading });
        doc.text(`Condiciones:`, 10, yPosition + 58, { maxWidth: maxWidthHeading });
        doc.text(String(condiciones), 33, yPosition + 58, { maxWidth: maxWidthcondiciones });

        yPosition += lineHeight + inputHeight + (condiciones.length / 25)


    });

    section5bData.forEach(({ label, value }) => {
        if (yPosition + lineHeight + inputHeight > pageHeight) {
            doc.addPage();
            yPosition = 20; // Reset y position for the new page
        }
        doc.text(`${label}:`, 10, yPosition + 65, { maxWidth: maxWidthHeading });
        doc.rect(45, yPosition - inputHeight + 67, 140, inputHeight); // Draw input box
        doc.text(value, 63, yPosition + 67, { maxWidth: maxWidthHeading }); // Draw value inside input box
        yPosition += lineHeight + inputHeight; // Move down for the next line
    });

    doc.text(`Condiciones:`, 10, yPosition + 65, { maxWidth: maxWidthHeading });
    doc.text(condiciones_otro, 35, yPosition + 67, { maxWidth: (pageWidth - 40) });

    // Add title for section 6
    doc.addPage();
    yPosition = 0;
    doc.setFontSize(16);
    const section6Width = doc.getTextWidth(titleSection6);
    const section6X = (pageWidth - section6Width) / 2;
    const section6Y = 10;

    doc.setFillColor(colorTitleSection[0], colorTitleSection[1], colorTitleSection[2]); // Black background
    doc.rect(0, section6Y - 7, pageWidth, 10, 'F');

    doc.setTextColor(255, 255, 255); // White text
    doc.text(titleSection6, section6X, section6Y, { maxWidth: maxWidthHeading });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);

    const section6Data = [
        { label: "Cantidad de mujeres", value: cant_mujeres },
        { label: "Mujeres activas", value: mujeres_activas },
        { label: "Mujeres en reposo", value: mujeres_reposo },
        { label: "Mujeres en vacaciones", value: mujeres_vacaciones },
    ]

    const section6bData = [
        { label: "Cantidad de hombres", value: cant_hombres },
        { label: "Hombres activos", value: hombres_activos },
        { label: "Hombres en reposo", value: hombres_reposo },
        { label: "Hombres en vacaciones", value: hombres_vacaciones },
    ]

    section6Data.forEach(({ label, value }) => {
        if (yPosition + lineHeight + inputHeight > pageHeight) {
            doc.addPage();
            yPosition = 20; // Reset y position for the new page
        }
        doc.text(`${label}:`, 10, yPosition + 25, { maxWidth: maxWidthHeading });
        doc.rect(60, yPosition - inputHeight + 27, 140, inputHeight); // Draw input box
        doc.text(value, 63, yPosition + 25, { maxWidth: maxWidthHeading }); // Draw value inside input box
        yPosition += lineHeight + inputHeight; // Move down for the next line
    });

    section6bData.forEach(({ label, value }) => {
        if (yPosition + lineHeight + inputHeight > pageHeight) {
            doc.addPage();
            yPosition = 20; // Reset y position for the new page
        }
        doc.text(`${label}:`, 10, yPosition + 50, { maxWidth: maxWidthHeading });
        doc.rect(60, yPosition - inputHeight + 52, 140, inputHeight); // Draw input box
        doc.text(value, 63, yPosition + 50, { maxWidth: maxWidthHeading }); // Draw value inside input box
        yPosition += lineHeight + inputHeight; // Move down for the next line
    });

    // Add title for section 7
    doc.addPage();
    yPosition = 0;
    doc.setFontSize(16);
    const section7Width = doc.getTextWidth(titleSection7);
    const section7X = (pageWidth - section7Width) / 2;
    const section7Y = 10;

    doc.setFillColor(colorTitleSection[0], colorTitleSection[1], colorTitleSection[2]); // Black background
    doc.rect(0, section7Y - 7, pageWidth, 10, 'F');

    doc.setTextColor(255, 255, 255); // White text
    doc.text(titleSection7, section7X, section7Y, { maxWidth: maxWidthHeading });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);


    const section7Data = [
        { n: "1", value: equipo_medico1 },
        { n: "2", value: equipo_medico2 },
        { n: "3", value: equipo_medico3 },
        { n: "4", value: equipo_medico4 },
        { n: "5", value: equipo_medico5 },
        { n: "6", value: equipo_medico6 },
        { n: "7", value: equipo_medico7 },
        { n: "8", value: equipo_medico8 },
        { n: "9", value: equipo_medico9 },
        { n: "10", value: equipo_medico10 }, ,
    ]

    section7Data.forEach(({ n, value }) => {
        if (yPosition + lineHeight + inputHeight > pageHeight) {
            doc.addPage();
            yPosition = 20; // Reset y position for the new page
        }
        doc.text(`${n}: Equipo médico`, 10, yPosition + 25, { maxWidth: maxWidthHeading });
        doc.rect(60, yPosition - inputHeight + 27, 140, inputHeight); // Draw input box
        doc.text(value, 63, yPosition + 25, { maxWidth: maxWidthHeading }); // Draw value inside input box
        yPosition += lineHeight + inputHeight; // Move down for the next line
    });


    // Add title for section 8
    doc.addPage();
    yPosition = 0;
    doc.setFontSize(16);
    const section8Width = doc.getTextWidth(titleSection8);
    const section8X = (pageWidth - section8Width) / 2;
    const section8Y = 10;

    doc.setFillColor(colorTitleSection[0], colorTitleSection[1], colorTitleSection[2]); // Black background
    doc.rect(0, section8Y - 7, pageWidth, 10, 'F');

    doc.setTextColor(255, 255, 255); // White text
    doc.text(titleSection8, section8X, section8Y, { maxWidth: maxWidthHeading });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);

    const inputHeightObservacionCalcuted = observacion.length > 500 ? 0 : 55
    const inputWidthObservacionCalcuted = observacion.length > 500 ? 0 : 155

    doc.text(`Observaciones:`, 10, yPosition + 25, { maxWidth: maxWidthHeading });
    doc.rect(45, yPosition - inputHeight + 30, inputWidthObservacionCalcuted, inputHeightObservacionCalcuted); // Draw input box
    doc.text(observacion, 47, yPosition + 24, { maxWidth: pageWidth - 60 }); // Draw value inside input box
    yPosition += lineHeight + inputHeight; // Move down for the next line

    //Recomedaciones

    const inputHeightRecomendacionCalcuted = recomendaciones.length > 500 ? 0 : 55
    const inputWidthRecomendacionCalcuted = recomendaciones.length > 500 ? 0 : 155

    doc.text(`Recomendaciones:`, 6, yPosition + 100, { maxWidth: maxWidthHeading });
    doc.rect(45, yPosition - inputHeight + 105, inputWidthRecomendacionCalcuted, inputHeightRecomendacionCalcuted); // Draw input box
    doc.text(recomendaciones, 47, yPosition + 100, { maxWidth: pageWidth - 60 }); // Draw value inside input box
    yPosition += lineHeight + inputHeight; // Move down for the next line


    // Add title for section 9
    //testigo 1

    doc.addPage();
    yPosition = 0;
    doc.setFontSize(16);
    const section9Width = doc.getTextWidth(titleSection9);
    const section9X = (pageWidth - section9Width) / 2;
    const section9Y = 10;

    doc.setFillColor(colorTitleSection[0], colorTitleSection[1], colorTitleSection[2]); // Black background
    doc.rect(0, section9Y - 7, pageWidth, 10, 'F');

    doc.setTextColor(255, 255, 255); // White text
    doc.text(titleSection9, section9X, section9Y, { maxWidth: maxWidthHeading });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);


    const section9Data = [
        { label: "Nombres", value: nombre_testigo1 },
        { label: "Apellidos", value: apellido_testigo1 },
        { label: "Cédula", value: cedula_testigo1 },
        { label: "Cargo", value: cargo_testigo1 },
    ]

    section9Data.forEach(({ label, value }) => {
        if (yPosition + lineHeight + inputHeight > pageHeight) {
            doc.addPage();
            yPosition = 20; // Reset y position for the new page
        }
        doc.text(`${label}:`, 10, yPosition + 25, { maxWidth: maxWidthHeading });
        doc.rect(60, yPosition - inputHeight + 27, 140, inputHeight); // Draw input box
        doc.text(value, 63, yPosition + 25, { maxWidth: maxWidthHeading }); // Draw value inside input box
        yPosition += lineHeight + inputHeight; // Move down for the next line
    });

    //testigo 2
    doc.setFontSize(16);
    const section9aWidth = doc.getTextWidth(titleSection9a);
    const section9aX = (pageWidth - section9aWidth) / 2;
    const section9aY = 100;

    doc.setFillColor(colorTitleSection[0], colorTitleSection[1], colorTitleSection[2]); // Black background
    doc.rect(0, section9aY - 7, pageWidth, 10, 'F');

    doc.setTextColor(255, 255, 255); // White text
    doc.text(titleSection9a, section9aX, section9aY, { maxWidth: maxWidthHeading });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);


    const section9aData = [
        { label: "Nombres", value: nombre_testigo2 },
        { label: "Apellidos", value: apellido_testigo2 },
        { label: "Cédula", value: cedula_testigo2 },
        { label: "Cargo", value: cargo_testigo2 },
    ]

    section9aData.forEach(({ label, value }) => {
        if (yPosition + lineHeight + inputHeight > pageHeight) {
            doc.addPage();
            yPosition = 20; // Reset y position for the new page
        }
        doc.text(`${label}:`, 10, yPosition + 50, { maxWidth: maxWidthHeading });
        doc.rect(60, yPosition - inputHeight + 52, 140, inputHeight); // Draw input box
        doc.text(value, 63, yPosition + 50, { maxWidth: maxWidthHeading }); // Draw value inside input box
        yPosition += lineHeight + inputHeight; // Move down for the next line
    });

    //Enlace inamujer
    doc.setFontSize(16);
    const section9bWidth = doc.getTextWidth(titleSection9b);
    const section9bX = (pageWidth - section9bWidth) / 2;
    const section9bY = 200;

    doc.setFillColor(colorTitleSection[0], colorTitleSection[1], colorTitleSection[2]); // Black background
    doc.rect(0, section9bY - 7, pageWidth, 10, 'F');

    doc.setTextColor(255, 255, 255); // White text
    doc.text(titleSection9b, section9bX, section9bY, { maxWidth: maxWidthHeading });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);


    const section9bData = [
        { label: "Nombres", value: nombre_enlace_inm },
        { label: "Apellidos", value: apellido_enlace_inm },
        { label: "Cédula", value: cedula_enlace_inm },
        { label: "Cargo", value: cargo_enlace_inm },
    ]

    section9bData.forEach(({ label, value }) => {
        if (yPosition + lineHeight + inputHeight > pageHeight) {
            doc.addPage();
            yPosition = 20; // Reset y position for the new page
        }
        doc.text(`${label}:`, 10, yPosition + 75, { maxWidth: maxWidthHeading });
        doc.rect(60, yPosition - inputHeight + 77, 140, inputHeight); // Draw input box
        doc.text(value, 63, yPosition + 75, { maxWidth: maxWidthHeading }); // Draw value inside input box
        yPosition += lineHeight + inputHeight; // Move down for the next line
    });

    // guardar formulario en pdf (descargar automaticamente)
    // doc.save('formulario.pdf');


    // Crea un blob a partir del pdf (para abrirlo en una nueva pestaña)
    const blob = new Blob([doc.output("blob")], { type: "application/pdf" });

    // Create a URL from the blob
    const url = URL.createObjectURL(blob);

    // Open the URL in a new tab
    window.open(url, "_blank");

}

export default handleExportPDF;