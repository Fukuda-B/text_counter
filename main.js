let text_area = document.getElementById('text_area') // textarea;
let counter = document.getElementById('counter'); // log text
let clr_button = document.getElementById('clr_button'); // clear button
let dark_mode = document.getElementById('dark_mode'); // dark mode
let spell_check = document.getElementById('spell_check'); // spell check
let text = ''; // text value
let settings = {'text':text, 'dark_mode':false, 'spell_check':true}; // default

window.onload = function() { // onload event
    load_settings();
    text_area.addEventListener('input', update_text);
    clr_button.addEventListener('click', clr_text);
    dark_mode.addEventListener('click', change_dark_mode);
    spell_check.addEventListener('click', change_spell_check);
    update_disp(text);
}

function load_settings() { // load settings from localStorage
    let set_val = localStorage.getItem('text_counter_settings');
    if (set_val) settings = JSON.parse(set_val);
    disp_dark_mode(settings.dark_mode);
    disp_spell_check(settings.spell_check);
    text = settings.text;
    text_area.value = settings.text;
}

function update_text(event) { // get input event
    // console.log(event);
    text = event.target.value;
    update_settings(text, settings.dark_mode, settings.spell_check);
    update_disp(text);
}

function update_disp(text) { // update counter
    let text_length, word_length;
    if (text && text.length > 0) {
        text_length = text.replace(/\n|\r\n/g, '').length;
        word_length = text.match(/\S+/g).length;
    } else {
        text_length = 0, word_length = 0;
    }
    counter.innerHTML = '文字数 : '+text_length+'<br>'+'単語数 : '+word_length;
}

function clr_text(event) { // clear textarea
    text_area.value = '';
    update_settings('', settings.dark_mode, settings.spell_check);
    update_disp(text_area);
}

function change_dark_mode() { // save & call disp_dark_mode
    update_settings(settings.text, dark_mode.checked, settings.spell_check);
    disp_dark_mode(dark_mode.checked); // disp dark mode
}

function disp_dark_mode(val) { // change display
    let body = document.getElementsByTagName('body')[0]; // get body
    if (val) {
        body.style = 'background: #222; color: #eee';
        text_area.style = 'background: #222; color: #eee';
        dark_mode.checked = true;
    } else {
        body.style = '';
        text_area.style = '';
        dark_mode.checked = false;
    }
}

function change_spell_check() { // save & call disp_spell_check
    update_settings(settings.text, settings.dark_mode, spell_check.checked);
    disp_spell_check(spell_check.checked);
}

function disp_spell_check(val) { // change value
    spell_check.checked = val;
    text_area.spellcheck = val;
}

function update_settings(tx, dark, spell) { // save to localStorage
    settings = {'text':tx, 'dark_mode':dark, 'spell_check':spell};
    localStorage.setItem('text_counter_settings', JSON.stringify(settings));
}
