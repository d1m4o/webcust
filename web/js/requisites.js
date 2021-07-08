
const getReqs = () => {
    $.ajax({
        type: "GET",
        url: `${window.location.origin}/WebGetRequisitesSave.hal`,
        success: (data, message, res) => {
          if (!data) return;
          data = JSON.parse(data);
          console.log('data =', data);
          if (res.status != 200) return;
          const { fiz_accNumber, fiz_bankCode, fiz_email, fiz_phone, fiz_sia,
            jur_accNumber, jur_address, jur_bankCode, jur_contactPersonSIA, 
            jur_email, jur_phone, jur_regNr, jur_sia, jur_source, isJur } = data;
          if (fiz_accNumber) $('#reqFiz_accNumber').val(fiz_accNumber);
          if (fiz_bankCode) $('#reqFiz_bankCode').val(fiz_bankCode);
          if (fiz_email) $('#reqFiz_email').val(fiz_email);
          if (fiz_phone) $('#reqFiz_phone').val(fiz_phone);
          if (fiz_sia) $('#reqFiz_sia').val(fiz_sia);

          if (jur_accNumber) $('#reqJur_accNumber').val(jur_accNumber);
          if (jur_address) $('#reqJur_address').val(jur_address);
          if (jur_bankCode) $('#reqJur_bankCode').val(jur_bankCode);
          if (jur_contactPersonSIA) $('#reqJur_contactPersonSIA').val(jur_contactPersonSIA);
          if (jur_email) $('#reqJur_email').val(jur_email);
          if (jur_phone) $('#reqJur_phone').val(jur_phone);
          if (jur_regNr) $('#reqJur_regNr').val(jur_regNr);
          if (jur_sia) $('#reqJur_sia').val(jur_sia);
          if (jur_source) $('#reqJur_source').val(jur_source);
          
          if (isJur == 1) {
            // JurCheck-styler
            $("#JurCheck").prop("checked", true);
            document.getElementById("JurCheck").customChecked = true;
            $('#JurCheck-styler').addClass('disabled');
            $("#JurCheck").prop('disabled', true);
            $('input[type=checkbox]').trigger('refresh');
            $("#JurCheck").prop("onclick", null).off("click");
          } else {
            document.getElementById("JurCheck").customChecked = false;
            setDisabledInputs(true);
          }

        },
        error: (e) => {
          console.log('error = ', e);
        }
    });
}

const setDisabledInputs = (isDisabled) => {
  if (isDisabled) {
    $('#reqJur_accNumber').attr('disabled', true);
    $('#reqJur_address').attr('disabled', true);
    $('#reqJur_bankCode').attr('disabled', true);
    $('#reqJur_contactPersonSIA').attr('disabled', true);
    $('#reqJur_email').attr('disabled', true);
    $('#reqJur_phone').attr('disabled', true);
    $('#reqJur_regNr').attr('disabled', true);
    $('#reqJur_sia').attr('disabled', true);
    $('#reqJur_source').attr('disabled', true);

    $('#reqJur_accNumber').css('background', '#f5f5f5');
    $('#reqJur_address').css('background', '#f5f5f5');
    $('#reqJur_bankCode').css('background', '#f5f5f5');
    $('#reqJur_contactPersonSIA').css('background', '#f5f5f5');
    $('#reqJur_email').css('background', '#f5f5f5');
    $('#reqJur_phone').css('background', '#f5f5f5');
    $('#reqJur_regNr').css('background', '#f5f5f5');
    $('#reqJur_sia').css('background', '#f5f5f5');
    $('#reqJur_source').css('background', '#f5f5f5');

    $('#reqJur_saveBtn').attr('disabled', true);
  } else {
    $('#reqJur_accNumber').attr('disabled', false);
    $('#reqJur_address').attr('disabled', false);
    $('#reqJur_bankCode').attr('disabled', false);
    $('#reqJur_contactPersonSIA').attr('disabled', false);
    $('#reqJur_email').attr('disabled', false);
    $('#reqJur_phone').attr('disabled', false);
    $('#reqJur_regNr').attr('disabled', false);
    $('#reqJur_sia').attr('disabled', false);
    $('#reqJur_source').attr('disabled', false);

    $('#reqJur_accNumber').css('background', '#fff');
    $('#reqJur_address').css('background', '#fff');
    $('#reqJur_bankCode').css('background', '#fff');
    $('#reqJur_contactPersonSIA').css('background', '#fff');
    $('#reqJur_email').css('background', '#fff');
    $('#reqJur_phone').css('background', '#fff');
    $('#reqJur_regNr').css('background', '#fff');
    $('#reqJur_sia').css('background', '#fff');
    $('#reqJur_source').css('background', '#fff');

    $('#reqJur_saveBtn').attr('disabled', false);
  }
};

const onRequisitesSaveClick = (personMode) => {
  console.log('personMode = ', personMode);
  if (personMode == 1) { // JUR
    const sia = $('#reqJur_sia').val();
    const regNr = $('#reqJur_regNr').val();
    const address = $('#reqJur_address').val();
    const accNumber = $('#reqJur_accNumber').val();
    const bankCode = $('#reqJur_bankCode').val();
    const contactPersonSIA = $('#reqJur_contactPersonSIA').val();
    const source = $('#reqJur_source').val();
    const phone = $('#reqJur_phone').val();
    const email = $('#reqJur_email').val();

    const isJur = document.getElementById("JurCheck").customChecked;
    if (isJur) {
      $('#JurCheck-styler').addClass('disabled');
      $("#JurCheck").prop('disabled', true);
      $('input[type=checkbox]').trigger('refresh');
      $("#JurCheck").prop("onclick", null).off("click");
    }

    //console.log(`${window.location.origin}/WebRequisitesSave.hal?mode=${personMode}&jur_sia=${sia}&jur_regNr=${regNr}&jur_address=${address}&jur_accNumber=${accNumber}&jur_bankCode=${bankCode}&jur_contactPersonSIA=${contactPersonSIA}&jur_source=${source}&jur_phone=${phone}&jur_email=${email}`);
    $.ajax({
      type: "GET",
      url: `${window.location.origin}/WebRequisitesSave.hal?mode=${personMode}&jur_sia=${sia}&jur_regNr=${regNr}&jur_address=${address}&jur_accNumber=${accNumber}&jur_bankCode=${bankCode}&jur_contactPersonSIA=${contactPersonSIA}&jur_source=${source}&jur_phone=${phone}&jur_email=${email}`,
      success: (data, message, res) => {
        if (res.status != 200) return;
        console.log(1, res.responseText);
        if (res.responseText == 'Error') {
          console.log('Error');
        } else if (res.responseText == 'Ok') {
          console.log('Ok');
          $('#savedLabelJur').css('display', 'inline');
          const timeOut = setTimeout(() => {
            $('#savedLabelJur').hide();
            clearTimeout(timeOut);
          }, 2000);
        } else if (res.responseText == 'EmailExistError') {
          console.log('EmailExistError');
        }
      },
      error: (e) => {
        console.log('error = ', e);
      }
    });


  } else if(personMode == 2) { // FIZ
    const sia = $('#reqFiz_sia').val();
    const accNumber = $('#reqFiz_accNumber').val();
    const bankCode = $('#reqFiz_bankCode').val();
    const phone = $('#reqFiz_phone').val();
    const email = $('#reqFiz_email').val();
    $.ajax({
      type: "GET",
      url: `${window.location.origin}/WebRequisitesSave.hal?mode=${personMode}&fiz_sia=${sia}&fiz_accNumber=${accNumber}&fiz_bankCode=${bankCode}&fiz_phone=${phone}&fiz_email=${email}`,
      success: (data, message, res) => {
        if (res.status != 200) return;
        console.log('res.responseText = ', res.responseText);
        if (res.responseText == 'Error') {
           console.log('Error');
        } else if (res.responseText == 'Fiz') {
          console.log('Ok');
          $('#savedLabel').css('display', 'inline');
          const timeOut = setTimeout(() => {
            $('#savedLabel').hide();
            clearTimeout(timeOut);
          }, 2000);
        }
      },
      error: (e) => {
        console.log('error = ', e);
      }
    });
  }
};


document.addEventListener("DOMContentLoaded", function(event) { 
  getReqs();
  $('#JurCheck').click((e) => {
    if (document.getElementById("JurCheck").customChecked) {
      document.getElementById("JurCheck").customChecked = false;
    } else document.getElementById("JurCheck").customChecked = true;

    let val = document.getElementById("JurCheck").customChecked;
    if (val) setDisabledInputs(false);
    else setDisabledInputs(true);
  });
  $('#reqFiz_saveBtn').click(() => {
    onRequisitesSaveClick(2);
  });
  $('#reqJur_saveBtn').click(() => {
    onRequisitesSaveClick(1);
  });
});
