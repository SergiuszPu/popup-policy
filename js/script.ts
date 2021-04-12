'use strict';

// variables
const setVendorName= document.querySelector('.name');
const setPolicyLink = document.querySelector('.link');
const setCheckbox = document.querySelector('.check');
const modal = document.getElementById('modal');
const acceptBtn = document.getElementById('accept');
const header = document.getElementById('header');

// data variables
const policyData: Array<{ name: string, url: string }> = [];
const checkedInputData: string[] = [];

//download vendors for cookies policy
async function fetchVendorsPolicy() {
    const text = await fetch('https://optad360.mgr.consensu.org/cmp/v2/vendor-list.json');
    const data = await text.json();
    const vendors = await data.vendors;

    for (let vendor in vendors) {
        policyData.push({name: vendors[vendor].name, url: vendors[vendor].policyUrl});
    }
    setPopupData(policyData);
}

// set data into the modal popup (name, link url, checkbox)
function setPopupData(vendors: Array<{ name: string, url: string }> = []) {
    for (let vendor of vendors) {
        let addName = document.createElement('div');
        addName.innerHTML = `${vendor.name} (<a href="${vendor.url}" target="blank">Policy</a>)`;
        setVendorName?.appendChild(addName);

        let addCheckbox = document.createElement('input');
        addCheckbox.setAttribute("type", "checkbox");
        addCheckbox.setAttribute("id", vendor.name);
        setCheckbox?.appendChild(addCheckbox);
    }
}

fetchVendorsPolicy();

// checked all checkbox input with one is checked
function checkedVendorsInput() {
    const inputs = document.querySelectorAll('input');
    for (let input in inputs) {
        if (inputs[input].checked) {
            checkedInputData.push(inputs[input].id);
        }
    }
}

//get and set data for cookie 
const cookieStorage = {
  getItem: (key: string[] | any) => {
    const cookies = document.cookie
      .split(';')
      .map(cookie => cookie.split('='))
      .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), []);
       return cookies[key];
    },
    setItem: (key: string[], value: boolean) => {
      checkedVendorsInput()
      const date = new Date();
      date.setTime(date.getTime() + (86400000));
      const expires = "; expires=" + date.toUTCString();
        
      document.cookie = `${key}=${value} ${expires}`;
    },
};

const storageType = cookieStorage;
const consentPropertyName = checkedInputData;

// check and save data on the cookie file
const shouldShowPopup = () => !storageType.getItem(consentPropertyName);
const saveToStorage = () => storageType.setItem(consentPropertyName, true);

// when all data on page is loaded open the modal witch policy
window.onload = () => {
    const acceptFn = () => {
        saveToStorage();
        modal?.classList.add('hidden');
        header?.classList.remove('blur');
    }
    acceptBtn?.addEventListener('click', acceptFn);

    if (shouldShowPopup()) {
        modal?.classList.remove('hidden');
        header?.classList.add('blur');
    }
}
