document.addEventListener('DOMContentLoaded', function () {

    let serverUrl = "http://localhost:60010/";

    document.getElementById("chatInput").addEventListener('input', () => {

        let inputField = document.getElementById("chatInput");
        let lastWordInput = getLastWord(inputField.value);
        if (lastWordInput !=="") {

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

                    let ACOptions = document.getElementsByClassName("auto_complete");
                    let firstThreeACWord = response.slice(0,3);
                    for (let i = 0; i < ACOptions.length; i++) {
                        ACOptions[i].innerText = "";
                        if (i < firstThreeACWord.length) {
                            ACOptions[i].innerText = firstThreeACWord[i];
                            ACOptions[i].addEventListener('click',() => changeLastWord(inputField.value, ACOptions[i].innerText))
                        }
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
        return words[words.length - 1];

}

function changeLastWord(originalString, newWord) {

    let words = originalString.split(" ");
    words[words.length - 1] = newWord;
    document.getElementById("chatInput").value = words.join(" ");

}


