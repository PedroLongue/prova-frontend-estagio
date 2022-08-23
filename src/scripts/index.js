async function searchCep() {
  const cep = document.querySelector(".cep-input");
  const cepValue = document.querySelector(".cep-input").value;
  const invalidCep = document.querySelector(".error-message");
  const validCep = cepValue.replace("-", "");

  if (validCep.length !== 8) {
    resetInput(cep);
    invalidCep.innerHTML = `<div>
                              <p>Digite um cep válido!</p>
                            </div>`;
    return;
  } else {
    invalidCep.innerHTML = ``;
    let url = `https://viacep.com.br/ws/${cepValue}/json/`;
    let response = await fetch(url);
    let cepData = await response.json();

    renderAdress(cepData, invalidCep);
    resetInput(cep, cepData);
  }
}

function renderAdress(cepData, invalidCep) {
  let show = document.querySelector(".cep-informations");

  if (cepData.erro) {
    show.innerHTML = `<p>Endereço não localizado!</p>`;
  } else {
    show.innerHTML = `<div>
                        <p>Cep: ${cepData.cep}</p>
                        <p>Logradouro: ${cepData.logradouro}</p>
                        <p>Complemento: ${cepData.complemento}</p>
                        <p>Bairro: ${cepData.bairro}</p>
                        <p>Localidade: ${cepData.localidade}</p>
                        <p>UF: ${cepData.uf}</p>
                        <p>Siafi: ${cepData.siafi}</p>
                        <p>DDD: ${cepData.ddd}</p>
                        <p>GIA: ${cepData.gia}</p>
                        <p>IBGE: ${cepData.ibge}</p>
                      </div>  `;
  }
}

function resetInput(cep) {
  cep.value = "";
}
