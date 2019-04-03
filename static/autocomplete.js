document.addEventListener('DOMContentLoaded', function () {

    let serverUrl = "http://localhost:60010/";

    document.getElementById("chatInput").addEventListener('input', () => {

        let inputField = document.getElementById("chatInput");
        let lastWordInput = getLastWord(inputField.value);
        if (lastWordInput != "" &&  document.getElementById("chatInput") === document.activeElement) {

            $.ajax({

            type: "POST",
            url: serverUrl + "autocomplete",
            data: JSON.stringify({"word": lastWordInput}),
            dataType: "JSON",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: function (response) {
                let firstThreeACWord = response.slice(0,3);
                for (let i = 0; i < firstThreeACWord.length; i++) {
                    let elem = document.getElementById("ac_option" + i);
                    elem.innerText = firstThreeACWord[i];
                    elem.addEventListener('click',() => changeLastWord(inputField.value, elem.innerText))
                }

            },
            error: function (response) {
                console.log("Some error happened");
            }


            });
        }

    });

});

function getLastWord(text) {

        let words = text.split(" ");
        console.log(words[words.length - 1]);
        return words[words.length - 1];


}

function changeLastWord(originalString, newWord) {

    let words = originalString.split(" ");
    words[words.length - 1] = newWord;
    document.getElementById("chatInput").value = words.join(" ");

}


