const showCepInformations = document.querySelector(".cep-informations");

const searchCep = async () => {
  const cep = document.querySelector(".cep-input");
  const cepValue = document.querySelector(".cep-input").value;
  const invalidCep = document.querySelector(".error-message");
  const validCep = cepValue.replace("-", ""); //auxilia no tratamento dos erros
  const onlyNumber = /^[0-9]+$/.test(validCep);
  //verifica se o cep não é válido
  if (validCep.length !== 8 || !onlyNumber) {
    resetInput(cep);
    resetOutput();
    invalidCep.innerHTML = `<div>
                              <p>Digite um cep válido!</p>
                            </div>`;
  } else {
    invalidCep.innerHTML = ``;
    let url = `https://viacep.com.br/ws/${cepValue}/json/`; //url da API
    let response = await fetch(url);
    let cepData = await response.json(); //armazena o json

    renderAdress(cepData);
    resetInput(cep);
  }
};

const renderAdress = (cepData) => {
  if (cepData.erro) {
    showCepInformations.innerHTML = `<p>Endereço não localizado!</p>`; //Tratamento de erro, caso o cep informado não esteja na API
  } else {
    //renderiza as informações
    showCepInformations.innerHTML = `<div>
                        <a target="_blank" href="https://www.google.com/search?q=${cepData.cep}&sxsrf=ALiCzsYr1Wu5qNOqUc7fcmpqMlVL7MbjrA%3A1661216707758&source=hp&ei=wycEY_C7K6zf1sQP7vC-gAw&iflsig=AJiK0e8AAAAAYwQ108JE2AEW7kNszZ6x35tTjNT-ynGp&ved=0ahUKEwiwqYi-4tv5AhWsr5UCHW64D8AQ4dUDCAY&uact=5&oq=28642000&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECc6BwgjEOoCECc6CwguEIAEEMcBEK8BOgUIABCABDoFCC4QgAQ6AggmOgUIABDLAVDMBFjLDGD8DWgBcAB4AIABjgGIAeQHkgEDMC44mAEAoAEBsAEK&sclient=gws-wiz">Cep: ${cepData.cep}</a>
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
};

const resetInput = (cep) => {
  cep.value = "";
};

const resetOutput = () => {
  //reseta as informações renderizadas
  showCepInformations.innerHTML = ``;
};
