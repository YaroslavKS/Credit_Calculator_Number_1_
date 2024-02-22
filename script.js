document.addEventListener('DOMContentLoaded', function() { // Всі рядки в середині цієї функції виконуються, коли DOM готовий.
    const loanAmountInput = document.getElementById('loan-amount');
    const loanAmountSlider = document.getElementById('loan-amount-slider');
    const repaymentPeriodInput = document.getElementById('repayment-period');
    const repaymentPeriodSlider = document.getElementById('repayment-period-slider');
    const form = document.getElementById('loan-form');
    const resultDiv = document.getElementById('result');
    const submitBtn = document.getElementById('submit-btn');

    function calculateRepayments() {
        const loanAmount = parseFloat(loanAmountInput.value);
        const repaymentPeriod = parseInt(repaymentPeriodInput.value);

        // const interestRate = 2.2;: Встановлює відсоткову ставку на день.
        const interestRate = 2.2;

        // (interestRate / 100): Визначає відсоткову ставку у відсотках.
        // (loanAmount * (interestRate / 100) * repaymentPeriod): Обчислює суму відсотків, яку потрібно сплатити за весь період погашення.
        // loanAmount + (loanAmount * (interestRate / 100) * repaymentPeriod): Додає цю суму до початкової суми позики, щоб отримати загальну суму, яку потрібно сплатити.
        // const dailyRepayment = (loanAmount + (loanAmount * (interestRate / 100) * repaymentPeriod)) / repaymentPeriod;: Обчислює денну суму погашень за допомогою формули, DR = (LA + (LA * (IR / 100) * RP)) / RP.
        const dailyRepayment = (loanAmount + (loanAmount * (interestRate / 100) * repaymentPeriod)) / repaymentPeriod;

        // repaymentPeriod: Розділяє загальну суму на кількість днів у періоді погашення, щоб отримати денну суму погашень.
        // const totalRepayment = dailyRepayment * repaymentPeriod;: Обчислює загальну суму погашення, яка дорівнює денній сумі погашень, помноженій на кількість днів у періоді погашення.
        const totalRepayment = dailyRepayment * repaymentPeriod;

        resultDiv.innerHTML = `
            <p>Денна сума погашення: ${dailyRepayment.toFixed(2)}</p>
            <p>Загальна сума погашення: ${totalRepayment.toFixed(2)}</p>
        `;
    }

    // Для відображення повідомлень про помилки у випадку некоректного вводу.
    function displayErrorMessages() {
        if (loanAmountInput.validity.valueMissing) {
            loanAmountInput.setCustomValidity('Введіть суму кредиту');
        } else if (loanAmountInput.validity.rangeUnderflow) {
            loanAmountInput.setCustomValidity('Мінімальне значення: 1000 грн');
        } else if (loanAmountInput.validity.rangeOverflow) {
            loanAmountInput.setCustomValidity('Максимальне значення: 50000 грн');
        } else {
            loanAmountInput.setCustomValidity('');
        }

        if (repaymentPeriodInput.validity.valueMissing) {
            repaymentPeriodInput.setCustomValidity('Введіть період погашення');
        } else if (repaymentPeriodInput.validity.rangeUnderflow) {
            repaymentPeriodInput.setCustomValidity('Мінімальне значення: 7 днів');
        } else if (repaymentPeriodInput.validity.rangeOverflow) {
            repaymentPeriodInput.setCustomValidity('Максимальне значення: 60 днів');
        } else {
            repaymentPeriodInput.setCustomValidity('');
        }
    }

    function checkValidityAndDisplayErrors() {
        displayErrorMessages();
        form.reportValidity();
    }

    loanAmountInput.addEventListener('input', function() {
        loanAmountSlider.value = this.value;
        checkValidityAndDisplayErrors();
        if (loanAmountInput.checkValidity() && repaymentPeriodInput.checkValidity()) {
            calculateRepayments();
        }
    });

    loanAmountSlider.addEventListener('input', function() {
        loanAmountInput.value = this.value;
        checkValidityAndDisplayErrors();
        if (loanAmountInput.checkValidity() && repaymentPeriodInput.checkValidity()) {
            calculateRepayments();
        }
    });

    repaymentPeriodInput.addEventListener('input', function() {
        repaymentPeriodSlider.value = this.value;
        checkValidityAndDisplayErrors();
        if (loanAmountInput.checkValidity() && repaymentPeriodInput.checkValidity()) {
            calculateRepayments();
        }
    });

    repaymentPeriodSlider.addEventListener('input', function() {
        repaymentPeriodInput.value = this.value;
        checkValidityAndDisplayErrors();
        if (loanAmountInput.checkValidity() && repaymentPeriodInput.checkValidity()) {
            calculateRepayments();
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        checkValidityAndDisplayErrors();
        if (form.checkValidity()) {
            calculateRepayments();
        }
    });

    form.addEventListener('input', function() {
        if (form.checkValidity()) {
            submitBtn.removeAttribute('disabled');
        } else {
            submitBtn.setAttribute('disabled', 'disabled');
        }
    });
});
