const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

const savedTodoList = JSON.parse(localStorage.getItem('saved-items'));
//console.log(savedTodoList);

// 함수 표현식 : hoisting X
const createTodo = function(storageData) {
// function createTodo() {} 함수 선언식 : hoisting O

    let todoContents = todoInput.value;

    if(storageData) {
        todoContents = storageData.contents;
    }


    const newLi = document.createElement('li');
    const newSpan = document.createElement('span');
    const newBtn = document.createElement('button');
    
    newBtn.addEventListener('click', () => {
        newLi.classList.toggle('complete');
        saveItemsFn();
    });

    newLi.addEventListener('dblclick', () => {
        newLi.remove();
        saveItemsFn();
    });

    if(storageData?.complete) {  // 옵셔널체이닝 : undefined, null check
        newLi.classList.add('complete');
    }

    newSpan.textContent = todoContents;
    newLi.appendChild(newBtn);
    newLi.appendChild(newSpan);
    todoList.appendChild(newLi);
    todoInput.value = '';
    saveItemsFn();
}

const keyCodeCheck = function() {
    if(window.event.keyCode === 13 && todoInput.value !== '') {
        createTodo();
    }
}

const deleteAll = function() {
    const liList = document.querySelectorAll('li');
    for(let i = 0; i < liList.length; i++) {
        liList[i].remove();
    }
    saveItemsFn();
}

const saveItemsFn = function() {
    const saveItems = [];
    for(let i = 0; i < todoList.children.length; i++) {
        const todoObj = { 
            contents: todoList.children[i].querySelector('span').textContent,
            complete: todoList.children[i].classList.contains('complete'),
        }
        saveItems.push(todoObj);
    }

    saveItems.length === 0 
        ? localStorage.removeItem('saved-items') 
        : localStorage.setItem('saved-items',JSON.stringify(saveItems));
}

if(savedTodoList) {
    for(let i = 0; i < savedTodoList.length; i++) {
        createTodo(savedTodoList[i]);
    }
}

const accessToGeo = function(position) {
    const positionObj = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }

    console.log(positionObj);
}

const askForLocation = function() {
    
    /**
     * 2023.05.17 [ issue ]
     * live server로 실행시 보안정책상 api호출이 안됨.
     * localhost는 예외이므로 개발시엔 localhost로 대체  
     * live server는 보안정책 해제 못하나?? live server 도메인을 localhost로..?
     **/  
    navigator.geolocation.getCurrentPosition(accessToGeo, (err) => {
        console.log(err);
    });
    
}
askForLocation();
