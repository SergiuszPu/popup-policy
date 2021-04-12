// 'use strict';

// const dataSession = []
// // let consentProprtyName

// async function url() {
//     const text = await fetch('https://optad360.mgr.consensu.org/cmp/v2/vendor-list.json')
//     const data = await text.json()
//     // console.log(data);
//     const vendors = await data.vendors

//     for (let el in vendors) {
//         // console.log(vendors[el].name, vendors[el].policyUrl);
//         dataSession.push({ name: vendors[el].name, url: vendors[el].policyUrl })
//         // console.log(vendors[el].name, +' link do policy' + '<a>' + vendors[el].policyUrl +'</a>');
//     }

//     uploadPopup(dataSession)
// }

// // console.log(dataSession);

// let arg = []
// function uploadPopup(data) {
//     const name = document.querySelector('.name');
//     const link = document.querySelector('.link');
//     const check = document.querySelector('.check');
//     const setpopup = document.querySelector('.setPopup')

//     for (let el of data) {
//         // arg.push(el.url)
//         // console.log(el.url);

//         let addName = document.createElement('div')
//         addName.innerHTML = el.name + ' ' + `(<a href="${el.url}" target="blank">Policy</a>)`
//         name.appendChild(addName)

//         let addLink = document.createElement('div')
//         // addLink.innerHTML = `<a href="${el.url}">Policy</a>`
//         // link.appendChild(addLink)

//         let addCheck = document.createElement('input')
//         addCheck.setAttribute("type", "checkbox")
//         addCheck.setAttribute("id", el.name)
//         check.appendChild(addCheck)
//         // checkForm()
//     }

//     // console.log(arg);

// }


// url()

// const table = []

// function checkForm() {
//     const input = document.querySelectorAll('input');
//     for (let el in input) {
//         if (input[el].checked) {
//             console.log(input[el].id);
//             table.push(input[el].id)
//         }
//     }
//     console.log(table);
// }

// // checkForm()

// const odpmowa = document.getElementById('reject')
// const consentPoput = document.getElementById('modal');

// odpmowa.addEventListener('click', () => {
//     // consentPoput.classList.remove('hidden')
//     // saveToStorage(storageType);
// })

// const cookieStorage = {
//     getItem: (key) => {
//         // console.log('key', key);

//         const cookies = document.cookie
//             .split(';')
//             .map(cookie => cookie.split('='))
//             .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), []);
//         // console.log(acc);

//         return cookies[key];

//     },
//     setItem: (key, value) => {
//         checkForm()
//         // window.location.reload();
//         const date = new Date();
//         date.setTime(date.getTime() + (86400));
//         const expires = "; expires=" + date.toGMTString();

//         document.cookie = `${key}=${value} ${expires}`;
//         // window.location.reload();
//     },
// }

// const storageType = cookieStorage;
// const consentProprtyName = table

// const shouldShowPopup = () => !storageType.getItem(consentProprtyName);
// const saveToStorage = () => storageType.setItem(consentProprtyName, true);

// window.onload = () => {
//     const consentPoput = document.getElementById('modal');
//     const acceptBtn = document.getElementById('accept');
//     const popup = document.getElementById('header')

//     const acceptFn = (event) => {
//         saveToStorage(storageType);
//         consentPoput.classList.add('hidden')
//         popup.classList.remove('blur')
//     }

//     acceptBtn.addEventListener('click', acceptFn)

//     if (shouldShowPopup(storageType)) {
//         consentPoput.classList.remove('hidden')
//         popup.classList.add('blur')
//         // const consent = confirm('Agree this popup');
//         // if(consent) {
//         //     saveToStorage()
//         // }
//     }
// }


