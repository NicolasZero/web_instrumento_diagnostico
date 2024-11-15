document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myform');
    const inputs = form.querySelectorAll('input');

    const validateInput = (input) => {
        if (input.checkValidity() && !(input.required && input.value.trim() === "")) {
            input.parentElement.classList.remove('invalid');
        } else {
            input.parentElement.classList.add('invalid');
        }
    };

    inputs.forEach(input => {
        input.addEventListener('input', () => validateInput(input));
        input.addEventListener('focus', () => validateInput(input));
    });

    form.addEventListener('submit', (event) => {
        let isValid = true;
        inputs.forEach(input => {
            validateInput(input);
            if (!input.checkValidity() || (input.required && input.value.trim() === '')) {
                isValid = false;
            }
        });

        if (!isValid) {
            event.preventDefault();
        }
    });
});