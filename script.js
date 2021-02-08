initSelect('.select')

function initSelect(selectClass) {
    let selects = document.querySelectorAll(selectClass);

    for (let i = 0; i < selects.length; i++) {
        generateSelect(selects[i])
    }
}

function generateSelect(select) {
    select.classList.add('select--old')

    let label = document.createElement('label')
    label.setAttribute('class', 'select-container')

    let newSelect = document.createElement('ul')
    newSelect.setAttribute('class', 'select-list')

    let input = document.createElement('input')
    input.setAttribute('class', "select-input")

    let span = document.createElement('span')
    span.setAttribute('class', 'select-placeholder')

    select.parentNode.insertBefore(label, select);
    label.appendChild(select)
    label.appendChild(input)
    label.appendChild(newSelect)
    label.appendChild(span)

    updateSelect(select)

    // events
    input.onclick = function () {
        updateSelect(select)
        openSelect(select)
    }

    newSelect.onclick = function (e) {
        if (e.target.classList.contains('option')) {
            seletedSelect(e.target)
        }
    }
}

function updateSelect(select) {
    // console.log('Select updated')

    let newSelect = select.parentNode.querySelector('.select-list')
    let span = select.parentNode.querySelector('.select-placeholder')
    let input = select.parentNode.querySelector('.select-input')

    // update placeholder
    if (select.hasAttribute('placeholder')) {
        span.innerHTML = select.getAttribute('placeholder')
    }

    // update options
    newSelect.innerHTML = ''
    for (let i = 0; i < select.length; i++) {
        let newOption = document.createElement('li')
        newOption.setAttribute('class', 'option')

        if (select[i].value != "label") {
            newOption.value = select[i].value
            newOption.innerHTML = select[i].innerHTML
            newSelect.appendChild(newOption)
        }

        if (select[i].hasAttribute('selected')) {
            newOption.classList.add("selected")
            input.value = select[i].innerHTML
            input.setAttribute('readonly', 'true')
        }
    }
}

function openSelect(select) {
    // console.log('Select opened')
    select.closest('.select-container').classList.add('select-container--open')
}

function closeSelect(select) {
    // console.log('Select closed')
    select.closest('.select-container').classList.remove('select-container--open')
}

function seletedSelect(obj) {
    removeSelected(obj)

    closeSelect(obj)
    obj.classList.add('selected')
    obj.closest('.select-container').querySelector('.select-input').value = obj.innerHTML
    

    console.log(obj.closest('.select-container').querySelector('.select.select--old'))
}

function removeSelected(obj) {
    obj.closest('.select-list').querySelector('.selected').classList.remove('selected')
    
}

function removeAllSelected(obj) {
    let objects = obj.closest('.select-list').querySelectorAll('.selected')
    for(let i=0; i<objects.length; i++) {
        objects[i].classList.remove('selected')
    }
}