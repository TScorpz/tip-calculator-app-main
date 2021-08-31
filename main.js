function calc() {
    const bill = document.getElementById('bill-input');
    const people = document.getElementById('people-input');
    const percent = document.getElementsByClassName('percent');
    const customPercent = document.getElementById('custom-percent')
    const tipResult = document.getElementById('tip-result');
    const totalResult = document.getElementById('total-result');
    const error = document.getElementById('error');
    const reset = document.getElementById('reset');

    let tipPercentage = 1;

    const inputHandler = function (e) {
        if (e.target.id == 'custom-percent') {
            tipPercentage = customPercent.value;
        }

        if (Number(people.value) <= 0) {
            error.innerHTML = 'Must be more than 0';
            error.style.display = 'block';
            return;
        }
        else if (Number(people.value) > 999) {
            error.innerHTML = 'Must be less than 999';
            error.style.display = 'block';
            return;
        }
        else {
            error.style.display = 'none';
        }

        tipResult.innerHTML = '$' + Math.round(((Number(bill.value) / 100 * tipPercentage) / people.value) * 100) / 100;
        totalResult.innerHTML = '$' + Math.round((Number(bill.value) / Number(people.value) + (Number(bill.value) / 100 * tipPercentage) / people.value) * 100) / 100;
    }

    const clickHandler = function (e) {

        if (e.target == customPercent) {
            if (e.target.value != undefined) {
                tipPercentage = e.target.value;
            }
        }
        else {
            tipPercentage = Number(e.target.innerHTML);
        }

        if (tipPercentage != undefined &&
            tipPercentage != 0 &&
            bill.value != 0 &&
            people.value != 0) {

            tipResult.innerHTML = '$' + Math.round(((Number(bill.value) / 100 * tipPercentage) / people.value) * 100) / 100;
            totalResult.innerHTML = '$' + Math.round((Number(bill.value) / Number(people.value) + (Number(bill.value) / 100 * tipPercentage) / people.value) * 100) / 100;
        }
    }

    const resetInput = function () {
        bill.value = '';
        people.value = '';
        tipPercentage = 0;
        tipResult.innerHTML = '$0.00';
        totalResult.innerHTML = '$0.00';
        location.hash = '';
    }

    bill.addEventListener('input', inputHandler);
    people.addEventListener('input', inputHandler);

    Array.prototype.forEach.call(percent, element => {
        element.addEventListener('click', clickHandler);
    });

    customPercent.addEventListener('input', inputHandler);
    customPercent.addEventListener('click', clickHandler);

    reset.addEventListener('click', resetInput);
}