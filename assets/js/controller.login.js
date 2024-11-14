$("#submit").click(function (e) { 
    e.preventDefault();

    const user = $("#user").val()
    const pass = $("#pass").val()
    const check = document.getElementById("check").checked

    console.log({user,pass,check})

    const verification = async (user,pass) => {
        try {
            const response = await fetch('http://localhost:3000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {user,pass},
            });

            const res = await response.json();
            // const data = res.data
            console.log(res);
            
        }catch (error) {
            console.error('Error:', error);
        }
    }
});