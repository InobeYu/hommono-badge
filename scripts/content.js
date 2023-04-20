(function () {
    const targetNode = document.querySelector('body');
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = chrome.runtime.getURL('scripts/embeded.js');
    targetNode.appendChild(script);
})();

async function insertIcon() {

    // Fetch data
    const jsonUrl = await chrome.runtime.getURL("../data/legacyVerifiedAccountsUserId.json");
    const response = await fetch(jsonUrl);
    const idT = await response.json();

    // Define background color
    const body = document.querySelector('body');

    // Define the icon element
    const originalIconApath = `<span class="css-901oao css-16my406 r-1awozwy r-xoduu5 r-1tl8opc r-bcqeeo r-qvutc0"><svg viewBox="0 0 22 22" role="img" aria-label="旧認証済みアカウント" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr" data-testid="icon-verified">
    <path d="M20.6,11.8c0.5-0.4,0.5-1.2,0-1.7l-1.4-1.3c-0.3-0.3-0.4-0.7-0.3-1L19.3,6c0.1-0.6-0.3-1.3-1-1.3l-1.9-0.2c-0.4,0-0.7-0.3-0.9-0.6l-0.8-1.7c-0.3-0.6-1-0.8-1.6-0.5l-1.6,0.9c-0.3,0.2-0.8,0.2-1.1,0L8.8,1.6C8.2,1.3,7.5,1.5,7.2,2.1L6.5,3.8C6.3,4.2,6,4.4,5.6,4.5L3.7,4.7C3,4.7,2.6,5.4,2.7,6l0.4,1.8c0.1,0.4-0.1,0.8-0.3,1l-1.4,1.3c-0.5,0.4-0.5,1.2,0,1.7l1.4,1.3c0.3,0.3,0.4,0.7,0.3,1L2.7,16c-0.1,0.6,0.3,1.3,1,1.3l1.9,0.2c0.4,0,0.7,0.3,0.9,0.6l0.8,1.7c0.3,0.6,1,0.8,1.6,0.5l1.6-0.9c0.3-0.2,0.8-0.2,1.1,0l1.6,0.9c0.6,0.3,1.3,0.1,1.6-0.5l0.8-1.7c0.2-0.4,0.5-0.6,0.9-0.6l1.9-0.2c0.7-0.1,1.1-0.7,1-1.3l-0.4-1.8c-0.1-0.4,0.1-0.8,0.3-1L20.6,11.8z M11,17c-3.4,0-6-2.8-6-6c0-3.4,2.8-6,6-6c3.4,0,6,2.8,6,6C17,14.4,14.4,17,11,17z" fill="#829aab"/>
    <circle cx="11" cy="11" r="4.1" fill="#829aab"/></svg></span>`;
    const originalIconA = `<div dir="ltr" class="css-901oao r-xoduu5 r-18u37iz r-1q142lx r-1tl8opc r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0">${originalIconApath}</div>`;

    // Define elements
    const elements = document.querySelectorAll('.embeded:not(.inserted)')

    // Insert the icons
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const embededIdElement = element.querySelector('.embeded-id');
        if (element.closest('[data-testid="UserName"]')) {
            continue;
        }
        if (embededIdElement) {
            const idP = embededIdElement.innerText;
            if (idT.includes(idP)) {
                element.classList.add('inserted');
                let ltrDivs = element.querySelector("div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-dnmrzs > div[dir='ltr']");
                ltrDivs.parentNode.insertAdjacentHTML('beforeend', originalIconA);
            }
        }
    }
    const viewerDiv = document.getElementById("viewer-id");
    if (viewerDiv) {
        const element = document.querySelector("#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > header > div > div > div > div.css-1dbjc4n.r-usiww2 > div > div > div.css-1dbjc4n.r-1wbh5a2.r-dnmrzs.r-1ny4l3l > div:not(.inserted)");
        if (element) {
            const idP = viewerDiv.innerText;
            if (idT.includes(idP)) {
                element.classList.add('inserted');
                let ltrDivs = element.querySelectorAll("div[dir='ltr'].css-901oao.r-1awozwy.r-6koalj.r-1tl8opc.r-a023e6.r-b88u0q.r-rjixqe.r-bcqeeo.r-1udh08x.r-3s2u2q.r-qvutc0");
                let targetDiv = ltrDivs[ltrDivs.length - 1];
                targetDiv.parentNode.insertAdjacentHTML('beforeend', originalIconA);
            }
        }
    }


    const accountPage = document.querySelector("#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-1ljd8xs.r-13l2t4g.r-1phboty.r-16y2uox.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div:nth-child(3) > div > div > div > div > div.css-1dbjc4n.r-6gpygo.r-14gqq1x > div.css-1dbjc4n.r-1wbh5a2.r-dnmrzs.r-1ny4l3l > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1wbh5a2");

    if (accountPage) {
        const profileIcons = document.querySelectorAll(`.profile-icon`);
        if (profileIcons) {
            for (let i = 0; i < profileIcons.length; i++) {
                const profileIcon = profileIcons[i];
                profileIcon.remove();
            }
        }
        const newTopBarHtml = `<span class="css-901oao css-16my406 r-xoduu5 r-18u37iz r-1q142lx r-1tl8opc r-bcqeeo r-qvutc0 profile-icon"><span class="css-901oao css-16my406 r-1awozwy r-xoduu5 r-1tl8opc r-bcqeeo r-qvutc0">${originalIconApath}</span>`;
        const newNameHtml = `<span class="css-901oao css-16my406 r-1tl8opc r-bcqeeo r-1pos5eu r-qvutc0 profile-icon"><span class="css-901oao css-16my406 r-xoduu5 r-18u37iz r-1q142lx r-1tl8opc r-adyw6z r-135wba7 r-bcqeeo r-qvutc0">${originalIconApath}</span>`;
        const profileDiv = document.getElementById("profile-id");
        if (profileDiv) {
            let idP = profileDiv.innerText;
            const topBarElement = document.querySelector(`.css-1dbjc4n.r-1awozwy.r-xoduu5.r-18u37iz.r-dnmrzs:not(.r-1wbh5a2)`);
            const NameElement = document.querySelector(`.css-901oao.r-1awozwy.r-6koalj.r-1tl8opc.r-adyw6z.r-1vr29t4.r-135wba7.r-bcqeeo.r-1udh08x.r-qvutc0`);

            if (idT.includes(idP)) {
                topBarElement.insertAdjacentHTML('beforeend', newTopBarHtml);
                NameElement.children[0].insertAdjacentHTML('beforeend', newNameHtml);
            }
        }
    }
}


async function ObserveStream() {
    let insertIconDebounced = debounce(async function() {
        await insertIcon();
    }, 100);

    const observer = new MutationObserver(insertIconDebounced);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    await insertIcon();
}

function debounce(func, wait) {
    let timeout;

    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    }
}

ObserveStream();