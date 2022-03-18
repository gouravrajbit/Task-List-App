const taskinput = document.querySelector('#task');
const form = document.querySelector('#task-form');
const filterInput = document.querySelector('#filter');
const ul = document.querySelector('ul');
const clearTaskBtn = document.querySelector('.clear-tasks');

//Loading items from Session Storage

const loadItems = () => {
    if (String(localStorage.getItem('itemList')) === 'null') {
        return;
    }


    const itemList = JSON.parse(localStorage.getItem('itemList'));

    itemList.forEach((item) => {
        const newLi = document.createElement('li');
        const newA = document.createElement('a');
        const newI = document.createElement('i');

        //building i tag
        newI.classList.add('fa', 'fa-remove');


        // building a tag
        newA.appendChild(newI);
        newA.classList.add('delete-item', 'secondary-content');
        newA.setAttribute('href', '#');



        //building 'li' tag
        newLi.appendChild(document.createTextNode(item));
        newLi.appendChild(newA);
        newLi.classList.add('collection-item');
        ul.appendChild(newLi);
    });


}
loadItems();

// adding items to the task list


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newLi = document.createElement('li');
    const newA = document.createElement('a');
    const newI = document.createElement('i');

    //building i tag
    newI.classList.add('fa', 'fa-remove');


    // building a tag
    newA.appendChild(newI);
    newA.classList.add('delete-item', 'secondary-content');
    newA.setAttribute('href', '#');



    //building 'li' tag
    newLi.appendChild(document.createTextNode(taskinput.value));
    newLi.appendChild(newA);
    newLi.classList.add('collection-item');
    ul.appendChild(newLi);


    //storing values to the itemList

    let itemList;
    if (String(localStorage.getItem('itemList')) === 'null') {
        itemList = [];
    } else {
        itemList = JSON.parse(localStorage.getItem('itemList'));
    }

    itemList.push(taskinput.value);

    localStorage.setItem('itemList', JSON.stringify(itemList));

    //clear the task input
    taskinput.value = '';
});


/// removing the tasks

document.querySelector('body').addEventListener('click', (e) => {

    if (!e.target.parentElement.classList.contains('delete-item')) {
        return;
    }

    e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);

    // remove the tasks from local storage
    // and there always be an item in the list as this function is getting called
    let itemList = JSON.parse(localStorage.getItem('itemList'));
    const textData = (e.target.parentElement.parentElement).innerText;
    const List = itemList.filter((item) => {
        return (item !== textData);
    });

    localStorage.setItem('itemList', JSON.stringify(List));
});




// clearing the tasks
clearTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    while (ul.childNodes.length) {
        ul.removeChild(ul.firstChild);
    }

    // clear the items from local storage
    localStorage.setItem('itemList', null);
});

// filtering the tasks

filterInput.addEventListener('keyup', (e) => {
    const data = filterInput.value.toLowerCase();

    // loop throught the children



    document.querySelectorAll('.collection-item').forEach((item) => {
        const liVAlue = item.innerText.toLowerCase();
        if (!liVAlue.includes(data)) {
            item.style.display = 'None';
        } else {
            item.style.display = 'block';
        }
    });
});



