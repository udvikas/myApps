const form = document.querySelector("#inviteForm");
const input = document.querySelector("input");
const ul = document.querySelector('#invitedList');
const main = document.querySelector('.main');

// 1. Create li

function createLi() {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = input.value;
  const label = document.createElement("label");
  label.innerText = 'Confirmed';
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const editBtn = document.createElement("button");
  editBtn.innerText = "edit";
  const removeBtn = document.createElement("button");
  removeBtn.innerText = "remove";

  label.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(label);
  li.appendChild(editBtn);
  li.appendChild(removeBtn);

  return li;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const li = createLi();
    if(input.value === '') {
        alert('Enter the Name Please!');
    } else {
        ul.appendChild(li);
    }
    
})

// 2. Add responded class
ul.addEventListener('change', (event) => {
    const checkbox = event.target;
    const checked = checkbox.checked;
    const li = checkbox.parentNode.parentNode;
    if (checked) {
        li.className = 'responded';
    } else {
        li.className = '';
    }
})

// 3. Button actions

ul.addEventListener('click', (event) => {
    if(event.target.tagName === 'BUTTON') {
        const button = event.target;
        const li = button.parentNode;
        const ul = li.parentNode;
        if(button.innerText === 'remove') {
            ul.removeChild(li);
        } else if(button.innerText === 'edit') {
            const span = li.firstElementChild;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = span.innerText;
            li.insertBefore(input, span);
            li.removeChild(span);
            button.innerText = 'save';
        } else if(button.innerText === 'save') {
            const input = li.firstElementChild;
            const span  = document.createElement('span');
            span.innerText = input.value;
            li.insertBefore(span, input);
            li.removeChild(input);
            button.innerText = 'edit';
        }
    }
});

// 4. create and append elements

const div = document.createElement('div');
div.className = 'showHide';
const filterLabel = document.createElement('label');
filterLabel.innerText = 'Hide those who have not responded';
const filterCheckbox = document.createElement('input');
filterCheckbox.type = 'checkbox';

div.appendChild(filterLabel);
filterLabel.appendChild(filterCheckbox);
main.insertBefore(div, ul);

filterCheckbox.addEventListener('change', (event) => {
    const isChecked = event.target.checked;
    const lis = ul.children;

    if (isChecked) {
        for(let i = 0; i < lis.length; i++) {
            const li = lis[i];
            if(li.className === 'responded') {
                li.style.display = '';
            }else {
                li.style.display = 'none';
            }
        }
    } else {
        for(let i = 0; i < lis.length; i++) {
            const li = lis[i];
            li.style.display = '';
        }
    }
})