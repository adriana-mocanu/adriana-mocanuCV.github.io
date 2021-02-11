function hide(id) {
    var el = document.getElementById(id); 
    el.style.display = 'none';
}
function show(id) {
    document.getElementById(id).style.display = '';
}

function hideAllPages () {
    var pages = Array.from(document.querySelectorAll(".page"));
    pages.forEach(function(page){
        hide(page.id);
    });
}

function showPage(pageId) {
    hideAllPages();
    show(pageId); 
    }
    
function listenMenuClicks() {
    document.addEventListener("click", function(e){
        var link = e.target;
        if (link.matches("#top-menu-bar a")) {
            //var id = link.innerHTML.toLowerCase();
            var id = link.getAttribute("data-id");
            console.warn("id", id);
            showPage(id);
        }
    });
}

listenMenuClicks (); 

showPage("skills");

var allSkills = [];

function showSkills (skills) {
    var allSkillsHtml = skills.map(function(skill){
        var cls = skill.favorite ? "favorite-skill" : "";
        return `<li class="${cls}">
        ${skill.name} <span>(${skill.endorsements})</span></li>`;
    });
    
    var skillsEl = document.querySelector("#skills ul");
    skillsEl.innerHTML = allSkillsHtml.join("");
}

fetch("skills.json")
    .then(function(r) {
    return r.json();
})
.then(function(skills){
    skills.sort(function(s1, s2){
        return s2.endorsements - s1.endorsements;
    });
    showSkills(skills);
});



//showSkills(allSkills);