const selector = sel => document.querySelector(sel);

const inputList = [selector('#inputDateTime'), selector('#inputSumma'), selector('#inputFN'), selector('#inputFD'), selector('#inputFPD')], 
      inputType = selector('#inputType'),
      qrscan = selector('#qrscan'),
      modalAuth = selector('.modal-auth'),
      closeAuth = selector('.close-auth'),
      video = selector('#qr-video'), 
      fileSelector = selector('#file-selector');

const closeModal = close => {
    if (close) modalAuth.classList.remove('is-open');
}

const parseString = str => {
    const parseDate = () => {
        const date = str.substr(str.indexOf('=') + 1, str.indexOf('&') - 1),
              yyyy = date[0] + date[1] + date[2] + date[3],
              MM = date[4] + date[5],
              dd = date[6] + date[7],
              hh = date[8] + date[9],
              mm = date[10] + date[11];
              
        return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
    }

    inputType.value = str[str.length - 1];
    str = str.replace(/[a-z]/gi, '');

    inputList.forEach((elem, i) => {
        elem.value = (i ? str.substr(str.indexOf('=') + 1, str.indexOf('&') - 1) : parseDate()); 
        str = str.substr(str.indexOf('&') + 1, str.length);
    });

    if (!inputType.value)
        alert("Error!");
    else closeModal(true);
}

qrscan.addEventListener('click', () => modalAuth.classList.add('is-open'));
closeAuth.addEventListener('click', () => modalAuth.classList.remove('is-open'));