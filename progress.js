const walletAddress = '0xf222b28df3DA6FaAaBb48E2b99d4F270bcD92d50';

const progressElement = document.getElementById('binance-progress');
let initialBalance = 0;

function actualizarBarraProgreso() {
  axios
    .get(
      `https://api.bscscan.com/api?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=YourApiKeyHere`
    )
    .then(function (response) {
      const binanceBalance = parseFloat(response.data.result) / 1e18;

      if (initialBalance === 0) {
        initialBalance = binanceBalance;
      }

      const maxBsc = 10;
      const maxBscGreenBar = 10;

      const binancePercentage = (binanceBalance / maxBsc) * 100;
      const greenBarPercentage = ((binanceBalance - initialBalance) / maxBscGreenBar) * 100;

      const limitedPercentage = Math.min(binancePercentage, 100);
      const limitedGreenBarPercentage = Math.min(greenBarPercentage, 100);

      progressElement.style.width = limitedPercentage + '%';

      if (limitedGreenBarPercentage > 0) {
        progressElement.classList.add('green-bar');
        progressElement.textContent = limitedGreenBarPercentage.toFixed(2) + '%';
        progressElement.classList.add('percentage-white');
      } else if (limitedPercentage > 0) {
        progressElement.textContent = limitedPercentage.toFixed(2) + '%';
        progressElement.classList.add('percentage-blue');
      } else {
        progressElement.textContent = '0%';
        progressElement.classList.remove('percentage-white');
        progressElement.classList.remove('percentage-blue');
      }

      document.getElementById('bsc-raise').textContent = `BSC Raise: ${binanceBalance.toFixed(5)}`;
    })
    .catch(function (error) {
      console.log(error);
    });
}

actualizarBarraProgreso();

setInterval(actualizarBarraProgreso, 5 * 60 * 1000);
