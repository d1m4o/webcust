
const searchFunction = (inputValue) => {
    const divDocs = document.getElementsByClassName("col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12");
    for (i = 0; i < divDocs.length; i++) {
        let name = divDocs[i].getAttribute('name');
        if (!name) continue;
        if (name.toUpperCase().indexOf(inputValue.toUpperCase()) > -1) divDocs[i].style.display = '';
        else divDocs[i].style.display = 'none';
    }
};

const addListenerToSearchInput = (searchInput) => {
    if (!searchInput) return;
    searchInput.addEventListener('input', (e) => {
        searchFunction(e.target.value);
    });
    searchInput.addEventListener('change', (e) => {
        searchFunction(e.target.value);
    });
};

const getAllDocumentNames = () => {
    const divDocs = document.getElementsByClassName("col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12");
    const namesArray = [];

    if (!divDocs) return namesArray;
    for (i = 0; i < divDocs.length; i++) {
        let name = divDocs[i].getAttribute('name');
        if (name) if (!namesArray.includes(name)) namesArray.push(name);
    }
    return namesArray;
};

const addAutocomplete = () => {
    const tags = getAllDocumentNames();
    if (!document.getElementById('docSearchInput')) return;
    $("#docSearchInput").autocomplete({
    source: (request, response) => {
            let val = request.term; 
            response($.grep(
                tags,
                (item) => {
                    if (item.toUpperCase().indexOf(val.toUpperCase()) > -1) return item;
                })
            );
        },
    select: (e, ui) => {
        searchFunction(ui.item.value)
    },
    minLength: 2,
    });
};

$(document).ready(() => {
    const searchInput = document.getElementById('docSearchInput');
    addListenerToSearchInput(searchInput);
    addAutocomplete();
});
