function GenerateMatrix() {
    const size = document.getElementById('numbers').value;
    const container = document.getElementById('matrix-container');
    container.innerHTML = "";

    let row = 0;
    let col = 0;
    id = "cell-";
    let divRow = document.createElement('div');
    divRow.className = 'row-container';
    for(let i = 0; i < size*size; i++) {
        if (i % size === 0 && i !== 0) {
        container.append(divRow)
        divRow = document.createElement('div');
        divRow.className = 'row-container';
        row++;
        col = 0;
        }

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'input-box';
        input.id = `cell-${row}-${col}`;
        input.autocomplete = "off";
        const currentRow = row;
        const currentCol = col;
        input.addEventListener('keydown', function(e) {
            let targetId;

        if (e.key === "ArrowRight" && this.selectionStart === this.value.length) {
            targetId = `cell-${currentRow}-${currentCol + 1}`;
        } else if (e.key === 'ArrowLeft' && this.selectionStart === 0) {
            targetId = `cell-${currentRow}-${currentCol - 1}`;
        } else if (e.key === 'ArrowUp') {
            targetId = `cell-${currentRow - 1}-${currentCol}`;
        } else if (e.key === 'ArrowDown') {
            targetId = `cell-${currentRow + 1}-${currentCol}`;
        }
            
            if (targetId){
                const target = document.getElementById(targetId)
                if (target) {
                    e.preventDefault();
                    target.focus();
                }
            }

        });
        input.addEventListener('input', function() {
            validateInput(this);
        });
        divRow.appendChild(input);
        col ++
    };
    container.append(divRow);
    const calcButton = document.createElement("button");
    const clearButton = document.createElement("button");

    calcButton.textContent = "Calculate";
    clearButton.textContent = "Clear";

    calcButton.onclick = Calculate;
    clearButton.onclick = Clear;

    const buttonRow = document.createElement('div');
    const answerRow = document.createElement('div');
    const answer = document.createElement('h2');

    answer.id = 'ans';
    buttonRow.className = 'button-row';
    answerRow.className = 'answer-container';

    answerRow.append(answer);
    buttonRow.appendChild(clearButton);
    buttonRow.appendChild(calcButton);

    container.appendChild(buttonRow);
    container.appendChild(answerRow);
}

let lastData = {}
function Calculate() {
    let f = 0;
    const size = document.getElementById('numbers').value;
    let dataset = {"size": size, "nums": []};
    const inputs = document.getElementsByClassName('input-box');
    let datarow = []
    for (let i = 0; i < inputs.length; i++){
        currentInput = inputs[i]
        if (currentInput.value !== '' && !isNaN(Number(currentInput.value))){
            datarow.push(currentInput.value);
            if ((i+1) % size === 0) {
                dataset["nums"].push(datarow);
                datarow = [];
            }
            f ++;
        } else {
            return
        }
    };
    if (f === size*size && JSON.stringify(lastData) !== JSON.stringify(dataset)) {
        lastData = JSON.parse(JSON.stringify(dataset));
        responseFunction(dataset);
    } else {
        return
    }
}

function Clear(){
    ansContainer = document.getElementById('ans');
    ansContainer.innerHTML = '';
    const inputs = document.getElementsByClassName('input-box');
    for (let i = 0; i < inputs.length; i++){
        inputs[i].value = '';
        validateInput(inputs[i]);
    }
}

async function responseFunction(data) {
    url = '/items';
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    ans = await response.json();
    console.log(data, ans);
    ansContainer = document.getElementById('ans');
    ansContainer.innerHTML = '= ' + ans['det'];
}

function validateInput(input) {
     targetValue = input.value;

    if (targetValue === '' | Number(targetValue) | targetValue === '0') {
        input.style.borderColor = '';

    } else {
    input.style.borderColor = "rgb(250, 3, 118)";
    }

}