// Meses del año
const monthsYear = 12;

// Inicialización de variables, el primer dato que se le pide al usuario es la cantidad a prestar
let balance = parseInt(prompt("Ingrese la cantidad a prestar (min 1000 USD - max 100000 USD)"));
let termMonths = 0;
let interestRate = 0;
let monthlyFee = 0;
let interestPayment = 0;
let capitalPayment = 0;

//Inicializo el array que va a contener el plan de pagos en función del plazo definido
let paymentPlan = [];

// Ciclo condicional para validar que la cantidad a prestar esté dentro del rango permitido
while ((balance < 1000) || (balance > 100000)) {
    alert("La cantidad que estás solicitando no es válida");
    balance = parseInt(prompt("Ingrese la cantidad a prestar (min 1000 USD - max 100000 USD)"));
};

console.log(`La cantidad que estás solicitando prestar es ${balance} USD`);

// Inicializo la variable en la cual el usuario define el plazo del préstamo en años
let termYears = parseInt(prompt("Ingrese el plazo en años (min 1 año - max 5 años)"));

// Ciclo condicional para validar que el plazo en años esté dentro del rango permitido
while ((termYears < 1) || (termYears > 5)) {
    alert("El plazo solicitado no es válido");
    termYears = parseInt(prompt("Ingrese el plazo en años (min 1 año - max 5 años)"));
};

console.log(`El plazo para pagar que requieres es ${termYears} años`);

//Declaro la función para calcular la cantidad de cuotas mensuales según los años de plazo indicados por el usuario
function calculateTermMonths(termYears) {
    return termMonths = termYears * monthsYear;
}

// Ejecuto la función para calcular la cantidad de cuotas mensuales a partir de los años de plazo requeridos
calculateTermMonths(termYears);
console.log("Según el plazo que requieres, las cuotas mensuales serían:", termMonths);

// Condicional para definir la tasa de interés de acuerdo a los años de plazo requeridos
if (termYears == 1) {
    interestRate = 0.03;
    console.log("La tasa de interés para el plazo de", termYears, "años es 3% mes vencido");
} else if (termYears == 2 || termYears == 3) {
    interestRate = 0.025;
    console.log("La tasa de interés para el plazo de", termYears, "años es 2.5% mes vencido");
} else {
    interestRate = 0.02;
    console.log("La tasa de interés para el plazo de", termYears, "años es 2% mes vencido");
};

// Declaro la función para calcular el valor de la cuota mensual de acuerdo a los datos del monto solicitado a prestar, la tasa de interes y el plazo en meses
function calculateInstallment(balance, interestRate, termMonths) {
    return monthlyFee = ((balance * interestRate) / (1 - (1 + interestRate) ** (-termMonths))).toFixed(1);
}

// Ejecuto la función para calcular el valor de la cuota mensual de acuerdo a los datos del monto solicitado a prestar, la tasa de interes y el plazo en meses
calculateInstallment(balance, interestRate, termMonths);
console.log("El valor de tu cuota fija mensual sería:", monthlyFee, "USD");

console.log("----------- Plan de pagos detallado -----------")

// Declaro función para calcular el valor abonado a intereses
function calculateInterestPayment(bal, intRate) {
    interestPayment = (bal * intRate).toFixed(1);
    console.log("El valor abonado a intereses sería:", interestPayment, "USD");
}

// Declaro función para calcular el valor abonado a capital
function calculatePaymentCapital(mFee, intPay) {
    capitalPayment = (mFee - intPay).toFixed(1);
    console.log("El valor abonado a capital sería:", capitalPayment, "USD");
}

// Declaro función para calcular el saldo después de cada pago
function calculateBalance(bal, capPay) {
    if ((bal - capPay).toFixed(1) <= 0) {
        balance = 0;
    } else {
        balance = (bal - capPay).toFixed(1);
    }
    console.log("El saldo después del pago de esta cuota sería:", balance, "USD");
}

// Ciclo para calcular el abono a intereses, el abono a capital y el saldo para cada una de las cuotas mensuales
for (let i = 1; i <= termMonths; i++) {
    console.log("Cuota No", i);
    calculateInterestPayment(balance, interestRate);
    calculatePaymentCapital(monthlyFee, interestPayment);
    calculateBalance(balance, capitalPayment);
    // Método del array paymentPlan para agregar en la última posición cada cuota del plan de pagos
    paymentPlan.push({
        quotaNumber: i,
        interestPayment,
        capitalPayment,
        balance,
    })
}

console.log("----------- Cuota consultada -----------")

// Inicializo variable para usar método de búsqueda
let feeFind = Number(prompt("Ingrese la cuota en la cual quiere consultar el detalle"))

// Función para aplicar método de búsqueda
function feeSearch() {
    const feeToShow = paymentPlan.find(cuota => cuota.quotaNumber === feeFind);
    console.log("La cuota que estás consultando es la No " + feeToShow.quotaNumber);
    console.log("El valor abonado a intereses sería: " + feeToShow.interestPayment + " USD");
    console.log("El valor abonado a capital sería: " + feeToShow.capitalPayment + " USD");
    console.log("El saldo después del pago de esta cuota sería: " + feeToShow.balance + " USD");
}

feeSearch()
console.log(paymentPlan);
