
    const amountInput = document.getElementById('amount');
    const vatSelect = document.getElementById('vat');
    const currencySelect = document.getElementById('currency');
    const modeRadios = document.getElementsByName('mode');

    function calculate() {
      const amount = parseFloat(amountInput.value);
      const rate = parseFloat(vatSelect.value);
      const currency = currencySelect.value;
      const mode = [...modeRadios].find(r => r.checked).value;

      if (isNaN(amount)) {
        document.getElementById('net').textContent = '-';
        document.getElementById('vatAmount').textContent = '-';
        document.getElementById('gross').textContent = '-';
        document.getElementById('rate').textContent = '-';
        return;
      }

      let net, vatAmount, gross;

      if (mode === 'add') {
        net = amount;
        vatAmount = net * rate / 100;
        gross = net + vatAmount;
      } else {
        gross = amount;
        net = gross / (1 + rate / 100);
        vatAmount = gross - net;
      }

      document.getElementById('net').textContent = net.toFixed(2) + ' ' + currency;
      document.getElementById('vatAmount').textContent = vatAmount.toFixed(2) + ' ' + currency;
      document.getElementById('gross').textContent = gross.toFixed(2) + ' ' + currency;
      document.getElementById('rate').textContent = rate + '%';
    }

    amountInput.addEventListener('input', calculate);
    vatSelect.addEventListener('change', calculate);
    currencySelect.addEventListener('change', calculate);
    modeRadios.forEach(r => r.addEventListener('change', calculate));

