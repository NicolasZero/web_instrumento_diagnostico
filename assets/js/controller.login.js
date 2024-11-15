const verification = async () => {
    try {
        const user = $("#user").val()
        const pass = $("#pass").val()
        const check = document.getElementById("check").checked

        const response = await fetch('http://localhost:3000/auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user, pass }),
        });

        const res = await response.json();
        if (res.data) {
            $("#alert").removeClass('alert-danger');
            $("#alert").addClass('alert-success');
            $("#alert").html('Iniciando sesión...');
            $("#alert").removeClass('d-none');
            const rol = res.rol
            localStorage.setItem('inm-user', JSON.stringify({ user, pass, check,rol }))
            location.href = './page/registro'
            // console.log(res.rol)
        } else {
            $("#alert").removeClass('alert-success');
            $("#alert").addClass('alert-danger');
            $("#alert").html(res.error);
            $("#alert").removeClass('d-none');

            setTimeout(() => {
                $("#alert").addClass('d-none');
            }, 3000);
            // console.log(res);
        }
        // const data = res.data

    } catch (error) {
        console.error('Error:', error);
    }
}
