var defaultPreviewText = 'ABCDEFGHI';

var fontGroups = [
    {title : 'Roboto', description: 'Chritian Robertson', style: "'Roboto', sans-serif", link: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'},
    {title : 'Noto Sans', description: 'Google', style: "'Noto Sans KR', sans-serif", link: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap'},
    {title : 'Rancher', description: 'Impallari Type', style: "'Ranchers', cursive", link: 'https://fonts.googleapis.com/css2?family=Ranchers&display=swap'},
    {title : 'Kumbh Sans', description: 'Saurabh Sharma', style: "'Kumbh Sans', sans-serif", link: 'https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@300;400;700&display=swap'},
    {title : 'Open Sans', description: 'Steve Matteson', style: "'Open Sans', sans-serif", link: 'https://fonts.googleapis.com/css2?Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap'},
    {title : 'Nanum Gothic', description: 'Sandoll', style: "'Nanum Gothic', sans-serif", link: 'https://fonts.googleapis.com/css2?'},
    {title : 'Noto Sans Jp', description: 'Google', style: "'Noto Sans JP', sans-serif", link: 'https://fonts.googleapis.com/css2?'},
    {title : 'Lato', description: 'Lukasz Dziedzic', style: "'Lato', sans-serif", link: 'https://fonts.googleapis.com/css2?'},
    {title : 'Source Sans Pro', description: 'paul D.Hunt', style: "'Source Sans Pro', sans-serif", link: 'https://fonts.googleapis.com/css2?'},

];

function drawPreviewContainers() {
    fontGroups.forEach(function(font, idx) {
        document.querySelector('#preview').innerHTML += ""
        + '<div class="preview-item-container">'
        +   '<div class="title">'
               + '<h6>' + font.title + '</h6>'
                + '<button onclick="selectFont(event, ' + idx +' )">선택</button>'
            + '</div>'
           + '<div class="description">'
                + '<p>${font.description}<p>'
           + '</div>'
            + '<div class="example" style="font-family: ' + font.style + '">'
                +'<p>' + defaultPreviewText + '</p>'
            + '</div>'
        + '</div>'
        ;
    });
}

drawPreviewContainers();

function search(event) {
    var searchText = event.target.value.toUpperCase();
    var previewContainers = document.querySelectorAll(".preview-item-container");
    

    previewContainers.forEach(function(previewContainer) {
        var title = previewContainer.querySelector(".title > h6").innerHTML;
        
        if (title.toUpperCase().indexOf(searchText) > -1) {
            previewContainer.style.display = "block";
        } else {
            previewContainer.style.display = "none";
        }
    });
}

function inputExample(event) {
    var inputText = event.target.value;
    var previewContainers = document.querySelectorAll(".preview-item-container");

    previewContainers.forEach(function(previewContainer) {
        previewContainer.querySelector(".example p").innerHTML = inputText;        
    });
}

function changeFontsize(event) {
    var size = event.target.value;
    var previewContainers = document.querySelectorAll(".preview-item-container");
    
    previewContainers.forEach(function(previewContainer) {
        previewContainer.querySelector(".example p").style.fontSize = size + 'px';        
    });

    changeFontsizeInputTagsValues(size);
}

function changeFontsizeInputTagsValues(size) {
    document.querySelector("#sync").value = size;
    document.querySelector("#sync").innerHTML = size + 'px';

    $('#sync').prop('selected', true);
    document.querySelector("#fontsizeRange").value = size;
}

function dropPopup() {
    document.querySelector('#download').style.right = '-320px';
}

function stopPropagation(event) {
    event.stopPropagation();
}

function selectFont(event, idx) {
    event.stopPropagation();

    document.querySelector('#download').style.right = '0';

    document.querySelector("#download > .embed > p").innerHTML = ""
    + escapeHtml("<style>") + "<br>"
    + "@import url('" + fontGroups[idx].link + "');" + "<br>"
    + escapeHtml("</style>")
    + "";
    document.querySelector("#download > .css > p").innerHTML = "font-family: " + fontGroups[idx].style;
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }