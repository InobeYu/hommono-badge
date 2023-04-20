async function embedId() {

  // https://stackoverflow.com/questions/70507318/how-to-get-react-element-props-from-html-element-with-javascript
  function getReactProps(parent, target) {
    const keyof_ReactProps = Object.keys(parent)
      .find(k => k.startsWith("__reactProps$"));
    const symof_ReactFragment = Symbol.for("react.fragment");

    // Find the path from target to parent
    let path = [];
    let elem = target;
    while (elem !== parent) {
      let index = 0;
      for (let sibling = elem; sibling != null;) {
        if (sibling[keyof_ReactProps]) index++;
        sibling = sibling.previousElementSibling;
      }
      path.push({
        child: elem,
        index
      });
      elem = elem.parentElement;
    }
    // Walk down the path to find the react state props
    let state = elem[keyof_ReactProps];
    for (let i = path.length - 1; i >= 0 && state != null; i--) {
      // Find the target child state index
      let childStateIndex = 0,
        childElemIndex = 0;
      while (childStateIndex < state.children.length) {
        let childState = state.children[childStateIndex];
        if (childState instanceof Object) {
          // Fragment children are inlined in the parent DOM element
          let isFragment = childState.type === symof_ReactFragment && childState.props.children.length;
          childElemIndex += isFragment ? childState.props.children.length : 1;
          if (childElemIndex === path[i].index) break;
        }
        childStateIndex++;
      }
      let childState = state.children[childStateIndex] ?? (childStateIndex === 0 ? state.children : null);
      state = childState?.props;
      elem = path[i].child;
    }
    return state;
  }

  // Define elements
  const elementsWithLabel = document.querySelectorAll('.r-1wvb978');
  const elements = [];
  elementsWithLabel.forEach((elementA) => {
    let elementB = elementA.parentElement;

    while (elementB) {
      if (elementB.matches('div.css-1dbjc4n.r-1wbh5a2.r-dnmrzs.r-1ny4l3l:not(.embeded)') && !elementB.hasAttribute('data-testid') && !elementB.hasAttribute('tabindex') && !elementB.querySelector('.embeded')) {
        elements.push(elementB);
        break;
      }
      elementB = elementB.parentElement;
    }
  });

  // Get IDs
  function getIdFromReactProps(reactProps) {
    if (reactProps) {
      if (reactProps.author) {
        return reactProps.author.id_str;
      } else if (reactProps.userId) {
        return reactProps.userId;
       } else if (reactProps.user) {
          return reactProps.user.id;
      } else if (reactProps.userData) {
        return reactProps.userData.userId;

      } else if (reactProps.id) {
        return reactProps.id;
      } else if (reactProps.entry) {
        return reactProps.entry.content.id;
      }
    }
    return null;
  }

  for (let i = 0; i < elements.length; i++) {
    // Define props
    const element = elements[i];
    let currentElement = element.children[0];
    let parentElement = currentElement.parentElement;
    let idString = null;
    // Find the props
    while (parentElement) {
      const reactProps = getReactProps(parentElement, currentElement);
      idString = getIdFromReactProps(reactProps);
      if (idString) {
        break;
      }
      currentElement = parentElement;
      parentElement = currentElement.parentElement;
    }
    // Append the spans
    if (idString) {
      if (idString == "HoverCard") {
        const ancestor = element.parentNode.parentNode.parentNode;
        const firstChild = ancestor.children[0];
        const secondChild = firstChild.children[1];
        const reactProps2 = getReactProps(firstChild,secondChild);
        idString = getIdFromReactProps(reactProps2);
      }
      element.insertAdjacentHTML('beforeend', `<span class = "embeded-id" style="display: none;">${idString}</span>`);
      element.classList.add('embeded');
    }
  }

  // Get ID in the profile page
  const profileJson = document.querySelector('script[type="application/ld+json"][data-testid="UserProfileSchema-test"]');
  if (profileJson) {
    const profileDiv = document.getElementById("profile-id");
    if (profileJson) {
      const profileId = JSON.parse(profileJson.textContent).author.identifier;

      if (!profileDiv) {
        // Create a div element if it doesn't exist
        const newProfileDiv = document.createElement("div");
        newProfileDiv.setAttribute("id", "profile-id");
        newProfileDiv.style.display = "none";
        newProfileDiv.textContent = profileId;

        // Append the div element to the end of the body
        document.body.appendChild(newProfileDiv);
      } else {
        // Update existing div element's textContent
        profileDiv.textContent = profileId;
      }
    } else if (profileDiv) {
      // Remove the div element if profilePageJson doesn't exist
      profileDiv.remove();
    }
  }

  // Get viewer's ID
  const viewerElement = document.querySelector("#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > header > div > div");
  if (viewerElement) {
    const viewerId = getReactProps(viewerElement.parentElement, viewerElement).children._owner.memoizedProps.loggedInUserId;
    const viewerDiv = document.getElementById("viewer-id");

    if (!viewerDiv) {
      // Create a div element if it doesn't exist
      const newViewerDiv = document.createElement('div');
      newViewerDiv.setAttribute("id", "viewer-id");
      newViewerDiv.style.display = "none";
      newViewerDiv.textContent = viewerId;

      // Append the div element to the end of the body
      document.body.appendChild(newViewerDiv);
    } else {
      // Update existing div element's textContent
      viewerDiv.textContent = viewerId;
    }
  } else {
    const viewerDiv = document.getElementById("viewer-id");
    if (viewerDiv) {
      // Remove the div element if viewerElement doesn't exist
      viewerDiv.remove();
    }
  }
}

async function ObserveStream() {
  const observer = new MutationObserver(embedId);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  await embedId();
}

ObserveStream();