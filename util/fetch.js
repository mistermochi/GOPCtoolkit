define(function (){
    return function(link, onSuccess) {
        const xhr = new XMLHttpRequest()
        xhr.addEventListener("load", function () {
            onSuccess(xhr.responseText)
        })
        xhr.open("GET", link, true)
        xhr.send()
    }
})