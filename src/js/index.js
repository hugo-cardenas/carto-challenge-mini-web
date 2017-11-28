import 'bulma/css/bulma.css';
import '../css/style.styl';
import createMap from './map';

const
    CLASS_HIDDEN = 'hidden',
    CLASS_HIDDEN_TRANSPARENT = 'hidden-transparent';

window.onload = () => {
    // Preventing FOUC
    document.querySelector('.container').style.visibility = 'visible';
    getConfigForm().onsubmit = handleFormSubmit;
};

const handleFormSubmit = async event => {
    event.preventDefault();
    setErrorMessage('');
    const form = event.target;

    let config;
    try {
        config = JSON.parse(form.querySelector('textarea').value);
    } catch (error) {
        setErrorMessage('Invalid JSON: ' + error.message);
        return;
    }

    try {
        showSpinner();
        await render(config);
        form.classList.add(CLASS_HIDDEN);
        showContent();
    } catch (error) {
        hideSpinner();
        setErrorMessage('Error rendering map: ' + error.message);
    }
};
    
const render = async config => {
    window.map = await createMap('map', config);
    const layerFilters = getLayerFiltersDiv();
    config.layers.forEach((layer, i) => {
        const elem = createLayerButton(map, i);
        layerFilters.appendChild(elem);
    });
    renderSQLForms(map, config);
};

const renderSQLForms = (map, config) => {
    const SQLFormsDiv = getSQLFormsDiv()
    config.layers
        .map((layer, index) => {
            if (layer.type === 'CartoDB') {
                return createSQLForm(map, index, layer.options.sql);
            }
            return null;
        })
        .filter(form => form !== null)
        .forEach(form => SQLFormsDiv.appendChild(form));
};

const createSQLForm = (map, index, sql) => {
    const form = getSQLFormTemplate().cloneNode(true);
    form.classList.remove('hidden');
    form.querySelector('label').innerText = `Layer ${index + 1}`;
    form.querySelector('input').value = sql;

    form.onsubmit = async event => {
        event.preventDefault();
        const form = event.target;
        const updateButton = form.querySelector('.button-update');
        form.querySelector('.error-message').innerText = '';

        updateButton.classList.add('is-loading');
        const sql = form.querySelector('input').value;
        try {
            await map.getLayer(index).setSQL(sql);
        } catch (error) {
            form.querySelector('.error-message').innerText = error.message;
        } finally {
            updateButton.classList.remove('is-loading');
        }
    };

    return form;
};

const createLayerButton = (map, index) => {
    const elem = document.createElement('a');
    elem.classList.add('button');
    elem.classList.add('is-primary');
    elem.innerText = 'Layer ' + (index + 1);
    elem.value = 'hide';

    elem.onclick = event => {
        const button = event.target;
        if (button.value === 'hide') {
            map.getLayer(index).hide();
            button.value = 'show';
            button.classList.remove('is-primary');
        } else {
            map.getLayer(index).show();
            button.value = 'hide';
            button.classList.add('is-primary');
        }
    };

    return elem;
};

const setErrorMessage = message => getConfigForm().querySelector('.error-message').innerText = message;

const showSpinner = () => getSpinner().classList.remove(CLASS_HIDDEN);

const hideSpinner = () => getSpinner().classList.add(CLASS_HIDDEN);

const showContent = () => getContent().classList.remove(CLASS_HIDDEN_TRANSPARENT);

// DOM selectors

const getConfigForm = () => querySelector('.form-config');

const getLayerFiltersDiv = () => querySelector('.layer-filters');

const getSQLFormTemplate = () => querySelector('.form-sql-template')

const getSQLFormsDiv = () => querySelector('.sql-forms')

const getContent = () => querySelector('.content');

const getSpinner = () => querySelector('.form-config .spinner');

const querySelector = selector => document.querySelector(selector);
