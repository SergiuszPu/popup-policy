'use strict';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var dataSession = [];
// let consentProprtyName
function url() {
    return __awaiter(this, void 0, void 0, function () {
        var text, data, vendors, el;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://optad360.mgr.consensu.org/cmp/v2/vendor-list.json')];
                case 1:
                    text = _a.sent();
                    return [4 /*yield*/, text.json()
                        // console.log(data);
                    ];
                case 2:
                    data = _a.sent();
                    return [4 /*yield*/, data.vendors];
                case 3:
                    vendors = _a.sent();
                    for (el in vendors) {
                        // console.log(vendors[el].name, vendors[el].policyUrl);
                        dataSession.push({ name: vendors[el].name, url: vendors[el].policyUrl });
                        // console.log(vendors[el].name, +' link do policy' + '<a>' + vendors[el].policyUrl +'</a>');
                    }
                    uploadPopup(dataSession);
                    return [2 /*return*/];
            }
        });
    });
}
// console.log(dataSession);
var arg = [];
function uploadPopup(data) {
    var name = document.querySelector('.name');
    var link = document.querySelector('.link');
    var check = document.querySelector('.check');
    var setpopup = document.querySelector('.setPopup');
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var el = data_1[_i];
        // arg.push(el.url)
        // console.log(el.url);
        var addName = document.createElement('div');
        addName.innerHTML = el.name + ' ' + ("(<a href=\"" + el.url + "\" target=\"blank\">Policy</a>)");
        name.appendChild(addName);
        var addLink = document.createElement('div');
        // addLink.innerHTML = `<a href="${el.url}">Policy</a>`
        // link.appendChild(addLink)
        var addCheck = document.createElement('input');
        addCheck.setAttribute("type", "checkbox");
        addCheck.setAttribute("id", el.name);
        check.appendChild(addCheck);
        // checkForm()
    }
    // console.log(arg);
}
url();
var table = [];
function checkForm() {
    var input = document.querySelectorAll('input');
    for (var el in input) {
        if (input[el].checked) {
            console.log(input[el].id);
            table.push(input[el].id);
        }
    }
    console.log(table);
}
// checkForm()
var odpmowa = document.getElementById('reject');
var consentPoput = document.getElementById('modal');
odpmowa.addEventListener('click', function () {
    // consentPoput.classList.remove('hidden')
    // saveToStorage(storageType);
});
var cookieStorage = {
    getItem: function (key) {
        // console.log('key', key);
        var cookies = document.cookie
            .split(';')
            .map(function (cookie) { return cookie.split('='); })
            .reduce(function (acc, _a) {
            var _b;
            var key = _a[0], value = _a[1];
            return (__assign(__assign({}, acc), (_b = {}, _b[key.trim()] = value, _b)));
        }, []);
        // console.log(acc);
        return cookies[key];
    },
    setItem: function (key, value) {
        checkForm();
        // window.location.reload();
        var date = new Date();
        date.setTime(date.getTime() + (86400));
        var expires = "; expires=" + date.toGMTString();
        document.cookie = key + "=" + value + " " + expires;
        // window.location.reload();
    }
};
var storageType = cookieStorage;
var consentProprtyName = table;
var shouldShowPopup = function () { return !storageType.getItem(consentProprtyName); };
var saveToStorage = function () { return storageType.setItem(consentProprtyName, true); };
window.onload = function () {
    var consentPoput = document.getElementById('modal');
    var acceptBtn = document.getElementById('accept');
    var popup = document.getElementById('header');
    var acceptFn = function (event) {
        saveToStorage(storageType);
        consentPoput.classList.add('hidden');
        popup.classList.remove('blur');
    };
    acceptBtn.addEventListener('click', acceptFn);
    if (shouldShowPopup(storageType)) {
        consentPoput.classList.remove('hidden');
        popup.classList.add('blur');
        // const consent = confirm('Agree this popup');
        // if(consent) {
        //     saveToStorage()
        // }
    }
};
