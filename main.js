document.querySelector(".control-buttons span").onclick = function () {
    let yourName = prompt("Whats Your Name?");

    if(yourName === null || yourName === "") {
        document.querySelector(".name span").innerHTML = 'Unknown';
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }

    //Remove splash screen
    document.querySelector(".control-buttons").remove();
};

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

//let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys()); 

shuffle(orderRange);

//Add Order CSS Property to game blocks
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    //Add Click Event
    block.addEventListener('click', function (){
        
        //Trigger The Flip Function
        flipBlock(block);

    })
});

//Flip Block Function
function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');

    //Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(
        flippedBlock => flippedBlock.classList.contains('is-flipped'));

    //If Theres Two selected blocks
    if(allFlippedBlocks === 2) {

        //Stop Clicking Function
        stopClicking();

        //Check Matched Block Function
        checkedMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    
    }

}

//Stop Clicking Function
function stopClicking() {

    //Add Class No Clicking On Main Container
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {

        //Remove class no clicking after the duration
        blocksContainer.classList.remove('no-clicking');

    }, duration);
}

//Check matched blocks
function checkedMatchedBlocks(firstBlock, secondBlock){
    let triesElement = document.querySelector(".tries span");

    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();

    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        
        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        
        }, duration);

        document.getElementById('fail').play();
        
    }
}

//Shuffle Function
function shuffle(array) {
    
    //Settings Vars
    let current = array.length,
        temp,
        random;

    while(current > 0) {

        //Get Random Number
        random = Math.floor(Math.random() * current);

        //Decrease Length By One
        current--;

        //Save Current Element in Stash
        temp = array[current];

        //Current Element = Random Element
        array[current] = array[random];

        //Random Element = Get Element From Stash
        array[random] = temp;
    }

    return array;
}

