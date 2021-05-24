console.log('reqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq111111111');
const getReqs = () => {
    $.ajax({
        type: "GET",
        url: `${window.location.origin}/WebGetRequisitesSave.hal`,
        success: (data, message, res) => {
          if (!data) return;
          console.log('res = ', res);
          data = JSON.parse(data);
          console.log('data = ', data);

          if (res.status != 200) return;
          const { fiz_accNumber, fiz_bankCode, fiz_email, fiz_phone, fiz_sia, jur_accNumber, jur_address,
                jur_bankCode, jur_contactPersonSIA, jur_email, jur_phone, jur_regNr, jur_sia, jur_source } = data;
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
          if (jur_source) $('#reqJur_source').va(jur_source);
        },
        error: (e) => {
          console.log('error = ', e);
        }
    });
}

document.addEventListener("DOMContentLoaded", function(event) { 
  getReqs();
  /*
  $('#reqJur_saveBtn').click(() => {
  });
  $('#reqFiz_saveBtn').click(() => {
  });*/
});

// });